// https://effectivetypescript.com/2020/12/04/gentips-1-curry/
import type { Equal, Expect, NotAny } from '@type-challenges/utils'
import type { API} from './common';

// interface Endpoint<Request, Response> {
//   request: Request;
//   response: Response;
// }

// type GetEndpoint<Response> = Endpoint<null, Response>;

// type User = { type: "user" };
// type UsersResponse = { users: User[] };
// type CreateUserRequest = { name: string };
// type UpdateUser = { name?: string };

// // See https://github.com/danvk/crosswalk
// interface API {
//   "/users": {
//     get: GetEndpoint<UsersResponse>;
//     post: Endpoint<CreateUserRequest, User>;
//   };
//   "/users/:userId": {
//     get: GetEndpoint<User>;
//     put: Endpoint<UpdateUser, User>;
//   };

//   "/users/:userId/:child": {
//     get: GetEndpoint<User>;
//     put: Endpoint<UpdateUser, User>;
//   };
// }

export type ExtractRouteParams<T> = string extends T
  ? Record<string, string>
  : T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? {[K in Param | keyof ExtractRouteParams<Rest>]: string } 
  : T extends `${infer _Start}:${infer Param}`
  ? { [k in Param]: string }
  : {}
;

type cases = [
  // ExtractRouteParams
  Expect<Equal<ExtractRouteParams<'/foo/bar/baz'>, {}>>,
  Expect<Equal<ExtractRouteParams<'/foo/:p1'>, {p1: string}>>,
  Expect<Equal<ExtractRouteParams<'/foo/:p1/:p2/bar/:p3'>, {p1: string; p2: string; p3: string}>>
]

declare function getUrl1<API, Path extends keyof API>(
  path: Path,
  params: ExtractRouteParams<Path>,
): string;

// @ts-expect-error
getUrl1<API>("/users/:userId", { userId: "bob" });


declare class UrlMaker<API> {
  getUrl<Path extends keyof API>(path: Path, params: ExtractRouteParams<Path>): string; 
}

const urlMaker = new UrlMaker<API>();
urlMaker.getUrl("/users/:userId", { userId: "bob" });

// @ts-expect-error
urlMaker.getUrl('/users/:userId/profile', {userId: 'bob'});


declare function getUrl2<API>(): (<Path extends keyof API>(path: Path, params: ExtractRouteParams<Path>) => string);

getUrl2<API>()("/users/:userId", { userId: "bob" });
// @ts-expect-error
getUrl2<API>()('/users/:userId/profile', {userId: 'bob'});
