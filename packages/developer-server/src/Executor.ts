export interface Executor<Config> {
  execute(
    command:
      | string
      | {
          path: string;
          body?: undefined | Record<string, string | Blob>;
        },
    config?: Config
  ): Promise<{ status: number; body: Blob }>;
}
