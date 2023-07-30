import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { press } from '../../src/commands/press.ts';

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

    const result = await press(executor, keys);
    assert.strictEqual(result, undefined);
  });

  test('throws if failed to parse', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('press', [''])
        .resolves('.h<dur>  Specify a custom press-and-hold duration'),
    };

    const result = press(executor, '');
    await assert.rejects(result, DebugServerParsingError);
  });
});
