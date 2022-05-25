// https://github.com/type-challenges/type-challenges/blob/master/questions/2822-hard-split/README.md

import type { Equal, Expect, NotAny } from "@type-challenges/utils";

type Split<S extends string, Separator extends string> = 
  S extends `${infer Head}${Separator}${infer Tail}` 
    ? [Head, ...Split<Tail, Separator>]
    : S extends "" 
      ? Separator extends "" ? [] : [S] 
      : string extends S 
        ? S[] : [S]
;


type cases = [
  Expect<Equal<Split<'Hi! How are you?', 'z'>, ['Hi! How are you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ' '>, ['Hi!', 'How', 'are', 'you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ''>, ['H', 'i', '!', ' ', 'H', 'o', 'w', ' ', 'a', 'r', 'e', ' ', 'y', 'o', 'u', '?']>>,
  Expect<Equal<Split<'', ''>, []>>,
  Expect<Equal<Split<'', 'z'>, ['']>>,
  Expect<Equal<Split<string, 'whatever'>, string[]>>,
];
