import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFile, appendFile } from 'node:fs/promises';
import { setTimeout as sleep } from 'node:timers/promises';

// Use the deployment API directly: the CLI also requests account information,
// which a token restricted to this one portfolio project cannot access.
const project = 'prj_zkzgSExmeZzKtLXmLhPiMhya1vmm';
const team = 'team_lwcMOed4XZsuFuJw8oMO9K90';
const token = process.env.VERCEL_TOKEN;
const dryRun = process.argv.includes('--dry-run');
const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
  .split('\0').filter(Boolean)
  .filter(file => !file.startsWith('.') && !file.endsWith('.md'));
if (!files.includes('index.html') || !files.includes('proj-05.html')) {
  throw new Error('Required portfolio pages are missing.');
}
if (dryRun) {
  console.log(`Validated ${files.length} tracked site files; deployment scripts and documentation are excluded.`);
  process.exit(0);
}
if (!token) throw new Error('PORTFOLIO_VERCEL_TOKEN secret is missing.');

async function request(path, options = {}) {
  const url = new URL(path, 'https://api.vercel.com');
  url.searchParams.set('teamId', team);
  url.searchParams.set('projectId', project);
  for (let attempt = 0; attempt < 5; attempt++) {
    const response = await fetch(url, {
      ...options,
      headers: { Authorization: `Bearer ${token}`, ...options.headers },
      signal: AbortSignal.timeout(120_000),
    });
    if ((response.status === 429 || response.status >= 500) && attempt < 4) {
      await response.arrayBuffer();
      await sleep(2000 * 2 ** attempt);
      continue;
    }
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    if (!response.ok) {
      throw new Error(`${path}: HTTP ${response.status}: ${data.error?.message ?? response.statusText}`);
    }
    return data;
  }
}

await request(`/v9/projects/${project}`);
const uploads = [];
const pending = [...files];
await Promise.all(Array.from({ length: 4 }, async () => {
  while (pending.length) {
    const file = pending.shift();
    const content = await readFile(file);
    const sha = createHash('sha1').update(content).digest('hex');
    await request('/v2/files', {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream', 'x-vercel-digest': sha },
      body: content,
    });
    uploads.push({ file, sha, size: content.length });
  }
}));
console.log(`Uploaded ${uploads.length} portfolio files.`);

const commit = process.env.GITHUB_SHA ?? execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const deployment = await request('/v13/deployments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'hyerim-portfolio',
    project,
    target: 'production',
    files: uploads,
    projectSettings: { framework: null, buildCommand: '', installCommand: '', outputDirectory: null },
    meta: { sourceRepository: 'maisondesoma-lgtm/maisondesoma-lgtm.github.io', sourceCommit: commit },
  }),
});
if (!deployment.id) throw new Error('Vercel did not return a deployment ID.');
console.log(`Deployment: https://${deployment.url}`);

let ready = false;
for (let attempt = 0; attempt < 60; attempt++) {
  const current = await request(`/v13/deployments/${deployment.id}`);
  const state = current.readyState ?? current.status;
  if (state === 'READY' && current.aliasAssigned && !current.aliasError) {
    ready = true;
    break;
  }
  if (state === 'ERROR' || state === 'CANCELED' || current.aliasError) {
    throw new Error(`Deployment failed: ${current.errorMessage ?? current.aliasError?.message ?? state}`);
  }
  await sleep(5000);
}
if (!ready) throw new Error('Timed out waiting for production deployment and domain assignment.');

// Verify the exact bytes from the pushed commit, including the new script/style.
for (const path of ['index.html', 'proj-05.html', 'work-acc.js', 'work.css']) {
  const expected = await readFile(path);
  let matches = false;
  for (let attempt = 0; attempt < 12; attempt++) {
    const response = await fetch(`https://www.portfolio-janghyerim.com/${path}?deploy=${commit}`, {
      signal: AbortSignal.timeout(30_000),
    });
    if (response.ok && Buffer.from(await response.arrayBuffer()).equals(expected)) {
      matches = true;
      break;
    }
    await sleep(5000);
  }
  if (!matches) throw new Error(`Live ${path} does not match the pushed commit.`);
  console.log(`Verified live ${path}.`);
}
if (process.env.GITHUB_STEP_SUMMARY) {
  await appendFile(process.env.GITHUB_STEP_SUMMARY,
    `### Portfolio deployed and verified\n\nCommit: \`${commit}\`\n\nDeployment: https://${deployment.url}\n\nWebsite: https://www.portfolio-janghyerim.com/\n\nLive HTML, accordion script, and stylesheet match this commit.\n`);
}
