import { DebugServerError } from './DebugServerError.js';

export class DebugServerParsingError extends DebugServerError {
  public readonly cmd: string;
  public readonly args: string[];
  public readonly result: string;

  get message(): string {
    return `Failed to parse`;
  }

  constructor(options: { cmd: string; args?: string[]; result: string }) {
    super(`Failed to parse result of command "${options.cmd}${options.args ? ' ' + options.args.join(' ') : ''}": ${options.result}`);
    this.name = 'DebugServerParsingError';
    this.cmd = options.cmd;
    this.args = options.args || [];
    this.result = options.result;
  }
}
