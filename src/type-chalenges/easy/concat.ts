import { Equal, ExpectFalse, Expect } from "@type-challenges/utils";

type Concat<T extends any[], K extends any[]> = [...T, ...K];

type cases = [
  //
  Expect<Equal<Concat<[1], [2]>, [1, 2]>>,
  Expect<Equal<Concat<["a"], [2]>, ["a", 2]>>,
];
