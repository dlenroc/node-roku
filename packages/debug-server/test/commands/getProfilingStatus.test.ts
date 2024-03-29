import {
  DebugServerError,
  getProfilingStatus,
} from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';

describe('getProfilingStatus', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('return "true" resume status if profiling is running', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('bsprof-status')
        .resolves('status: running,data_dest=local'),
    };

    const result = await getProfilingStatus(executor);

    assert.deepStrictEqual(result, {
      resumed: true,
      destination: 'local',
      metrics: [],
    });
  });

  it('return "false" resume status if profiling is paused', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('bsprof-status')
        .resolves('status: paused,data_dest=local'),
    };

    const result = await getProfilingStatus(executor);

    assert.deepStrictEqual(result, {
      resumed: false,
      destination: 'local',
      metrics: [],
    });
  });

  it('return single metrics', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('bsprof-status')
        .resolves('status: running,cpu,data_dest=local'),
    };

    const result = await getProfilingStatus(executor);

    assert.deepStrictEqual(result, {
      resumed: true,
      destination: 'local',
      metrics: ['cpu'],
    });
  });

  it('return multiple metrics', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('bsprof-status')
        .resolves('status: running,cpu,mem,lines,data_dest=local'),
    };

    const result = await getProfilingStatus(executor);

    assert.deepStrictEqual(result, {
      resumed: true,
      destination: 'local',
      metrics: ['cpu', 'mem', 'lines'],
    });
  });

  it('throws if no profiling session', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('bsprof-status')
        .resolves('No profiling session'),
    };

    const result = getProfilingStatus(executor);
    await assert.rejects(result, DebugServerError);
  });
});
