// https://evertpot.com/opaque-ts-types/
// https://michalzalecki.com/nominal-typing-in-typescript/#approach-2-brands
// https://blog.beraliv.dev/2021-05-07-opaque-type-in-typescript

declare const brand: unique symbol;

type Brand<Type, Brand> = Type & { readonly [brand]: Brand };

type USD = Brand<number, "USD">;
type EUR = Brand<number, "EUR">;

export function add<T extends USD | EUR>(a: T, b: T): T {
  return (a + b) as T;
}

export function ofUSD(v: number) {
  return v as USD;
}

export function ofEUR(v: number) {
  return v as EUR;
}
