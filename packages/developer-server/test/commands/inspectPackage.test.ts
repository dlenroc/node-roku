import { inspectPackage } from '@dlenroc/roku-developer-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';
import { fromFormData } from '../../src/internal/fromFormData.js';

describe('inspectPackage', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('inspect package', async () => {
    const content = 'content';
    const password = 'password';

    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('plugin_inspect', {
          method: 'POST',
          body: sinon.match((body) =>
            sinon
              .match({
                mysubmit: 'Inspect',
                archive: sinon.match.instanceOf(Blob),
                passwd: password,
              })
              .test(fromFormData(body))
          ),
        })
        .resolves(
          new Response(
            [
              ` r1.insertCell(0).innerHTML = 'App Name: ';`,
              ` r1.insertCell(1).innerHTML = '<div class="roku-color-c3">Node Roku</div>';`,
              ` r2.insertCell(0).innerHTML = 'Dev ID: ';`,
              ` r2.insertCell(1).innerHTML = '<div class="roku-color-c3"><font face="Courier">0011DEV1100</font></div>';`,
              ` var dd = new Date(1704067200000);`,
              ` r3.insertCell(0).innerHTML = 'Creation Date: ';`,
              ` r3.insertCell(1).innerHTML = '<div class="roku-color-c3">'+ddStr+'</div>';`,
              ` r4.insertCell(0).innerHTML = 'dev.zip: ';`,
              ` r4.insertCell(1).innerHTML = '<div class="roku-color-c3"><font face="Courier">0011ZIP1100</font></div>';`,
            ].join('\n')
          )
        ),
    };

    const result = await inspectPackage(executor, {
      content: new Blob([content]),
      password,
    });

    assert.deepStrictEqual(result, {
      appName: 'Node Roku',
      devId: '0011DEV1100',
      devZip: '0011ZIP1100',
      creationDate: new Date('2024-01-01'),
    });
  });
});
