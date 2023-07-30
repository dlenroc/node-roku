import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { resumeProfiling } from '../../src/commands/resumeProfiling.ts';

describe('resumeProfiling', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('resume profiling', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('bsprof-resume', [])
        .resolves('bsprof resumed'),
    };

    const result = await resumeProfiling(executor);
    assert.strictEqual(result, undefined);
  });

  test('throws if no profiling session', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('bsprof-resume', [])
        .resolves('No profiling session'),
    };

    const result = resumeProfiling(executor);
    await assert.rejects(result, DebugServerParsingError);
  });
});
