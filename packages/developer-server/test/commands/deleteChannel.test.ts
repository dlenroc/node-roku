import { deleteChannel } from '@dlenroc/roku-developer-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';
import { fromFormData } from '../../src/internal/fromFormData.js';

describe('deleteChannel', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('deletes channel', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('plugin_install', {
          method: 'POST',
          body: sinon.match((body) =>
            sinon
              .match({
                mysubmit: 'Delete',
                archive: '',
              })
              .test(fromFormData(body))
          ),
        })
        .resolves(new Response()),
    };

    const result = await deleteChannel(executor);
    assert.strictEqual(result, undefined);
  });
});
