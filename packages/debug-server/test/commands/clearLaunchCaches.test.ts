import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { clearLaunchCaches } from '../../src/commands/clearLaunchCaches.ts';

describe('clearLaunchCaches', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('clear launch caches', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('clear_launch_caches', [])
        .resolves('Done.'),
    };

    const result = await clearLaunchCaches(executor);
    assert.strictEqual(result, undefined);
  });

  test('throws if failed to parse', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('clear_launch_caches', [])
        .resolves(''),
    };

    const result = clearLaunchCaches(executor);
    await assert.rejects(result, DebugServerParsingError);
  });
});
