import { Equal, ExpectFalse, Expect } from "@type-challenges/utils";

type TypleToObject<T extends readonly any[]> = {
  [Key in T[number]]: Key;
};

type cases = [
  //
  Expect<Equal<TypleToObject<["x", "y", 1]>, { x: "x"; y: "y"; 1: 1 }>>,
  Expect<Equal<TypleToObject<["x", "y", {}]>, { x: "x"; y: "y" }>>
];
