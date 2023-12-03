export class DeveloperServerError extends Error {
  public readonly path: string;
  public readonly payload?: RequestInit;
  public readonly response: Response;

  constructor(options: {
    message?: string;
    path: string;
    payload?: RequestInit;
    response: Response;
  }) {
    super(
      options.message ??
        `Request to "${options.path}" failed: ${options.response.status} ${options.response.statusText}`
    );

    this.name = 'DeveloperServerError';
    this.path = options.path;
    this.payload = options.payload!;
    this.response = options.response;
  }
}
