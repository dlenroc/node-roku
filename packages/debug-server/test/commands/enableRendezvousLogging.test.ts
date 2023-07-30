import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { enableRendezvousLogging } from '../../src/commands/enableRendezvousLogging.ts';

describe('enableRendezvousLogging', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('enable rendezvous logging', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('logrendezvous', ['on'])
        .resolves('logrendezvous: rendezvous logging is on'),
    };

    const result = await enableRendezvousLogging(executor);
    assert.strictEqual(result, undefined);
  });

  test('throws if failed to parse', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('logrendezvous', ['on'])
        .resolves(''),
    };

    const result = enableRendezvousLogging(executor);
    await assert.rejects(result, DebugServerParsingError);
  });
});
