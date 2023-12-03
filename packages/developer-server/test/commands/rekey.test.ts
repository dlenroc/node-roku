import { rekey } from '@dlenroc/roku-developer-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';
import { fromFormData } from '../../src/internal/fromFormData.js';

describe('rekey', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('rekey', async () => {
    const content = new Blob(['']);
    const password = 'password';

    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('plugin_inspect', {
          method: 'POST',
          body: sinon.match((body) =>
            sinon
              .match({
                mysubmit: 'Rekey',
                archive: sinon.match.instanceOf(Blob),
                passwd: password,
              })
              .test(fromFormData(body))
          ),
        })
        .resolves(new Response('')),
    };

    const result = await rekey(executor, { content, password });
    assert.strictEqual(result, undefined);
  });
});
