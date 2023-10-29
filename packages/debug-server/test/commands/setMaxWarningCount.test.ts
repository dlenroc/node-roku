import { DebugServerError, setMaxWarningCount } from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';

describe('setMaxWarningCount', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('update max warning count', async () => {
    const count = 10;
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('brightscript_warnings', [`${count}`])
        .resolves(`updated brightscript warning limit to ${count} (was ${count * 2}})`),
    };

    const result = await setMaxWarningCount(executor, { count });
    assert.strictEqual(result, count);
  });

  test('throws if failed to parse', async () => {
    const count = 10;
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('brightscript_warnings', [`${count}`])
        .resolves(''),
    };

    const result = setMaxWarningCount(executor, { count });
    await assert.rejects(result, DebugServerError);
  });
});
