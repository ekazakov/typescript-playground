import { Equal, ExpectFalse, Expect, Alike } from "@type-challenges/utils";

// Naive
type Includes<T extends any[], K> = K extends T[number] ? true : false;

type Includes2<T extends readonly any[], K> = T extends []
  ? false
  : T extends [infer Head, ...(infer Tail)]
  ? Equal<K, Head> extends true
    ? true
    : Includes2<Tail, K>
  : never;

type cases = [
  //
  Expect<
    Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">, true>
  >,
  Expect<
    Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">, false>
  >,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,

  // Expect<Equal<Includes<[{}], { a: "A" }>, false>>,
  // Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  // Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  // Expect<Equal<Includes<[{ a: "A" }], { readonly a: "A" }>, false>>,
  // Expect<Equal<Includes<[{ readonly a: "A" }], { a: "A" }>, false>>,
  // Expect<Equal<Includes<[1], 1 | 2>, false>>,
  // Expect<Equal<Includes<[1 | 2], 1>, false>>,
];

type cases2 = [
  //
  Expect<
    Equal<Includes2<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">, true>
  >,
  Expect<
    Equal<Includes2<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">, false>
  >,
  Expect<Equal<Includes2<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes2<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes2<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes2<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes2<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes2<[null], undefined>, false>>,
  Expect<Equal<Includes2<[undefined], null>, false>>,

  Expect<Equal<Includes2<[{}], { a: "A" }>, false>>,
  Expect<Equal<Includes2<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes2<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes2<[{ a: "A" }], { readonly a: "A" }>, false>>,
  Expect<Equal<Includes2<[{ readonly a: "A" }], { a: "A" }>, false>>,
  Expect<Equal<Includes2<[1], 1 | 2>, false>>,
  Expect<Equal<Includes2<[1 | 2], 1>, false>>,
  Expect<Equal<Includes2<[never], never>, true>>,
];
