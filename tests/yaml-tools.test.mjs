import test from 'node:test';
import assert from 'node:assert/strict';
import { parseYaml, stringifyYaml } from '../src/utils/yaml-lite.mjs';

test('YAML parser handles common nested mappings and sequences', () => {
  const input = `service:\n  name: kriyano\n  port: 8080\n  enabled: true\n  tags:\n    - developer\n    - web\n  servers:\n    - name: primary\n      port: 443\n    - name: backup\n      port: 8443\n`;
  assert.deepEqual(parseYaml(input), {
    service: {
      name: 'kriyano',
      port: 8080,
      enabled: true,
      tags: ['developer', 'web'],
      servers: [
        { name: 'primary', port: 443 },
        { name: 'backup', port: 8443 },
      ],
    },
  });
});

test('JSON to YAML round trip preserves ordinary configuration data', () => {
  const original = {
    name: 'KRIYANO',
    active: true,
    count: 3,
    nullable: null,
    tags: ['dev', 'web'],
    nested: { path: '/tools/', message: 'hello world' },
  };
  const yaml = stringifyYaml(original, 2);
  assert.deepEqual(parseYaml(yaml), original);
});

test('YAML parser rejects duplicate keys and tab indentation', () => {
  assert.throws(() => parseYaml('name: one\nname: two\n'), /duplicate key/i);
  assert.throws(() => parseYaml('root:\n\tchild: value\n'), /tabs are not allowed/i);
});
