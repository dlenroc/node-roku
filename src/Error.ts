export class RokuError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RokuError';
  }
}
