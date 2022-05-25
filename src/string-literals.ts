import type { Equal, Expect, NotAny } from "@type-challenges/utils";

type ToCamel1<S extends string> =
 S extends `${infer Head}_${infer Tail}`
 ? `${Head}${Capitalize<Tail>}`
 : S;


 type ToCamel<S extends string> =
  S extends `${infer Head}_${infer Tail}`
  ? `${Head}${Capitalize<ToCamel<Tail>>}` 
  : S;

 type cases1 = [
   Expect<Equal<ToCamel<"">, "">>, 
   Expect<Equal<ToCamel<"hello">, "hello">>,
   Expect<Equal<ToCamel<"hello_foo">, "helloFoo">>,
   Expect<Equal<ToCamel<"hello_foo_bar_baz">, "helloFooBarBaz">>,
   Expect<Equal<ToCamel<"hello_foo" | "foo_bar">, "helloFoo" | "fooBar">>,
 ];

 // -------------------------------------

 type ObjectToCamel<T extends object> = {
   [K in keyof T as ToCamel<K & string>]: T[K]
 }

 // --------------------------------------

 interface Student {
   name: string;
   age: number;
 }

 type Evented<T extends object> = {
   [K in keyof T as `${K & string}Changed`]: (val: T[K]) => void;
 }

 type StudentEvents = Evented<Student>;

