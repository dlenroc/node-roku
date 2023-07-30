import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { createDeveloperKey } from '../../src/commands/createDeveloperKey.ts';

describe('createDeveloperKey', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('return developer key', async () => {
    const id = 'rokudev';
    const password = 'roku';
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('genkey', [])
        .resolves(`Password: ${password}\nDevID: ${id}`),
    };

    const result = await createDeveloperKey(executor);
    assert.deepStrictEqual(result, { id, password });
  });

  test('throws if failed to parse', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('genkey', [])
        .resolves(''),
    };

    const result = createDeveloperKey(executor);
    await assert.rejects(result, DebugServerParsingError);
  });
});
