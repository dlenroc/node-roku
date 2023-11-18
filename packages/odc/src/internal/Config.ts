import type { Executor } from '../Executor.js';

export type Config<T> = T extends Executor<infer O> ? O : never;
