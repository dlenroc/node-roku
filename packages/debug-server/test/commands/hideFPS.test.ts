import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { hideFPS } from '../../src/commands/hideFPS.ts';

describe('hideFPS', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('hide onscreen graphics statistics', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('fps_display', ['0'])
        .resolves(''),
    };

    const result = await hideFPS(executor);
    assert.strictEqual(result, undefined);
  });

  test('throws if command is not recognized', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('fps_display', ['0'])
        .resolves('Command not recognized'),
    };

    const result = hideFPS(executor);
    await assert.rejects(result, DebugServerParsingError);
  });
});
