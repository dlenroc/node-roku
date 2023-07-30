import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { showFPS } from '../../src/commands/showFPS.ts';

describe('showFPS', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('show onscreen graphics statistics', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('fps_display', ['1'])
        .resolves(''),
    };

    const result = await showFPS(executor);
    assert.strictEqual(result, undefined);
  });

  test('throws if command is not recognized', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('fps_display', ['1'])
        .resolves('Command not recognized'),
    };

    const result = showFPS(executor);
    await assert.rejects(result, DebugServerParsingError);
  });
});
