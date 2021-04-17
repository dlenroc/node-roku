export class DebugServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DebugServerError';
  }
}
