export class ECPError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ECPError';
  }
}
