import { Equal, Expect } from "@type-challenges/utils";

// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
type IsAny<T> = 0 extends 1 & T ? true : false;

type cases = [
  Expect<Equal<IsAny<any>, true>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<number>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<null>, false>>
];
