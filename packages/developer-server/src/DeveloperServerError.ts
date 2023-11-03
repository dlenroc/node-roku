export class DeveloperServerError extends Error {
  public readonly path: string;
  public readonly params: Record<string, string | Blob> | undefined;
  public readonly output: string;

  constructor(options: {
    path: string;
    params?: Record<string, string | Blob> | undefined;
    output: string;
    message?: string;
  }) {
    super(
      options.message ||
        `Failed to parse result of ${options.path} command: ${options.output}`
    );

    this.name = 'DeveloperServerError';
    this.path = options.path;
    this.params = options.params;
    this.output = options.output;
  }
}
