import {
  DebugServerError,
  enableRendezvousLogging,
} from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';

describe('enableRendezvousLogging', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('enable rendezvous logging', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('logrendezvous on')
        .resolves('logrendezvous: rendezvous logging is on'),
    };

    const result = await enableRendezvousLogging(executor);
    assert.strictEqual(result, undefined);
  });

  it('throws if failed to parse', async () => {
    const executor = {
      execute: sinon //
        .mock()
        .withExactArgs('logrendezvous on')
        .resolves(''),
    };

    const result = enableRendezvousLogging(executor);
    await assert.rejects(result, DebugServerError);
  });
});
