import {
  DebugServerError,
  startSceneGraphPerformanceTracking,
} from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';

describe('startSceneGraphPerformanceTracking', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('start performance tracking', async () => {
    const executor = {
      execute: sinon //
        .mock()
        .withExactArgs('sgperf start')
        .resolves(''),
    };

    const result = await startSceneGraphPerformanceTracking(executor);
    assert.strictEqual(result, undefined);
  });

  it('throws if command is not recognized', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('sgperf start')
        .resolves('Command not recognized'),
    };

    const result = startSceneGraphPerformanceTracking(executor);
    await assert.rejects(result, DebugServerError);
  });
});
