import { DebugServerError, getR2D2Bitmaps } from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';

describe('getR2D2Bitmaps', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('return R2D2 bitmaps', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('r2d2_bitmaps')
        .resolves(
          [
            'RoGraphics instance 0x93f2fed2',
            'address    width height bpp     size   buf sz  tex  fbo name',
            '0x8e801e92   100      6   4    16384        0  253    0 /RokuOS/Artwork/SceneGraph/GenevaTheme/Base/HD/dividerHorizontal.9.png',
            '0x8eb92fb2    96     96   4    36864        0  251    0 /RokuOS/Artwork/SceneGraph/GenevaTheme/Base/HD/focus_grid.9.png',
          ].join('\n')
        ),
    };

    const result = await getR2D2Bitmaps(executor);

    assert.deepStrictEqual(result, [
      {
        address: '0x8e801e92',
        width: 100,
        height: 6,
        bpp: 4,
        size: 16384,
        bufSz: 0,
        tex: 253,
        fbo: 0,
        name: '/RokuOS/Artwork/SceneGraph/GenevaTheme/Base/HD/dividerHorizontal.9.png',
      },
      {
        address: '0x8eb92fb2',
        width: 96,
        height: 96,
        bpp: 4,
        size: 36864,
        bufSz: 0,
        tex: 251,
        fbo: 0,
        name: '/RokuOS/Artwork/SceneGraph/GenevaTheme/Base/HD/focus_grid.9.png',
      },
    ]);
  });

  it('throws if failed to parse', async () => {
    const executor = {
      execute: sinon //
        .mock()
        .withExactArgs('r2d2_bitmaps')
        .resolves(''),
    };

    const result = getR2D2Bitmaps(executor);
    await assert.rejects(result, DebugServerError);
  });
});
