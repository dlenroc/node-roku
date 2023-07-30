export interface Executor {
  execute(command: string, args?: string[]): Promise<string>;
}
