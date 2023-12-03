import { saveProfilingData } from '@dlenroc/roku-developer-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';
import { fromFormData } from '../../src/internal/fromFormData.js';

describe('saveProfilingData', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('save profiling data', async () => {
    const profilingDataPath = 'pkgs/channel.bsprof';

    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('plugin_inspect', {
          method: 'POST',
          body: sinon.match((body) =>
            sinon
              .match({
                mysubmit: 'dloadProf',
                archive: '',
                passwd: '',
              })
              .test(fromFormData(body))
          ),
        })
        .resolves(new Response(profilingDataPath)),
    };

    const result = await saveProfilingData(executor);
    assert.strictEqual(result, profilingDataPath);
  });
});
