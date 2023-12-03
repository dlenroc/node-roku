import {
  DebugServerError,
  getMaxWarningCount,
} from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import sinon from 'sinon';

describe('getMaxWarningCount', () => {
  afterEach(() => sinon.verifyAndRestore());

  it('return max warning count', async () => {
    const limit = 10;
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('brightscript_warnings')
        .resolves(`brightscript warning limit: ${limit}`),
    };

    const result = await getMaxWarningCount(executor);
    assert.strictEqual(result, limit);
  });

  it('throws if failed to parse', async () => {
    const executor = {
      execute: sinon //
        .mock()
        .withExactArgs('brightscript_warnings')
        .resolves(''),
    };

    const result = getMaxWarningCount(executor);
    await assert.rejects(result, DebugServerError);
  });
});
