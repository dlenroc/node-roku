import { DebugServerError, hideFPS } from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';

describe('hideFPS', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('hide onscreen graphics statistics', async () => {
    const executor = {
      execute: sinon //
        .mock()
        .withExactArgs('fps_display 0')
        .resolves(''),
    };

    const result = await hideFPS(executor);
    assert.strictEqual(result, undefined);
  });

  it('throws if command is not recognized', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('fps_display 0')
        .resolves('Command not recognized'),
    };

    const result = hideFPS(executor);
    await assert.rejects(result, DebugServerError);
  });
});
