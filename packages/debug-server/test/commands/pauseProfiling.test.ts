import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { pauseProfiling } from '../../src/commands/pauseProfiling.ts';

describe('pauseProfiling', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('pause profiling', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('bsprof-pause', [])
        .resolves('bsprof paused'),
    };

    const result = await pauseProfiling(executor);
    assert.strictEqual(result, undefined);
  });

  test('throws if no profiling session', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('bsprof-pause', [])
        .resolves('No profiling session'),
    };

    const result = pauseProfiling(executor);
    await assert.rejects(result, DebugServerParsingError);
  });
});
