import { installChannel } from '@dlenroc/roku-developer-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';
import { fromFormData } from '../../src/internal/fromFormData.js';

describe('inspectPackage', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('install channel', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('plugin_install', {
          method: 'POST',
          body: sinon.match((body) =>
            sinon
              .match({
                mysubmit: 'Install',
                archive: sinon.match.instanceOf(Blob),
              })
              .test(fromFormData(body))
          ),
        })
        .resolves(new Response('')),
    };

    const result = await installChannel(executor, { content: new Blob(['']) });
    assert.strictEqual(result, undefined);
  });

  it('install with squashfs', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('plugin_install', {
          method: 'POST',
          body: sinon.match((body) =>
            sinon
              .match({
                mysubmit: 'Install with squashfs',
                archive: sinon.match.instanceOf(Blob),
              })
              .test(fromFormData(body))
          ),
        })
        .resolves(new Response('')),
    };

    const result = await installChannel(executor, {
      content: new Blob(['']),
      useSquashfs: true,
    });

    assert.strictEqual(result, undefined);
  });
});
