import { deletePackage } from '@dlenroc/roku-developer-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';
import { fromFormData } from '../../src/internal/fromFormData.js';

describe('deletePackage', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('deletes package', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('plugin_package', {
          method: 'POST',
          body: sinon.match((body) =>
            sinon
              .match({
                mysubmit: 'Delete',
                pkg_time: '0',
                app_name: '',
                passwd: '',
              })
              .test(fromFormData(body))
          ),
        })
        .resolves(new Response()),
    };

    const result = await deletePackage(executor);
    assert.strictEqual(result, undefined);
  });
});
