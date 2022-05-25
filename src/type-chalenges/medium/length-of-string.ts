import type { Equal, Expect } from '@type-challenges/utils'
/*
  298 - Length of String
  -------
  by Pig Fang (@g-plane) #medium #template-literal
  
  ### Question
  
  Compute the length of a string literal, which behaves like `String#length`.
  
  > View on GitHub: https://tsch.js.org/298
*/


/* _____________ Your Code Here _____________ */

type Foo<T extends string> = T extends `${infer _}${infer Tail}`
  ? [any, ...Foo<Tail>]
  : []
; 
type LengthOfString<S extends string> = S extends "" 
  ? 0
  : Foo<S>["length"]
    


/* _____________ Test Cases _____________ */
type s1 = 'adfsdfasdfasdfasdfsdfsadfasdfasdfdferefjlskdfjl'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
  Expect<Equal<LengthOfString<s1>, 47>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/298/answer
  > View solutions: https://tsch.js.org/298/solutions
  > More Challenges: https://tsch.js.org
*/

