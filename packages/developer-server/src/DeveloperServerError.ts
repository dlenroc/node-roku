export class DeveloperServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DeveloperServerError';
  }
}
