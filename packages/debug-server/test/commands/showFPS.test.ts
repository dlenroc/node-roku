import { DebugServerError, showFPS } from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';

describe('showFPS', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('show onscreen graphics statistics', async () => {
    const executor = {
      execute: sinon //
        .mock()
        .withExactArgs('fps_display 1')
        .resolves(''),
    };

    const result = await showFPS(executor);
    assert.strictEqual(result, undefined);
  });

  it('throws if command is not recognized', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('fps_display 1')
        .resolves('Command not recognized'),
    };

    const result = showFPS(executor);
    await assert.rejects(result, DebugServerError);
  });
});
