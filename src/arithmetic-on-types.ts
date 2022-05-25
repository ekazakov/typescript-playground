//
// https://www.typescriptlang.org/play?ts=4.6.2&ssl=60&ssc=70&pln=60&pc=75#code/JYWwDg9gTgLgBAbzgUQI4FcCGAbANCgDzAFMBjeAXzgDMoIQ4AiAARgE8SBaUgCx22IA7AObEAzgHp0MYNjGMA3ACglEiXHYk4AGSHCYPADwAVOMQIwhAEzFxMgtgG0AugD44AXjir1cP6fNLQRtEOAERAwAuOGBBamIoHTgqAH4k6MFiADcE5SVNYh09AxMzC2tbeyc3TzgA8uDbRwA6VoAKWPjEgGkASmclPzTux0Zw-R5GAb8M7NyVArgAIXRZK2N0MAFDbTKgkMF0EAAjBPx6-cqHF1qXdy8LisRBsOKeaO1lChe04xfolZrDZbYg7fAtVrGfBVNx5RYAQSsVkM8L2T0OJzOyzRjTgGNOUHuRQiRheEOagOw60223hrnwrQpqypwO2S1cA1ccI4hQAyuhjjAoJhyCicQcjgT8EtxbZ8QkiZTqSCUe5Ak9HC9GR04gk4ABVXq4LWtJWs0HspTTOBpXQkwz61z-PFzKB5NRwMBQYgwGQJTjAYSCaDEfI8uAAWXQ2BkiORLwAcrK8ZKzi94aRSMn5VBjX4AJLZ1O5l5Ewvq3EABhtcAzWeiUZjwDjhgT+BbdfwCfpcH5guFovz+AAjK4uQtw8gAIoo6VE1EVkIytJtGWL2yotJC9CFaLUHBiYi9OB7g-Ed3qL0+v1QANBkNhrTaYyGXlFzG57HrlMfxXM5VsmqDQhJqfiMmaNKgry9Ims0VQuPgHqkBA0ZWHApxwNW4wGPgYgQDoL4AMy4IR7jejA6BQIItjbqGfhVHAHpCGIlHiBofDwDKrheLyADUw5Wj8GhQDuzr7nI54TlojYyH2rbvlKcAACIKViU6qYStTPoYiZ5spShAZcwmiUMcBTs6MnAHJfZCiKMCtvgSk9kp7ZIoYU4jmO3LSdGMhbGwYrfjm0oaUSlkdvglZzt5hRKcAWTAFYoILsBcrFiFQXFmFvlWQKs7LJF46PoUEYQFY0YQIFqU-opa7VTmRLafCc7JrRNrpiekZlRVr4CrZorNcsPbsnkxVwPmYgJhAMAJsQwiYDIOTyZlv61AABgAJAgCYUGtyZrZwW05rtNbiYenW0TF41iPmgj2UmK0EkSLybdtJ3fq9x3NEdxYnWkZ27sZhQqGNpCYIetheKBjHqLoYhiMYPBCC8yBEGQ9loFg2A7ER+CkfgANjnpqMkKKmM4DjhjEXAAAsPa0UTKNo2TGAU9pACseM9oTMEvB6doTEzpMY6z2MCyUjhVNCDjS2wbhczBfgk+jhjk2LbyGHchWK4Qwuq6LhgQSqdPglLdgy+bbCy24vN+B6cZCyrasom51MAEw9uzjNK8zItYy7yJRZhPaVt7utOwbLYAJxRwAHJ5+Ax1HjMqHbEh9o7LP+zZA72e7PajjrytZxTOd2VT+Amy6OSErbMORjlDs+3rzvha7kWVwXHtF77+v+23yLDh3cCjp5PctwbA+GEHM8hynacN02GfNxH-c5XJABs+AAOyFdrxO963695VvcCn6HY8HxPa9LyfeN73A3fGnz6iWf5md+xTb-YAFbv4B7ndx6ry-jlfyhgh4jwLmHYun9sbfwCrPfeqd65xQSklD+fcKaoMSqCGm-8exPwwc7bBSVwEJ0gXXD0pVyrYAgEQye3VaGGDwY-OeQCS5wMYZVTmcB8asPYbAww1CeoQL4YXZ+C8JoAAUIBiGAItOi4cOGGAmlNGac0FrxVBKPIG0DD4G1UdNWa80FHT3piJYgejr4U0MeokxWjDCcB0TzCR9cJq3RgPQ-27i7rgPMTuKxwDsY+PshfXRAjMHBJur44czQAE0DPIE5RITp7NGcYkmCzhlBAA

import { Equal, Expect } from "@type-challenges/utils";

// type Length<T extends any[]> =
//    T extends { length: infer L } ? L : never;

type Length<T extends any[]> = T extends [...(infer K)] ? K["length"] : never;

type BuildTuple<L extends number, T extends any[] = []> = T extends {
  length: L;
}
  ? T
  : BuildTuple<L, [...T, any]>;

type Add<A extends number, B extends number> = Length<
  [...BuildTuple<A>, ...BuildTuple<B>]
>;

type Subtract<A extends number, B extends number> = BuildTuple<A> extends [
  ...(infer U),
  ...BuildTuple<B>
]
  ? Length<U>
  : never;

// prettier-ignore
type MultiAdd<
  N extends number,
  Acc extends number,
  I extends number,
  > = I extends 0 ? Acc : MultiAdd<N, Add<Acc, N>, Subtract<I, 1>>;

type EQ<A, B> = A extends B ? (B extends A ? true : false) : false;

// prettier-ignore
type LT<S extends number, B extends number> = BuildTuple<B> extends [
  ...BuildTuple<S>,
  ...any[], // could be 0 length, so LT<3,3> returns true
  any // ensures that B >= S+1
]
  ? true
  : false;

type MultiSub<N extends number, D extends number, Q extends number> = LT<
  N,
  D
> extends true
  ? Q
  : MultiSub<Subtract<N, D>, D, Add<Q, 1>>;

type Multiply<A extends number, B extends number> = MultiAdd<A, 0, B>;

type Divide<A extends number, B extends number> = MultiSub<A, B, 0>;

type Modulo<A extends number, B extends number> = LT<A, B> extends true
  ? A
  : Modulo<Subtract<A, B>, B>;


type IsNotNegative<N extends number> = `${N}` extends `-${number}` ? false : true;

type IsInt<N extends number> =
  `${N}` extends `${number}.${number}` ? false : true

type cases = [
  // LessThen
  Expect<Equal<LT<3, 3>, false>>,
  Expect<Equal<LT<3, 4>, true>>,
  Expect<Equal<LT<5, 3>, false>>,

  // Length
  Expect<Equal<Length<[any, any, any]>, 3>>,
  Expect<Equal<Length<[]>, 0>>,
  Expect<Equal<BuildTuple<4>, [any, any, any, any]>>,

  // Add
  Expect<Equal<Add<3, 2>, 5>>,
  Expect<Equal<Add<0, 0>, 0>>,
  Expect<Equal<Add<998, 1>, 999>>,

  //Sub
  Expect<Equal<Subtract<3, 2>, 1>>,
  Expect<Equal<Subtract<3, 4>, never>>,

  // MultiAdd
  Expect<Equal<MultiAdd<3, 0, 4>, 12>>,
  Expect<Equal<MultiAdd<1, 0, 1>, 1>>,
  Expect<Equal<MultiAdd<0, 0, 0>, 0>>,

  // MultiSub
  Expect<Equal<MultiSub<6, 7, 0>, 0>>,
  Expect<Equal<MultiSub<6, 6, 0>, 1>>,
  Expect<Equal<MultiSub<6, 3, 0>, 2>>,

  // Multiply
  Expect<Equal<Multiply<2, 2>, 4>>,
  Expect<Equal<Multiply<1, 1>, 1>>,
  Expect<Equal<Multiply<0, 0>, 0>>,

  // Divide
  Expect<Equal<Divide<4, 2>, 2>>,
  Expect<Equal<Divide<1, 1>, 1>>,

  // Modulo
  Expect<Equal<Modulo<4, 2>, 0>>,
  Expect<Equal<Modulo<5, 3>, 2>>,
  Expect<Equal<Modulo<1, 3>, 1>>,

  // IsPositive
  Expect<Equal<IsNotNegative<1>, true>>,
  Expect<Equal<IsNotNegative<0>, true>>,
  Expect<Equal<IsNotNegative<-1>, false>>,

  // IsInt
  Expect<Equal<IsInt<1>, true>>,
  Expect<Equal<IsInt<0>, true>>,
  Expect<Equal<IsInt<1.2>, false>>,
  Expect<Equal<IsInt<0.1>, false>>,
];
