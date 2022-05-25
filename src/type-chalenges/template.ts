import { Equal, ExpectFalse, Expect } from "@type-challenges/utils";

type MyType<T> = T;

type cases = [
  //
  Expect<Equal<MyType<true>, true>>,
];
