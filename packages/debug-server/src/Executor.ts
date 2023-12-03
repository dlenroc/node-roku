export interface Executor<Config = {}> {
  execute(command: string, config?: Config): Promise<string>;
}
