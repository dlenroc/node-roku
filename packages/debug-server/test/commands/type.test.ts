import { DebugServerError, type } from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';

describe('type', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('type text', async () => {
    const text = 'Hello, World!';
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('type', [text])
        .resolves(''),
    };

    const result = await type(executor, { text });
    assert.strictEqual(result, undefined);
  });

  test('throws if failed to parse', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('type', [''])
        .resolves('unknown command "type"'),
    };

    const result = type(executor, { text: '' });
    await assert.rejects(result, DebugServerError);
  });
});
