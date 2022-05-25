import { Equal, ExpectFalse, Expect } from "@type-challenges/utils";

type FirstOfArray<T extends any[]> = T extends [] ? never : T[0];

type cases = [
  //
  Expect<Equal<FirstOfArray<[1, 2, 3]>, 1>>,
  Expect<Equal<FirstOfArray<[]>, never>>,
];
