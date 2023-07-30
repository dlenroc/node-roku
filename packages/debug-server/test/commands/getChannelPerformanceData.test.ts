import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { getChannelPerformanceData } from '../../src/commands/getChannelPerformanceData.ts';

describe('getChannelPerformanceData', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('return channel performance metrics', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('chanperf', [])
        .resolves('channel: mem=15156KiB{anon=2720,file=12392,shared=44,swap=0},%cpu=7{user=1,sys=6}'),
    };

    const result = await getChannelPerformanceData(executor);

    assert.deepStrictEqual(result, {
      cpu: { total: 7, user: 1, sys: 6 },
      memory: { total: 15156, anon: 2720, swap: 0, file: 12392, shared: 44 },
    });
  });

  test('throws if performance metrics are not available', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('chanperf', [])
        .resolves('channel: mem and cpu data not available'),
    };

    const result = getChannelPerformanceData(executor);
    await assert.rejects(result, DebugServerParsingError);
  });
});
