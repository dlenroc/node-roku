import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { stopSceneGraphPerformanceTracking } from '../../src/commands/stopSceneGraphPerformanceTracking.ts';

describe('stopSceneGraphPerformanceTracking', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('stop performance tracking', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('sgperf', ['stop'])
        .resolves(''),
    };

    const result = await stopSceneGraphPerformanceTracking(executor);
    assert.strictEqual(result, undefined);
  });

  test('throws if command is not recognized', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('sgperf', ['stop'])
        .resolves('Command not recognized'),
    };

    const result = stopSceneGraphPerformanceTracking(executor);
    await assert.rejects(result, DebugServerParsingError);
  });
});
