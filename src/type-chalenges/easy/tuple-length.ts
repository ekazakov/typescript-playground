import { Equal, ExpectFalse, Expect } from "@type-challenges/utils";

type TupleLength<T extends readonly any[]> = T["length"];

const x = [1, 2];

type cases = [
  //
  Expect<Equal<TupleLength<[1, 2, 3]>, 3>>,
  Expect<Equal<TupleLength<[1]>, 1>>,
  Expect<Equal<TupleLength<[]>, 0>>
];
