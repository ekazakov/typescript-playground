import { Equal, ExpectFalse, Expect } from "@type-challenges/utils";

type MyAwaited<T> = T extends Promise<infer P> ? MyAwaited<P> : T;

type cases = [
  //
  Expect<Equal<MyAwaited<true>, true>>,
  Expect<Equal<MyAwaited<1>, 1>>,
  Expect<Equal<MyAwaited<Promise<1>>, 1>>,
  Expect<Equal<MyAwaited<Promise<Promise<1>>>, 1>>,
  Expect<Equal<MyAwaited<Promise<Promise<Promise<1>>>>, 1>>,
];
