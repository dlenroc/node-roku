export class DebugServerError extends Error {
  public readonly cmd: string;
  public readonly args: string[];
  public readonly output: string;

  constructor(options: { cmd: string; args: string[]; output: string }) {
    super(`Command "${options.cmd}" failed: ${options.output}`);
    this.name = 'DebugServerError';
    this.cmd = options.cmd;
    this.args = options.args || [];
    this.output = options.output;
  }
}
