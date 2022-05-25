import type { Equal, Expect } from "@type-challenges/utils";
/*
  9 - Deep Readonly
  -------
  by Anthony Fu (@antfu) #medium #readonly #object-keys #deep
  
  ### Question
  
  Implement a generic `DeepReadonly<T>` which make every parameter of an object - and its sub-objects recursively - readonly.
  
  You can assume that we are only dealing with Objects in this challenge. Arrays, Functions, Classes and so on are no need to take into consideration. However, you can still challenge your self by covering different cases as many as possible.
  
  For example
  
  ```ts
  type X = { 
    x: { 
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }
  
  type Expected = { 
    readonly x: { 
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey' 
  }
  
  type Todo = DeepReadonly<X> // should be same as `Expected`
  ```
  
  > View on GitHub: https://tsch.js.org/9
*/

/* _____________ Your Code Here _____________ */

type DeepReadonly<T> = {
  readonly [Key in keyof T]: T[Key] extends Record<PropertyKey, unknown>
    ? DeepReadonly<T[Key]>
    : T[Key];
};

// type t1 = DeepReadonly<X>;
/* _____________ Test Cases _____________ */

type cases = [
  //
  Expect<Equal<DeepReadonly<t1>, t1Expected>>,
  // Expect<Equal<DeepReadonly<t2>, t2Expected>>,
];

type t1 = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: { k: "hello" };
    };
  };
};
type t1Expected = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: { readonly k: "hello" };
    };
  };
};

type t2 = {
  c: {
    k: boolean;
    e: [
      "hi",
      {
        m: ["hey"];
      },
    ];
  };
};

type t2Expected = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "string";
        };
        readonly k: "hello";
      };
      readonly l: readonly [
        "hi",
        {
          readonly m: readonly ["hey"];
        },
      ];
    };
  };
};

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9/answer
  > View solutions: https://tsch.js.org/9/solutions
  > More Challenges: https://tsch.js.org
*/
