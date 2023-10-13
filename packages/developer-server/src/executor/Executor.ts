export interface Executor {
  execute(
    request: {
      method: string;
      path: string;
      form?: Record<string, string | Blob>;
    },
    options?: {
      signal?: AbortSignal;
    }
  ): Promise<{ status: number; body: Blob }>;
}
