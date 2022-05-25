import { Equal, ExpectFalse, Expect } from "@type-challenges/utils";

type MyExclude<T, K> = T extends K ? never : T;

type Expect1 = Exclude<"x" | "y" | "z", "x">;
type Expect2 = Exclude<"x" | "y" | "z", "x" | "y">;
type Expect3 = Exclude<"x" | "y" | "z", "x" | "y" | "z">;
type Expect4 = Exclude<"x" | "y" | "z", "a">;

type cases = [
  //
  Expect<Equal<MyExclude<"x" | "y" | "z", "x">, Expect1>>,
  Expect<Equal<MyExclude<"x" | "y" | "z", "x" | "y">, Expect2>>,
  Expect<Equal<MyExclude<"x" | "y" | "z", "x" | "y" | "z">, Expect3>>,
  Expect<Equal<MyExclude<"x" | "y" | "z", "a">, Expect4>>,
];
