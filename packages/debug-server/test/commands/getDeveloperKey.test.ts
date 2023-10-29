import { DebugServerError, getDeveloperKey } from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';

describe('getDeveloperKey', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('return developer key', async () => {
    const id = '1234567890';
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('showkey', [])
        .resolves(`Dev ID: ${id}`),
    };

    const result = await getDeveloperKey(executor);
    assert.strictEqual(result, id);
  });

  test('throws if failed to parse', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('showkey', [])
        .resolves(''),
    };

    const result = getDeveloperKey(executor);
    await assert.rejects(result, DebugServerError);
  });
});
