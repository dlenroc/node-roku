export interface Executor<Config> {
  execute(command: string, args: string[], config?: Config): Promise<string>;
}
