export class DebugServerError extends Error {
  public readonly command: string;
  public readonly output: string;

  constructor(options: { command: string; output: string }) {
    super(`Command "${options.command}" failed with output: ${options.output}`);
    this.name = 'DebugServerError';
    this.command = options.command;
    this.output = options.output;
  }
}
