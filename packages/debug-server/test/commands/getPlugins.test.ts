import { DebugServerParsingError, getPlugins } from '@dlenroc/roku-debug-server';
import assert from 'node:assert';
import { afterEach, describe, test } from 'node:test';
import sinon from 'sinon';

describe('getPlugins', () => {
  afterEach(() => sinon.verifyAndRestore());

  test('return plugins', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('plugins', [])
        .resolves(
          [
            ' F-C + N - S6             586995 [usg     0] [ref  0]       AirPlay, 4.35.505',
            ' F-C + N M S6             600835 [usg     0] [ref  0]     * AirPlay Daemon, 4.35.505',
            ' F-- R S - Z               55545 [usg     0] [ref  0] cmpl  Default screensaver, 1.0.0',
            ' F-- P S - Z                 dev [usg     0] [ref  0] cmpl* Hello World, 1.0.1',
            'Flash space available: 119.0 MB (124805120 bytes)',
            'Allowed plugin space:  163.4 MB (171360256 bytes)',
          ].join('\n')
        ),
    };

    const result = await getPlugins(executor);

    assert.deepStrictEqual(result, {
      plugins: [
        {
          id: 586995,
          is_running: false,
          name: 'AirPlay',
          version: '4.35.505',
        },
        {
          id: 600835,
          is_running: true,
          name: 'AirPlay Daemon',
          version: '4.35.505',
        },
        {
          id: 55545,
          is_running: false,
          name: 'Default screensaver',
          version: '1.0.0',
        },
        {
          id: 'dev',
          is_running: true,
          name: 'Hello World',
          version: '1.0.1',
        },
      ],
    });
  });

  test('return filtered plugins', async () => {
    const id = 'dev';
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('plugins', [id])
        .resolves(
          [
            ' F-- P S - Z                 dev [usg     0] [ref  0] cmpl* Hello World, 1.0.1',
            'Flash space available: 119.0 MB (124805120 bytes)',
            'Allowed plugin space:  163.4 MB (171360256 bytes)',
          ].join('\n')
        ),
    };

    const result = await getPlugins(executor, id);

    assert.deepStrictEqual(result, {
      plugins: [
        {
          id: 'dev',
          is_running: true,
          name: 'Hello World',
          version: '1.0.1',
        },
      ],
    });
  });

  test('throws if failed to parse', async () => {
    const executor = {
      execute: sinon
        .mock()
        .withExactArgs('plugins', [])
        .resolves(''),
    };

    const result = getPlugins(executor);
    await assert.rejects(result, DebugServerParsingError);
  });
});
