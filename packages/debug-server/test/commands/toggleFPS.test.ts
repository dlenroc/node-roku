import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { toggleFPS } from '../../src/commands/toggleFPS.ts';

describe('toggleFPS', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('toggle onscreen graphics statistics', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('fps_display', [])
        .resolves(''),
    };

    const result = await toggleFPS(executor);
    assert.strictEqual(result, undefined);
  });

  test('throws if command is not recognized', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('fps_display', [])
        .resolves('Command not recognized'),
    };

    const result = toggleFPS(executor);
    await assert.rejects(result, DebugServerParsingError);
  });
});
