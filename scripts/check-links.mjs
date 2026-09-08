/**
 * Controleert of elke `repo`- en `live`-URL uit PROJECTS nog bereikbaar is.
 *
 * Twee projecten draaien op een schoolserver (102896.stu.sd-lab.nl) die zonder
 * aankondiging offline kan gaan. Een recruiter die op een dode demo klikt leest
 * dat als "verlaten project", dus dat wil je weten voordat hij het ziet.
 */
import { readFile } from 'node:fs/promises';

const src = await readFile(new URL('../src/data.ts', import.meta.url), 'utf8');

// Simpele extractie in plaats van data.ts importeren: dit script draait in kale
// Node zonder TypeScript-stap.
const entries = [...src.matchAll(/name: '([^']+)'[\s\S]*?repo: '([^']*)', live: '([^']*)'/g)]
  .flatMap(([, name, repo, live]) => [
    ...(repo ? [{ name, kind: 'repo', url: repo }] : []),
    ...(live ? [{ name, kind: 'live', url: live }] : []),
  ]);

if (entries.length === 0) {
  console.error('Geen links gevonden — is het formaat van data.ts veranderd?');
  process.exit(1);
}

const failures = [];

for (const { name, kind, url } of entries) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(20000),
      headers: { 'user-agent': 'portfolio-link-check' },
    });
    const ok = res.status < 400;
    console.log(`${ok ? 'ok  ' : 'FOUT'} ${res.status} ${name} (${kind}) ${url}`);
    if (!ok) failures.push(`${name} (${kind}) → HTTP ${res.status}: ${url}`);
  } catch (err) {
    console.log(`FOUT --- ${name} (${kind}) ${url} — ${err.message}`);
    failures.push(`${name} (${kind}) → ${err.message}: ${url}`);
  }
}

if (failures.length > 0) {
  console.error(`\n${failures.length} link(s) onbereikbaar:\n` + failures.map((f) => '  - ' + f).join('\n'));
  process.exit(1);
}
console.log(`\nAlle ${entries.length} links zijn bereikbaar.`);
