// https://effectivetypescript.com/2020/12/09/gentips-2-intersect/

import type { Equal, Expect, NotAny } from "@type-challenges/utils";
import * as express from "express";
import type { API, UsersResponse, User } from "./common";
import type { ExtractRouteParams } from "./extract-route-params";

type LooseKey<T, K> = T[K & keyof T];
type LooseKey2<T, K1, K2> = LooseKey<LooseKey<T, K1>, K2>;

type LooseKeyV<T, K extends unknown[]> = K extends [infer S]
  ? LooseKey<T, S>
  : K extends [infer S, ...(infer Rest)]
  ? LooseKeyV<LooseKey<T, S>, Rest>
  : never;

type cases1 = [
  Expect<Equal<LooseKey2<API["/users"], "get", "response">, UsersResponse>>,
  Expect<Equal<LooseKeyV<API, ["/users", "get", "response"]>, UsersResponse>>,
];

class TypedRouter<API> {
  constructor(private router: express.Router) {}

  get<Path extends keyof API & string>(
    path: Path,
    handler: (
      params: ExtractRouteParams<Path>,
    ) => Promise<LooseKey2<API[Path], "get", "response">>,
  ) {
    this.router.get(path, (request, response) => {
      handler(request.params as any).then((obj) => response.json(obj));
    });
  }
}

declare let app: express.Router;
declare function getUserById(userId: string): Promise<User>;

const typedRouter = new TypedRouter<API>(app);
typedRouter.get("/users/:userId", async (params) => getUserById(params.userId));


type GetResponse<API, Path extends keyof API & string> = 
  LooseKeyV<API, [Path, 'get', 'response']>;

class TypedRouter2<API> {
  constructor(private router: express.Router) {}

  get<Path extends keyof API & string>(
    path: Path,
  ) {
    type Params = ExtractRouteParams<Path>;
    type Response = LooseKeyV<API, [Path, 'get', 'response']>;

    return (
      handler: (
        params: Params,
        request: express.Request<Params, Response>,
        response: express.Response<Response>
      ) => Promise<Response>,
    ) => {
      this.router.get(path, (request, response) => {
        handler(request.params as any, request as any, response).then((obj) => response.json(obj));
      });
    }
  }
}

const typedRouter2 = new TypedRouter2<API>(app);
typedRouter2.get("/users/:userId")(async (params) => getUserById(params.userId));


type Caps<T> = {
  [K in keyof T as Capitalize<K & string>]: T[K]
}

type Caps2<T extends {}> = {
  [K in keyof T as K extends string ? Capitalize<K>: K]: T[K]
}

type Caps3<T extends {[key: string]: any; [key: number]: never}> = {
  [K in keyof T as Capitalize<K & string>]: T[K]
}


declare const symbol: unique symbol;


type cases2 = [
  Expect<Equal<Caps<{name: string, 1: number}>, {Name: string}>>,
  Expect<
    Equal<
      Caps2<{name: string, 1: number, [symbol]: boolean}>, 
      {Name: string, 1: number, [symbol]: boolean}
    >
  >,
  // @ts-expect-error
  Expect<Equal<Caps3<{name: string, 1: number}>, {Name: string}>>,
  Expect<Equal<Caps3<{name: string}>, {Name: string}>>,
]