import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { scheduleChannelStats } from '../../src/commands/scheduleChannelStats.ts';

describe('scheduleChannelStats', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('schedule channel stats logging', async () => {
    const intervalInSeconds = 10;
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('chanperf', ['-r', `${intervalInSeconds}`])
        .resolves(
          [
            'channel: mem=15156KiB{anon=2720,file=12392,shared=44,swap=0},%cpu=7{user=1,sys=6}',
            `repeat ${intervalInSeconds}s (on dev console), chanperf -r 0 to stop`,
          ].join('\n')
        ),
    };

    const result = await scheduleChannelStats(executor, 10);
    assert.deepStrictEqual(result, intervalInSeconds);
  });

  test('unschedule channel stats logging', async () => {
    const intervalInSeconds = 0;
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('chanperf', ['-r', `${intervalInSeconds}`])
        .resolves('channel: mem and cpu data not available'),
    };

    const result = await scheduleChannelStats(executor, intervalInSeconds);
    assert.deepStrictEqual(result, intervalInSeconds);
  });

  test('throws if failed to parse', async () => {
    const intervalInSeconds = 0;
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('chanperf', ['-r', `${intervalInSeconds}`])
        .resolves(''),
    };

    const result = scheduleChannelStats(executor, intervalInSeconds);
    await assert.rejects(result, DebugServerParsingError);
  });
});
