import { DebugServerParsingError, clearSceneGraphPerformanceData } from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';

describe('clearSceneGraphPerformanceData', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('clears performance data', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('sgperf', ['clear'])
        .resolves(''),
    };

    const result = await clearSceneGraphPerformanceData(executor);
    assert.strictEqual(result, undefined);
  });

  test('throws if command is not recognized', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('sgperf', ['clear'])
        .resolves('Command not recognized'),
    };

    const result = clearSceneGraphPerformanceData(executor);
    await assert.rejects(result, DebugServerParsingError);
  });
});
