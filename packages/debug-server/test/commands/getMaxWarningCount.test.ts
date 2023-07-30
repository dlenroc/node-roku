import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { getMaxWarningCount } from '../../src/commands/getMaxWarningCount.ts';

describe('getMaxWarningCount', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('return max warning count', async () => {
    const limit = 10;
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('brightscript_warnings', [])
        .resolves(`brightscript warning limit: ${limit}`),
    };

    const result = await getMaxWarningCount(executor);
    assert.strictEqual(result, limit);
  });

  test('throws if failed to parse', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('brightscript_warnings', [])
        .resolves(''),
    };

    const result = getMaxWarningCount(executor);
    await assert.rejects(result, DebugServerParsingError);
  });
});
