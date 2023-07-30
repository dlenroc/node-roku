import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { getSceneGraphNodes } from '../../src/commands/getSceneGraphNodes.ts';

describe('getSceneGraphNodes', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('return nodes', async () => {
    const node = 'all';
    const xml = '</All_Nodes>\n\t<Label text="Roku"/>\n</All_Nodes>';

    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('sgnodes', [node])
        .resolves(xml),
    };

    const result = await getSceneGraphNodes(executor, node);
    assert.strictEqual(result, xml);
  });

  test('throws if dev channel is not running', async () => {
    const node = 'all';
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('sgnodes', [node])
        .resolves('sgnodes requires running dev channel'),
    };

    const result = getSceneGraphNodes(executor, node);
    await assert.rejects(result, DebugServerParsingError);
  });
});
