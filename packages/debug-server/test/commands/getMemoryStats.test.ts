import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { getMemoryStats } from '../../src/commands/getMemoryStats.ts';

describe('getMemoryStats', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('return memory stats', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('free', [])
        .resolves(
          [
            '       total    used    free     shared  buff/cache  available\n' +
              'Mem:   1540492  113124  1223408  8084    203960      1354188\n' +
              'Swap:  385120   0       385120',
          ].join('\n')
        ),
    };

    const result = await getMemoryStats(executor);

    assert.deepStrictEqual(result, {
      mem: {
        total: 1540492,
        used: 113124,
        free: 1223408,
        shared: 8084,
        cache: 203960,
        available: 1354188,
      },
      swap: {
        total: 385120,
        used: 0,
        free: 385120,
      },
    });
  });

  test('throws if failed to parse', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('free', [])
        .resolves(''),
    };

    const result = getMemoryStats(executor);
    await assert.rejects(result, DebugServerParsingError);
  });
});
