export type Config<T> = T extends Executor<infer O> ? O : never;
