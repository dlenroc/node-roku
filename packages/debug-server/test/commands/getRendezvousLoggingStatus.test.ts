import {
  DebugServerError,
  getRendezvousLoggingStatus,
} from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';

describe('getRendezvousLoggingStatus', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('return "true" if rendezvous logging is on', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('logrendezvous')
        .resolves('logrendezvous: rendezvous logging is on'),
    };

    const result = await getRendezvousLoggingStatus(executor);
    assert.deepStrictEqual(result, { enabled: true });
  });

  it('return "true" if rendezvous logging is off', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('logrendezvous')
        .resolves('logrendezvous: rendezvous logging is off'),
    };

    const result = await getRendezvousLoggingStatus(executor);
    assert.deepStrictEqual(result, { enabled: false });
  });

  it('throws if failed to parse', async () => {
    const executor = {
      execute: sinon //
        .mock()
        .withExactArgs('logrendezvous')
        .resolves(''),
    };

    const result = getRendezvousLoggingStatus(executor);
    await assert.rejects(result, DebugServerError);
  });
});
