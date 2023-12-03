import { convertToZip } from '@dlenroc/roku-developer-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';
import { fromFormData } from '../../src/internal/fromFormData.js';

describe('convertToZip', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('converts to zip', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('plugin_install', {
          method: 'POST',
          body: sinon.match((body) =>
            sinon
              .match({
                mysubmit: 'Convert to zip',
                archive: '',
              })
              .test(fromFormData(body))
          ),
        })
        .resolves(new Response()),
    };

    const result = await convertToZip(executor);
    assert.strictEqual(result, undefined);
  });
});
