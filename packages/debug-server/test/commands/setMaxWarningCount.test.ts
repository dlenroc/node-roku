import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';
import { DebugServerParsingError } from '../../src/DebugServerParsingError.ts';
import { setMaxWarningCount } from '../../src/commands/setMaxWarningCount.ts';

describe('setMaxWarningCount', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('update max warning count', async () => {
    const limit = 10;
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('brightscript_warnings', [`${limit}`])
        .resolves(`updated brightscript warning limit to ${limit} (was ${limit * 2}})`),
    };

    const result = await setMaxWarningCount(executor, limit);
    assert.strictEqual(result, limit);
  });

  test('throws if failed to parse', async () => {
    const newLimit = 10;
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('brightscript_warnings', [`${newLimit}`])
        .resolves(''),
    };

    const result = setMaxWarningCount(executor, newLimit);
    await assert.rejects(result, DebugServerParsingError);
  });
});
