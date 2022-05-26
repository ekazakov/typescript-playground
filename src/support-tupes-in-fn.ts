// Support tuples and arrays in a function arguments
// https://twitter.com/beraliv/status/1523799358361194496

type IsTuple<T> = any[] extends T ? false : true;

type Iteration<T> = IsTuple<T> extends true
  ? T extends [Promise<infer U>, ...(infer Rest)]
    ? [U, ...Iteration<Rest>]
    : []
  : T extends Promise<infer U>[]
  ? U[]
  : [];

declare const promiseAll: <T extends readonly Promise<unknown>[]>(
  t: readonly [...T],
) => Promise<Iteration<T>>;

// TESTING

declare const promise1: Promise<number>;
declare const promise2: Promise<string>;
declare const promise3: Promise<boolean>;
declare const promiseArray: Promise<string>[];

async function testing() {
  let v1 = await promiseAll([promise1]);
  //  ^? [number]
  let v2 = await promiseAll([promise1] as const);
  //  ^? [number]
  let v3 = await promiseAll([promise1, promise2]);
  //  ^? [number, string]
  let v4 = await promiseAll([promise1, promise2] as const);
  //  ^? [number, string]
  let v5 = await promiseAll([promise1, promise2, promise3]);
  //  ^? [number, string, buoolean]
  let v6 = await promiseAll([promise1, promise2, promise3] as const);
  //  ^? [number, string, buoolean]
  let v7 = await promiseAll(promiseArray);
  //  ^? string[]
}
