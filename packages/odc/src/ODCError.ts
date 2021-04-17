export class ODCError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ODCError';
  }
}
