import { convertToSquashfs } from '@dlenroc/roku-developer-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';
import { fromFormData } from '../../src/internal/fromFormData.js';

describe('convertToSquashfs', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('converts to squashfs', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('plugin_install', {
          method: 'POST',
          body: sinon.match((body) =>
            sinon
              .match({
                mysubmit: 'Convert to squashfs',
                archive: '',
              })
              .test(fromFormData(body))
          ),
        })
        .resolves(new Response()),
    };

    const result = await convertToSquashfs(executor);
    assert.strictEqual(result, undefined);
  });
});
