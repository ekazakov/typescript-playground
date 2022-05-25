import { Equal, ExpectFalse, Expect } from "@type-challenges/utils";

type MyExtract<T, K> = T extends K ? T : never;

type MyPick1<T, K> = {
  [Key in MyExtract<keyof T, K>]: T[Key];
};

type MyPick2<T, K extends keyof T> = {
  [Key in K]: T[Key];
};

type cases = [
  //
  Expect<Equal<MyPick1<{ x: 1; y: 2; z: 3 }, "x">, { x: 1 }>>,
  Expect<Equal<MyPick1<{ x: 1; y: 2; z: 3 }, "x" | "y">, { x: 1; y: 2 }>>,
  Expect<Equal<MyPick1<{ x: 1; y: 2; z: 3 }, "">, {}>>,
  Expect<Equal<MyPick1<{ x: 1; y: 2; z: 3 }, "b">, {}>>,
  //
  Expect<Equal<MyPick2<{ x: 1; y: 2; z: 3 }, "x">, { x: 1 }>>,
  Expect<Equal<MyPick2<{ x: 1; y: 2; z: 3 }, "x" | "y">, { x: 1; y: 2 }>>,

  ExpectFalse<Equal<MyPick2<{ x: 1; y: 2; z: 3 }, "">, {}>>

  // Expect<Equal<MyPick<"x" | "y" | "z", "x">, "x">>,
  // Expect<Equal<MyPick<"x" | "y" | "z", "x" | "z">, "x" | "z">>
];
