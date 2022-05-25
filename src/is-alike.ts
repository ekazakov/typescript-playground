import { Equal, Expect, ExpectFalse } from "@type-challenges/utils";

export type MergeInsertions<T> = T extends object
  ? { [K in keyof T]: MergeInsertions<T[K]> }
  : T;

// { a: 1 } & { b: 2 } is not equal { a: 1; b: 2 }
// to fix this we iterate over the keys of intersection and create new type
export type Alike<X, Y> = Equal<MergeInsertions<X>, MergeInsertions<Y>>;

type cases = [
  Expect<Alike<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>>,
  ExpectFalse<Equal<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>>
];
