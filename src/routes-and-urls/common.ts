export interface Endpoint<Request, Response> {
  request: Request;
  response: Response;
}

export type GetEndpoint<Response> = Endpoint<null, Response>;

export type User = { type: "user" };
export type UsersResponse = { users: User[] };
export type CreateUserRequest = { name: string };
export type UpdateUser = { name?: string };

// See https://github.com/danvk/crosswalk
export interface API {
  "/users": {
    get: GetEndpoint<UsersResponse>;
    post: Endpoint<CreateUserRequest, User>;
  };
  "/users/:userId": {
    get: GetEndpoint<User>;
    put: Endpoint<UpdateUser, User>;
  };

  "/users/:userId/:child": {
    get: GetEndpoint<User>;
    put: Endpoint<UpdateUser, User>;
  };
}
