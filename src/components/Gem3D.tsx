import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Gem3DProps {
  dark: boolean
}

/**
 * Faceted icosahedron "gem" that idly spins and can be dragged to rotate.
 * Ported from the Claude Design source (three.js scene in componentDidMount).
 */
export default function Gem3D({ dark }: Gem3DProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)
  const l1Ref = useRef<THREE.PointLight | null>(null)
  const darkRef = useRef(dark)

  // Keep a live reference so the animation loop / theme sync use the latest value.
  darkRef.current = dark

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 4.6)

    const el = renderer.domElement
    el.style.cssText =
      'width:100%;height:100%;display:block;touch-action:none;cursor:grab;'

    const rot = { x: -0.2, y: 0.4, tx: -0.2, ty: 0.4, dragging: false, lx: 0, ly: 0 }

    const onDown = (e: PointerEvent) => {
      rot.dragging = true
      rot.lx = e.clientX
      rot.ly = e.clientY
      el.style.cursor = 'grabbing'
      try {
        el.setPointerCapture(e.pointerId)
      } catch (_) {
        /* noop */
      }
    }
    const onMove = (e: PointerEvent) => {
      if (!rot.dragging) return
      rot.ty += (e.clientX - rot.lx) * 0.008
      rot.tx += (e.clientY - rot.ly) * 0.008
      rot.tx = Math.max(-1.2, Math.min(1.2, rot.tx))
      rot.lx = e.clientX
      rot.ly = e.clientY
    }
    const onUp = () => {
      rot.dragging = false
      el.style.cursor = 'grab'
    }
    const onLeave = () => {
      rot.dragging = false
    }
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointerleave', onLeave)

    // ---- scene ----
    const geo = new THREE.IcosahedronGeometry(1.6, 1)
    const mat = new THREE.MeshStandardMaterial({
      color: 0x4a3f88,
      metalness: 0.45,
      roughness: 0.18,
      flatShading: true,
    })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)
    meshRef.current = mesh

    scene.add(new THREE.AmbientLight(0x4a4a64, 0.9))
    const l1 = new THREE.PointLight(0x8b7cff, 1.5, 30)
    l1.position.set(4, 3, 5)
    scene.add(l1)
    l1Ref.current = l1
    const l2 = new THREE.PointLight(0x4fd6e0, 0.9, 30)
    l2.position.set(-5, -2, 3)
    scene.add(l2)
    const l3 = new THREE.DirectionalLight(0xffffff, 0.5)
    l3.position.set(0, 5, 2)
    scene.add(l3)

    // Occasional "shine": a bright highlight that idles dark, then every few
    // seconds sweeps across the front of the gem — catching facets in sequence
    // so the surface glints — before fading back out. Pure decoration, so it's
    // disabled under prefers-reduced-motion.
    const glint = new THREE.PointLight(0xffffff, 0, 22)
    glint.position.set(0, 0, 6)
    scene.add(glint)
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const shine = { active: false, t: 0, next: 1.8, duration: 1.5 }
    const clock = new THREE.Clock()

    const applyThemeColors = () => {
      const d = darkRef.current
      mat.color.set(d ? 0x4a3f88 : 0x6a5cf0)
      mat.metalness = d ? 0.45 : 0.25
      mat.roughness = d ? 0.18 : 0.35
      l1.intensity = d ? 1.9 : 1.2
    }
    applyThemeColors()

    host.appendChild(el)

    const resize = () => {
      const w = host.clientWidth || 500
      const h = host.clientHeight || 500
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      // Clamp dt so a backgrounded tab doesn't fast-forward the shine on return.
      const dt = Math.min(clock.getDelta(), 0.05)
      const reduce = mqReduce.matches

      if (!rot.dragging && !reduce) rot.ty += 0.0024
      rot.y += (rot.ty - rot.y) * 0.08
      rot.x += (rot.tx - rot.x) * 0.08
      mesh.rotation.y = rot.y
      mesh.rotation.x = rot.x

      // Shine sweep: a single highlight that arcs across the gem, with a
      // rise-and-fall envelope so it reads as a brief flash of light.
      if (reduce) {
        glint.intensity = 0
      } else if (shine.active) {
        shine.t += dt / shine.duration
        if (shine.t >= 1) {
          shine.active = false
          glint.intensity = 0
          shine.next = 4 + Math.random() * 5 // 4–9s until the next glint
        } else {
          const p = shine.t
          glint.position.set(-5 + p * 10, 3.2 - p * 5.4, 6)
          const env = Math.pow(Math.sin(p * Math.PI), 1.6)
          glint.intensity = env * (darkRef.current ? 5.2 : 3.6)
        }
      } else {
        shine.next -= dt
        if (shine.next <= 0) {
          shine.active = true
          shine.t = 0
        }
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointerleave', onLeave)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      if (el.parentNode) el.parentNode.removeChild(el)
      meshRef.current = null
      l1Ref.current = null
    }
  }, [])

  // React to theme changes without rebuilding the scene.
  useEffect(() => {
    const mesh = meshRef.current
    const l1 = l1Ref.current
    if (!mesh || !l1) return
    const mat = mesh.material as THREE.MeshStandardMaterial
    mat.color.set(dark ? 0x4a3f88 : 0x6a5cf0)
    mat.metalness = dark ? 0.45 : 0.25
    mat.roughness = dark ? 0.18 : 0.35
    l1.intensity = dark ? 1.9 : 1.2
  }, [dark])

  return (
    <div
      ref={hostRef}
      className="home3d"
      style={{
        position: 'absolute',
        right: '-30px',
        top: '-10px',
        width: '560px',
        height: '560px',
      }}
    />
  )
}
