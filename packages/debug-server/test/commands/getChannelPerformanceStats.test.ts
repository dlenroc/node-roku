import {
  DebugServerError,
  getChannelPerformanceStats,
} from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';

describe('getChannelPerformanceStats', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('return channel performance stats', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('chanperf')
        .resolves(
          'channel: mem=15156KiB{anon=2720,file=12392,shared=44,swap=0},%cpu=7{user=1,sys=6}'
        ),
    };

    const result = await getChannelPerformanceStats(executor);

    assert.deepStrictEqual(result, {
      cpu: { total: 7, user: 1, sys: 6 },
      memory: { total: 15156, anon: 2720, swap: 0, file: 12392, shared: 44 },
    });
  });

  it('throws if performance stats are not available', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('chanperf')
        .resolves('channel: mem and cpu data not available'),
    };

    const result = getChannelPerformanceStats(executor);
    await assert.rejects(result, DebugServerError);
  });
});
