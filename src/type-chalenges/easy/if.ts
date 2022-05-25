import { Equal, ExpectFalse, Expect } from "@type-challenges/utils";

type If<T, Then, Else> = T extends true ? Then : Else;

type cases = [
  //
  Expect<Equal<If<true, "A", "B">, "A">>,
  Expect<Equal<If<false, "A", "B">, "B">>,
];
