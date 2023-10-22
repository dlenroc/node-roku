import { DebugServerParsingError, getSceneGraphPerformanceData } from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';

describe('startSceneGraphPerformanceTracking', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('get performance data', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('sgperf', ['report'])
        .resolves(
          [
            'thread node calls: create     1 + op    0  @ 100.0% rendezvous',
            'thread node calls: create     0 + op    24  @ 0.0% rendezvous',
          ].join('\n')
        ),
    };

    const result = await getSceneGraphPerformanceData(executor);

    assert.deepStrictEqual(result, [
      {
        create: 1,
        operation: 0,
        rendezvous: 100,
      },
      {
        create: 0,
        operation: 24,
        rendezvous: 0,
      },
    ]);
  });

  test('throws if command is not recognized', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('sgperf', ['report'])
        .resolves('Command not recognized'),
    };

    const result = getSceneGraphPerformanceData(executor);
    await assert.rejects(result, DebugServerParsingError);
  });
});
