import type { Equal, Expect } from "@type-challenges/utils";
/*
  459 - Flatten
  -------
  by zhouyiming (@chbro) #medium #array
  
  ### Question
  
  In this challenge, you would need to write a type that takes an array and emitted the flatten array type.
  
  For example:
  
  ```ts
  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
  ```
  
  > View on GitHub: https://tsch.js.org/459
*/

/* _____________ Your Code Here _____________ */

type Flatten<T extends readonly any[]> = T extends [infer Head, ...(infer Tail)]
  ? Head extends any[]
    ? [...Flatten<Head>, ...Flatten<Tail>]
    : [Head, ...Flatten<Tail>]
  : [];

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<
    Equal<
      Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>,
      [{ foo: "bar"; 2: 10 }, "foobar"]
    >
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/459/answer
  > View solutions: https://tsch.js.org/459/solutions
  > More Challenges: https://tsch.js.org
*/
