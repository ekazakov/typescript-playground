import { Equal, ExpectFalse, Expect } from "@type-challenges/utils";

type MyReadonly<T> = {
  +readonly [Key in keyof T]: T[Key];
};

type cases = [
  //
  Expect<Equal<MyReadonly<{ x: 1; y: 2 }>, { readonly x: 1; readonly y: 2 }>>
];
