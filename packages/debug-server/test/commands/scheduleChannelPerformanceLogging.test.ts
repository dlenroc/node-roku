import { DebugServerError, scheduleChannelPerformanceLogging } from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';

describe('scheduleChannelPerformanceLogging', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('schedule channel stats logging', async () => {
    const interval = 10;
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('chanperf', ['-r', `${interval}`])
        .resolves(
          [
            'channel: mem=15156KiB{anon=2720,file=12392,shared=44,swap=0},%cpu=7{user=1,sys=6}',
            `repeat ${interval}s (on dev console), chanperf -r 0 to stop`,
          ].join('\n')
        ),
    };

    const result = await scheduleChannelPerformanceLogging(executor, { interval });
    assert.deepStrictEqual(result, interval);
  });

  test('unschedule channel stats logging', async () => {
    const interval = 0;
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('chanperf', ['-r', `${interval}`])
        .resolves('channel: mem and cpu data not available'),
    };

    const result = await scheduleChannelPerformanceLogging(executor, { interval });
    assert.deepStrictEqual(result, interval);
  });

  test('throws if failed to parse', async () => {
    const interval = 0;
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('chanperf', ['-r', `${interval}`])
        .resolves(''),
    };

    const result = scheduleChannelPerformanceLogging(executor, { interval });
    await assert.rejects(result, DebugServerError);
  });
});
