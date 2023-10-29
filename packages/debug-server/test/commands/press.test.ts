import { DebugServerError, press } from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';

describe('press', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('press keys', async () => {
    const keys = 'hhudrlhh';
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('press', [keys])
        .resolves(''),
    };

    const result = await press(executor, { keys });
    assert.strictEqual(result, undefined);
  });

  test('throws if failed to parse', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('press', [''])
        .resolves('.h<dur>  Specify a custom press-and-hold duration'),
    };

    const result = press(executor, { keys: '' });
    await assert.rejects(result, DebugServerError);
  });
});
