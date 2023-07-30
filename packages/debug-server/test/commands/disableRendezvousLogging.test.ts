import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { disableRendezvousLogging } from '../../src/commands/disableRendezvousLogging.ts';

describe('disableRendezvousLogging', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('disable rendezvous logging', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('logrendezvous', ['off'])
        .resolves('logrendezvous: rendezvous logging is off'),
    };

    const result = await disableRendezvousLogging(executor);
    assert.strictEqual(result, undefined);
  });

  test('throws if failed to parse', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('logrendezvous', ['off'])
        .resolves(''),
    };

    const result = disableRendezvousLogging(executor);
    await assert.rejects(result, DebugServerParsingError);
  });
});
