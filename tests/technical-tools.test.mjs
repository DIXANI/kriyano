import test from 'node:test';
import assert from 'node:assert/strict';
import { formatSql, minifyJson, parseUrlValue, parseQueryString } from '../src/utils/technical-tools.mjs';

test('SQL formatter separates common clauses and normalizes spacing', () => {
  const result = formatSql('select id,name from users where active=1 order by name;', 2);
  assert.match(result, /select id,/i);
  assert.match(result, /\nFROM users/i);
  assert.match(result, /\nWHERE active = 1/i);
  assert.match(result, /\nORDER BY name;/i);
});

test('JSON minifier validates and removes formatting whitespace', () => {
  assert.equal(minifyJson('{\n  "name": "KRIYANO",\n  "active": true\n}'), '{"name":"KRIYANO","active":true}');
  assert.throws(() => minifyJson('{bad json}'));
});

test('URL parser separates core URL components', () => {
  const parsed = parseUrlValue('https://example.com:8443/tools/?q=jwt#result');
  assert.equal(parsed.protocol, 'https:');
  assert.equal(parsed.hostname, 'example.com');
  assert.equal(parsed.port, '8443');
  assert.equal(parsed.pathname, '/tools/');
  assert.equal(parsed.search, '?q=jwt');
  assert.equal(parsed.hash, '#result');
});

test('query string parser preserves repeated parameters and decodes values', () => {
  assert.deepEqual(parseQueryString('?tag=dev&tag=web&name=hello%20world'), [
    { key: 'tag', value: 'dev' },
    { key: 'tag', value: 'web' },
    { key: 'name', value: 'hello world' },
  ]);
});
