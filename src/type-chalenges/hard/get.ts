// https://blog.beraliv.dev/2021-03-26-typed-get

import type { Equal, Expect } from "@type-challenges/utils";
/*
  270 - Typed Get
  -------
  by Anthony Fu (@antfu) #hard #utils #template-literal
  
  ### Question
  
  The [`get` function in lodash](https://lodash.com/docs/4.17.15#get) is a quite convenient helper for accessing nested values in JavaScript. However, when we come to TypeScript, using functions like this will make you lose the type information. With TS 4.1's upcoming [Template Literal Types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1-beta/#template-literal-types) feature, properly typing `get` becomes possible. Can you implement it?
  
  For example,
  
  ```ts
  type Data = {
    foo: {
      bar: {
        value: 'foobar',
        count: 6,
      },
      included: true,
    },
    hello: 'world'
  }
    
  type A = Get<Data, 'hello'> // 'world'
  type B = Get<Data, 'foo.bar.count'> // 6
  type C = Get<Data, 'foo.bar'> // { value: 'foobar', count: 6 }
  ```
  
  Accessing arrays is not required in this challenge.
  
  > View on GitHub: https://tsch.js.org/270
*/

/* _____________ Your Code Here _____________ */

type Path<T> = T extends `${infer Head}.${infer Tail}`
  ? [Head, ...Path<Tail>]
  : T extends `${infer Head}` 
    ? [Head]
    : []
;

type GetWithArray<O, K> = K extends [] 
  ? O
  : K extends [infer Key, ...infer Rest]
    ? Key extends keyof O 
      ? GetWithArray<O[Key], Rest>
      : never
    : never;

type Get<T, K extends string> = GetWithArray<T, Path<K>>;

/* _____________ Test Cases _____________ */

type Data = {
  foo: {
    bar: {
      value: "foobar";
      count: 6;
    };
    included: true;
  };
  hello: "world";
};

type cases = [
  Expect<Equal<Get<Data, "hello">, "world">>,
  Expect<Equal<Get<Data, "foo.bar.count">, 6>>,
  Expect<Equal<Get<Data, "foo.bar">, { value: "foobar"; count: 6 }>>,

  Expect<Equal<Get<Data, "no.existed">, never>>,
];

// Support for optional fields

type FilterUndefined<T> = T extends undefined ? never : T;
type FilterNull<T> = T extends null ? never : T;

type FilterNullAndUndefined<T> = FilterNull<FilterUndefined<T>>;



type GetWithArray2<O, K> = K extends []
  ? O
  : K extends [infer Key, ...infer Rest]
    ? Key extends keyof O 
      ? GetWithArray2<O[Key], Rest>
      : Key extends keyof FilterNullAndUndefined<O>
        ? GetWithArray2<FilterNullAndUndefined<O>[Key], Rest> | undefined
        : undefined
    : never

type Get2<O, P extends string> = GetWithArray2<O, Path<P>>




type ProductionObject = {
  description?: string;
  title: string;
  date: string;
  author?: {
    name: string;
    location?: {
      city: string;
    }
  }
}

// type t1 = Get2<ProductionObject, 'title'>;
// type t2 = Get2<ProductionObject, 'author.name'>;
// type t3 = Get2<ProductionObject, 'author.card.number'>;


type cases2 = [
  Expect<Equal<GetWithArray2<ProductionObject, ['title']>, string>>,
  Expect<Equal<GetWithArray2<ProductionObject, ['date']>, string>>,
  Expect<Equal<GetWithArray2<ProductionObject, ['description']>, string | undefined>>,
  Expect<Equal<GetWithArray2<ProductionObject, ['author', 'name']>, string | undefined>>,
  Expect<Equal<GetWithArray2<ProductionObject, ['author', 'location', 'city']>, string | undefined>>,
  Expect<Equal<GetWithArray2<ProductionObject, ['author', 'card', 'number']>, undefined>>,
]

type cases3 = [
  Expect<Equal<Get2<ProductionObject, 'title'>, string>>,
  Expect<Equal<Get2<ProductionObject, 'date'>, string>>,
  Expect<Equal<Get2<ProductionObject, 'description'>, string | undefined>>,
  Expect<Equal<Get2<ProductionObject, 'author.name'>, string | undefined>>,
  Expect<Equal<Get2<ProductionObject, 'author.location.city'>, string | undefined>>,
  Expect<Equal<Get2<ProductionObject, 'author.card.number'>, undefined>>,
]

// Support Arrays and Tupples

type _GetWithArray3<A, K> = K extends []
  ? A
  : K extends [infer Key, ...infer Rest]
    ? Key extends keyof A 
      ? _GetWithArray3<A[Key], Rest>
      : A extends readonly (infer T)[] 
        ? _GetWithArray3<T | undefined, Rest>
        : never
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
      Expect<Equal<_GetWithArray3<TestObject, ['0']>, `Scrollbar customisation`>>,
      Expect<Equal<_GetWithArray3<TestObject, ['1']>, `2018-10-04`>>,
      Expect<Equal<_GetWithArray3<TestObject, ['2', '0']>, string>>,
      Expect<Equal<_GetWithArray3<TestObject, ['2', '1', '0']>, string | number | undefined>>,
      Expect<Equal<_GetWithArray3<TestObject, ['2', '2', '2']>, number | undefined>>,
      Expect<Equal<_GetWithArray3<TestObject, ['3']>, undefined>>,
    ]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/270/answer
  > View solutions: https://tsch.js.org/270/solutions
  > More Challenges: https://tsch.js.org
*/
