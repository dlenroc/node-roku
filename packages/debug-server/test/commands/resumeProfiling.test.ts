import { DebugServerError, resumeProfiling } from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';

describe('resumeProfiling', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('resume profiling', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('bsprof-resume')
        .resolves('bsprof resumed'),
    };

    const result = await resumeProfiling(executor);
    assert.strictEqual(result, undefined);
  });

  it('throws if no profiling session', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('bsprof-resume')
        .resolves('No profiling session'),
    };

    const result = resumeProfiling(executor);
    await assert.rejects(result, DebugServerError);
  });
});
