import {
  DebugServerError,
  clearLaunchCaches,
} from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';

describe('clearLaunchCaches', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('clear launch caches', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('clear_launch_caches')
        .resolves('Done.'),
    };

    const result = await clearLaunchCaches(executor);
    assert.strictEqual(result, undefined);
  });

  it('throws if failed to parse', async () => {
    const executor = {
      execute: sinon.mock().withExactArgs('clear_launch_caches').resolves(''),
    };

    const result = clearLaunchCaches(executor);
    await assert.rejects(result, DebugServerError);
  });
});
