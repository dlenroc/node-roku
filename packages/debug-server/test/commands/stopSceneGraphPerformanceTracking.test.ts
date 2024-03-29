import {
  DebugServerError,
  stopSceneGraphPerformanceTracking,
} from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';

describe('stopSceneGraphPerformanceTracking', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('stop performance tracking', async () => {
    const executor = {
      execute: sinon //
        .mock()
        .withExactArgs('sgperf stop')
        .resolves(''),
    };

    const result = await stopSceneGraphPerformanceTracking(executor);
    assert.strictEqual(result, undefined);
  });

  it('throws if command is not recognized', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('sgperf stop')
        .resolves('Command not recognized'),
    };

    const result = stopSceneGraphPerformanceTracking(executor);
    await assert.rejects(result, DebugServerError);
  });
});
