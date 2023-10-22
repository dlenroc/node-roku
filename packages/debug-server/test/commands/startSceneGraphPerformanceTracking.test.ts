import { DebugServerParsingError, startSceneGraphPerformanceTracking } from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';

describe('startSceneGraphPerformanceTracking', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('start performance tracking', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('sgperf', ['start'])
        .resolves(''),
    };

    const result = await startSceneGraphPerformanceTracking(executor);
    assert.strictEqual(result, undefined);
  });

  test('throws if command is not recognized', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('sgperf', ['start'])
        .resolves('Command not recognized'),
    };

    const result = startSceneGraphPerformanceTracking(executor);
    await assert.rejects(result, DebugServerParsingError);
  });
});
