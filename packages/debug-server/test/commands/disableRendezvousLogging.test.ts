import {
  DebugServerError,
  disableRendezvousLogging,
} from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';

describe('disableRendezvousLogging', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('disable rendezvous logging', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('logrendezvous off')
        .resolves('logrendezvous: rendezvous logging is off'),
    };

    const result = await disableRendezvousLogging(executor);
    assert.strictEqual(result, undefined);
  });

  it('throws if failed to parse', async () => {
    const executor = {
      execute: sinon //
        .mock()
        .withExactArgs('logrendezvous off')
        .resolves(''),
    };

    const result = disableRendezvousLogging(executor);
    await assert.rejects(result, DebugServerError);
  });
});
