import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { removePlugin } from '../../src/commands/removePlugin.ts';

describe('removePlugin', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('remove plugin by id', async () => {
    const id = 'dev';
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('remove_plugin', [id])
        .resolves(`Removed sideloaded plugin id: ${id}`),
    };

    const result = await removePlugin(executor, id);
    assert.strictEqual(result, undefined);
  });

  test('throws if failed to remove plugin', async () => {
    const id = 0;
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('remove_plugin', [`${id}`])
        .resolves(`Failed to remove plugin id: ${id}, name: unknown. Plugin is NOT installed on the device`),
    };

    const result = removePlugin(executor, id);
    await assert.rejects(result, DebugServerParsingError);
  });
});
