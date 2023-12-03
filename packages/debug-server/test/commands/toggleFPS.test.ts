import { DebugServerError, toggleFPS } from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';

describe('toggleFPS', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('toggle onscreen graphics statistics', async () => {
    const executor = {
      execute: sinon //
        .mock()
        .withExactArgs('fps_display')
        .resolves(''),
    };

    const result = await toggleFPS(executor);
    assert.strictEqual(result, undefined);
  });

  it('throws if command is not recognized', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('fps_display')
        .resolves('Command not recognized'),
    };

    const result = toggleFPS(executor);
    await assert.rejects(result, DebugServerError);
  });
});
