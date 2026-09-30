import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const manifest = JSON.parse(readFileSync('scripts/migration-manifest.json', 'utf8'));
for (const note of manifest) {
  const body = path => readFileSync(path, 'utf8').split(/^---\s*$/m).slice(2).join('---');
  assert.equal(body(note.source), body(note.destination), `Body changed: ${note.source}`);
}
const html = path => readFileSync(`dist/${path}/index.html`, 'utf8');
assert.match(html('mathematics/lie-group/introduction'), /class="katex/);
assert.doesNotMatch(html('mathematics/lie-group/introduction'), /katex-error/);
assert.match(html('mathematics/lie-group/introduction').match(/<blockquote>[\s\S]*?<\/blockquote>/)[0], /class="katex/);
for (const route of ['programming/matlab/modern-robotics', 'robotics/control/pybullet-pd-control']) {
  assert.match(html(route), /<img[^>]+https:\/\//);
  assert.match(html(route), /expressive-code/);
  assert.match(html(route), /<span[^>]+style=/);
}
assert.ok(existsSync('dist/pagefind/pagefind.js'), 'Search index missing');
assert.match(readFileSync('dist/index.html', 'utf8'), /Recently Updated/);
console.log('Verified: unchanged source bodies, KaTeX, images, highlighted code, search index, home.');
