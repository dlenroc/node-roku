import { takeScreenshot } from '@dlenroc/roku-developer-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';
import { fromFormData } from '../../src/internal/fromFormData.js';

describe('takeScreenshot', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('take screenshot', async () => {
    const screenshotPath = 'pkgs/dev.png';

    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('plugin_inspect', {
          method: 'POST',
          body: sinon.match((body) =>
            sinon
              .match({
                mysubmit: 'Screenshot',
                archive: '',
                passwd: '',
              })
              .test(fromFormData(body))
          ),
        })
        .resolves(new Response(screenshotPath)),
    };

    const result = await takeScreenshot(executor);
    assert.strictEqual(result, screenshotPath);
  });
});
