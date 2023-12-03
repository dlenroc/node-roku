import {
  DebugServerError,
  clearSceneGraphPerformanceMetrics,
} from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';

describe('clearSceneGraphPerformanceMetrics', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('clears performance metrics', async () => {
    const executor = {
      execute: sinon //
        .mock()
        .withExactArgs('sgperf clear')
        .resolves(''),
    };

    const result = await clearSceneGraphPerformanceMetrics(executor);
    assert.strictEqual(result, undefined);
  });

  it('throws if command is not recognized', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('sgperf clear')
        .resolves('Command not recognized'),
    };

    const result = clearSceneGraphPerformanceMetrics(executor);
    await assert.rejects(result, DebugServerError);
  });
});
