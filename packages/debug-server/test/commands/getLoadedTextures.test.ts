import {
  DebugServerError,
  getLoadedTextures,
} from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';

describe('getLoadedTextures', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('return loaded textures', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('loaded_textures')
        .resolves(
          [
            '*************************',
            '*  Font Glyph Textures  *',
            '*************************',
          ].join('\n')
        ),
    };

    const result = await getLoadedTextures(executor);

    assert.deepStrictEqual(result, {
      channel: [],
      downloaded: [],
      system: [],
      total: 0,
      used: 0,
    });
  });

  it('throws if failed to parse', async () => {
    const executor = {
      execute: sinon //
        .mock()
        .withExactArgs('loaded_textures')
        .resolves(''),
    };

    const result = getLoadedTextures(executor);
    await assert.rejects(result, DebugServerError);
  });
});
