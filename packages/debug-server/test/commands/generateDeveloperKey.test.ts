import {
  DebugServerError,
  generateDeveloperKey,
} from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';

describe('generateDeveloperKey', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('return developer key', async () => {
    const id = 'rokudev';
    const password = 'roku';
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('genkey')
        .resolves(`Password: ${password}\nDevID: ${id}`),
    };

    const result = await generateDeveloperKey(executor);
    assert.deepStrictEqual(result, { id, password });
  });

  it('throws if failed to parse', async () => {
    const executor = {
      execute: sinon //
        .mock()
        .withExactArgs('genkey')
        .resolves(''),
    };

    const result = generateDeveloperKey(executor);
    await assert.rejects(result, DebugServerError);
  });
});
