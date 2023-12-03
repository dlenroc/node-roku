import { packageChannel } from '@dlenroc/roku-developer-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';
import { fromFormData } from '../../src/internal/fromFormData.js';

describe('packageChannel', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('package channel', async () => {
    const name = 'Node Roku';
    const password = 'password';
    const packagePath = 'pkgs/app.pkg';

    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('plugin_package', {
          method: 'POST',
          body: sinon.match((body) =>
            sinon
              .match({
                mysubmit: 'Package',
                pkg_time: sinon.match.string,
                app_name: name,
                passwd: password,
              })
              .test(fromFormData(body))
          ),
        })
        .resolves(new Response(packagePath)),
    };

    const result = await packageChannel(executor, { name, password });
    assert.strictEqual(result, packagePath);
  });
});
