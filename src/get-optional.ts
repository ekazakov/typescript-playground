import type { Equal, Expect, NotAny } from "@type-challenges/utils";

type OptionalKeys<T> = keyof {
  [Key in keyof T as {} extends Pick<T, Key> ? Key: never]: T[Key];
};

type GetOptional1<T> = Pick<T, OptionalKeys<T>>;


type MyPick<Obj, Keys extends keyof Obj> = {
  [K in Keys]: Obj[K];
};

type GetOptional2<T> = {
  [Key in keyof T as {} extends MyPick<T, Key> ? Key: never ]: T[Key]
}



type cases = [
  //
  Expect<Equal<GetOptional1<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<
    Equal<GetOptional1<{ a: undefined; b?: undefined }>, { b?: undefined }>
  >,
  //
  Expect<Equal<GetOptional2<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<
    Equal<GetOptional2<{ a: undefined; b?: undefined }>, { b?: undefined }>
  >,
];
