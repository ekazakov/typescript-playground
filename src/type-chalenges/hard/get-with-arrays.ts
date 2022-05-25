// https://blog.beraliv.dev/2021-03-26-typed-get

import type { Equal, Expect, ExpectFalse } from "@type-challenges/utils";

type Path<T> = T extends `${infer Head}.${infer Tail}`
  ? [Head, ...Path<Tail>]
  : T extends `${infer Head}` 
    ? [Head]
    : []
;

type FilterUndefined<T> = T extends undefined ? never : T;

type FilterNull<T> = T extends null ? never : T;

type FilterNullAndUndefined<T> = FilterNull<FilterUndefined<T>>;


//
// type ExtendsTableRow<T extends any[], E extends any> = {
//   [K in keyof T]: E extends T[K] ? true : false
// }

// type ExtendsTable<T extends any[]> = {
//   [K in keyof T]: ExtendsTableRow<T, T[K]>
// }

// type Table = ExtendsTable<[[0], number[], readonly number[], any[]]>

type IsTuple<A extends unknown[]> = any[] extends A ? false : true;

type cases0 = [
  Expect<IsTuple<[]>>,
  Expect<IsTuple<[1, 2]>>,
  ExpectFalse<IsTuple<number[]>>,
  // @ts-expect-error
  ExpectFalse<IsTuple<number>>,
]

type GetWithArraySimple<A, K> = K extends []
  ? A
  : K extends [infer Key, ...infer Rest]
    ? any[] extends A // descriminate Tuple from Array
      // array
      ? A extends readonly (infer T)[] 
        ? GetWithArraySimple<T | undefined, Rest>
        : undefined
    // tuple    
    : Key extends keyof A 
      ? GetWithArraySimple<A[Key], Rest>
      : undefined
    : never

    type TestObject = [
      // 0
      `Scrollbar customisation`,
      // 1
      `2018-10-04`,
      // 2
      [
        // 2.0
        string,
        // 2.1
        (string | number)[],
        // 2.2
        readonly number[]
      ]
    ];
    
type cases4 = [
  Expect<Equal<GetWithArraySimple<TestObject, ['0']>, `Scrollbar customisation`>>,
  Expect<Equal<GetWithArraySimple<TestObject, ['1']>, `2018-10-04`>>,
  Expect<Equal<GetWithArraySimple<TestObject, ['2', '0']>, string>>,
  Expect<Equal<GetWithArraySimple<TestObject, ['2', '1', '0']>, string | number | undefined>>,
  Expect<Equal<GetWithArraySimple<TestObject, ['2', '2', '2']>, number | undefined>>,
  Expect<Equal<GetWithArraySimple<TestObject, ['3']>, undefined>>,
]

// ====== FINAL VERSION ====================================================

type ExtractFromObject<O extends Record<PropertyKey, unknown>, K> = 
  K extends keyof O
  ? O[K]
  // case for optional props
  // type k = keyof ({a: string } | undefined); --> never
  // type x = 'a' extends keyof ({a: string } | undefined) ? true : false --> false
  : K extends keyof FilterNullAndUndefined<O>
    ? FilterNullAndUndefined<O>[K] | undefined
    : undefined;

type ExtractFromArray<A extends readonly any[], K> = any[] extends A // descriminate Tuple from Array
  // array
  ? A extends readonly (infer T)[]
    ? T | undefined
    : undefined
  // tuple  
  : K extends keyof A
    ? A[K]
    : undefined
;

type GetWithArray<O,K> = K extends []
  ? O
  : K extends[infer Key, ...infer Rest]
    ? O extends Record<PropertyKey, unknown>
      ? GetWithArray<ExtractFromObject<O, Key>, Rest>
      : O extends readonly any[]
        ? GetWithArray<ExtractFromArray<O, Key>, Rest>
        : undefined
    : never
;

type ProductionObject = {
  title: string
  description?: string
  date: number
  author?: {
    name: string
    location?: {
      city: string
    }
  }
  tags?: ['react', 'typescript', 'video']
  signature?: 'Alexey Berezin'
  posts: readonly { html: string }[]
  versions: (string | number)[]
}

type cases = [
  Expect<Equal<GetWithArray<[], ['0']>, undefined>>,
  Expect<Equal<GetWithArray<ProductionObject, ['title']>, string>>,
  Expect<Equal<GetWithArray<ProductionObject, ['description']>, string | undefined>>,
  Expect<Equal<GetWithArray<ProductionObject, ['date']>, number>>,
  Expect<Equal<GetWithArray<ProductionObject, ['author', 'name']>, string | undefined>>,
  Expect<Equal<GetWithArray<ProductionObject, ['author', 'location', 'city']>, string | undefined>>,
  Expect<Equal<GetWithArray<ProductionObject, ['author', 'location', 'address']>, undefined>>,
  Expect<Equal<GetWithArray<ProductionObject, ['author', 'credentials', '0']>, undefined>>,
  Expect<Equal<GetWithArray<ProductionObject, ['tags', '0']>, 'react' | undefined>>,
  Expect<Equal<GetWithArray<ProductionObject, ['tags', '3']>, undefined>>,
  Expect<Equal<GetWithArray<ProductionObject, ['signature']>, 'Alexey Berezin' | undefined>>,
  Expect<Equal<GetWithArray<ProductionObject, ['posts', '0']>, { html: string } | undefined>>,
  Expect<Equal<GetWithArray<ProductionObject, ['posts', '0', 'html']>, string | undefined>>,
  Expect<Equal<GetWithArray<ProductionObject, ['versions', '0']>, string | number | undefined>>,
]

type Get<T, K extends string> = GetWithArray<T, Path<K>>;

type cases2 = [
  Expect<Equal<Get<ProductionObject, 'title'>, string>>,
  Expect<Equal<Get<ProductionObject, 'description'>, string | undefined>>,
  Expect<Equal<Get<ProductionObject, 'date'>, number>>,
  Expect<Equal<Get<ProductionObject, 'author.name'>, string | undefined>>,
  Expect<Equal<Get<ProductionObject, 'author.location.city'>, string | undefined>>,
  Expect<Equal<Get<ProductionObject, 'author.location.address'>, undefined>>,
  Expect<Equal<Get<ProductionObject, 'author.credentials.0'>, undefined>>,
  Expect<Equal<Get<ProductionObject, 'tags.0'>, 'react' | undefined>>,
  Expect<Equal<Get<ProductionObject, 'tags.3'>, undefined>>,
  Expect<Equal<Get<ProductionObject, 'signature'>, 'Alexey Berezin' | undefined>>,
  Expect<Equal<Get<ProductionObject, 'posts.0'>, { html: string } | undefined>>,
  Expect<Equal<Get<ProductionObject, 'posts.0.html'>, string | undefined>>,
  Expect<Equal<Get<ProductionObject, 'versions.0'>, string | number | undefined>>,
]

// case for known object type
function get<O, K extends string>(obj: O, path: K): Get<O, K>;

// fallback for some unknow object
function get(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split(".")

  let currentObj = obj
  for (const key of keys) {
    const value = currentObj[key]
    if (value === undefined || value === null) {
      return undefined
    }

    currentObj = value as Record<string, unknown>
  }

  return currentObj
}