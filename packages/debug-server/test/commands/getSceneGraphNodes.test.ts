import {
  DebugServerError,
  getSceneGraphNodes,
} from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';

describe('getSceneGraphNodes', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('return nodes', async () => {
    const query = 'all';
    const xml = '</All_Nodes>\n\t<Label text="Roku"/>\n</All_Nodes>';

    const executor = {
      execute: sinon //
        .mock()
        .withExactArgs(`sgnodes ${query}`)
        .resolves(xml),
    };

    const result = await getSceneGraphNodes(executor, { query });
    assert.strictEqual(result, xml);
  });

  it('throws if dev channel is not running', async () => {
    const query = 'all';
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs(`sgnodes ${query}`)
        .resolves('sgnodes requires running dev channel'),
    };

    const result = getSceneGraphNodes(executor, { query });
    await assert.rejects(result, DebugServerError);
  });
});
