export type Config<T> = T extends Executor<infer O> ? O : never;

export type Mixed<A, B> =
  | (A & B)
  | (Omit<A, keyof B> &
      Omit<B, keyof A> & { [K in keyof (A | B)]: (A | B)[K] });
