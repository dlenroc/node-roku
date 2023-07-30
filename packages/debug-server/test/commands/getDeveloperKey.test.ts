import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { getDeveloperKey } from '../../src/commands/getDeveloperKey.ts';

describe('getDeveloperKey', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('return developer key', async () => {
    const id = '1234567890';
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('showkey', [])
        .resolves(`Dev ID: ${id}`),
    };

    const result = await getDeveloperKey(executor);
    assert.strictEqual(result, id);
  });

  test('throws if failed to parse', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('showkey', [])
        .resolves(''),
    };

    const result = getDeveloperKey(executor);
    await assert.rejects(result, DebugServerParsingError);
  });
});
