import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { Page } from '../App';

// Each page sits at its own point in the noise field, scattered in a distinct
// direction (not on a line) so switching pages drifts straight to that spot
// instead of sweeping through the other pages' positions.
const PAGE_SEED: Record<Page, [number, number]> = {
  home: [0, 0],
  work: [15, 7],
  about: [-9, 14],
  contact: [-14, -8],
};

const FRAG = `
precision highp float;
uniform float u_time; uniform vec2 u_res; uniform float u_dark; uniform vec2 u_seed;
float hash(vec2 p){ p=fract(p*vec2(123.34,345.45)); p+=dot(p,p+34.345); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f); return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x), mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x), u.y); }
float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<6;i++){ v+=a*noise(p); p*=1.92; a*=0.52; } return v; }
void main(){
  vec2 uv=gl_FragCoord.xy/u_res.xy;
  vec2 p=uv; p.x*=u_res.x/u_res.y;
  p+=u_seed;
  float t=u_time*0.05;
  vec2 q=vec2(fbm(p*0.85+vec2(0.0,t)), fbm(p*0.85+vec2(5.2,-t)));
  vec2 rr=vec2(fbm(p*0.85+q*1.7+vec2(1.7,9.2)+t*0.6), fbm(p*0.85+q*1.7+vec2(8.3,2.8)-t*0.6));
  float n=fbm(p*1.05 + rr*1.9);
  n=smoothstep(0.08,0.96,n);
  vec3 d1=vec3(0.05,0.05,0.11), d2=vec3(0.27,0.21,0.58), d3=vec3(0.55,0.49,1.0);
  vec3 l1=vec3(0.88,0.86,0.98), l2=vec3(0.70,0.65,0.94), l3=vec3(0.55,0.49,0.90);
  vec3 c1=mix(l1,d1,u_dark), c2=mix(l2,d2,u_dark), c3=mix(l3,d3,u_dark);
  vec3 col=mix(c1,c2,smoothstep(0.18,0.68,n));
  col=mix(col,c3,smoothstep(0.55,1.0,n)*0.8);
  float glow=pow(n,1.55);
  float a=mix(glow*0.40, glow*0.27, u_dark);
  gl_FragColor=vec4(col,a);
}
`;

const VERT = 'void main(){gl_Position=vec4(position,1.0);}';

interface Props {
  dark: boolean;
  page: Page;
}

export default function AuroraBackground({ dark, page }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  // live values read inside the animation loop
  const darkRef = useRef(dark);
  const pageRef = useRef(page);
  darkRef.current = dark;
  pageRef.current = page;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Some devices/browsers can't create a WebGL context. Fail soft: skip the
    // animated background instead of letting the error blank the whole app.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      u_time: { value: 0 },
      u_res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_dark: { value: dark ? 1 : 0 },
      u_seed: { value: new THREE.Vector2(0, 0) },
    };
    const geo = new THREE.PlaneGeometry(2, 2);
    const mat = new THREE.ShaderMaterial({ uniforms, transparent: true, vertexShader: VERT, fragmentShader: FRAG });
    scene.add(new THREE.Mesh(geo, mat));

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const render = () => {
      uniforms.u_dark.value = darkRef.current ? 1 : 0;
      const [tx, ty] = PAGE_SEED[pageRef.current];
      const seed = uniforms.u_seed.value;
      seed.x += (tx - seed.x) * 0.011;
      seed.y += (ty - seed.y) * 0.011;
      renderer.render(scene, cam);
    };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      uniforms.u_time.value = performance.now() * 0.001;
      render();
    };
    if (reduceMotion) render(); // one static frame, no animation loop
    else tick();

    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h);
      uniforms.u_res.value.set(w, h);
      if (reduceMotion) render();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="bgfx" ref={hostRef} />;
}
