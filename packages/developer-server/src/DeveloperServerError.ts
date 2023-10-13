export class DeveloperServerError extends Error {
  public readonly method: string;
  public readonly path: string;
  public readonly payload?: Record<string, string | Blob>;
  public readonly result: string;

  constructor(options: {
    method: string;
    path: string;
    payload?: Record<string, string | Blob>;
    result: string;
  }) {
    super(
      `Failed to parse result of ${options.method} ${options.path} request`
    );
    this.name = 'DeveloperServerError';
    this.method = options.method;
    this.path = options.path;
    this.payload = options.payload;
    this.result = options.result;
  }
}
