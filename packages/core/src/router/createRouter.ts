import { CreateUserDto } from "../module/user/dto/create-user.dto";

export class Base {}

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RouteObj = { method: Method; dto?: new () => any };

export type Routes<T extends { [x: string]: RouteObj }> = {
  [K in keyof T]: T[K];
};

export const createRouter = <T extends { [x: string]: RouteObj }>(
  routes: Routes<T>
) => {
  return routes;
};

const userRouter = createRouter({
  userList: {
    method: "GET",
  },
  createUser: {
    method: "POST",
    dto: Base,
  },
});

const postRouter = createRouter({
  postList: {
    method: "GET",
  },
  createPost: {
    method: "POST",
    dto: CreateUserDto,
  },
});

const composeRoutes = <T>(routes: { [k in keyof T]: T[k] }) => {
  return routes;
};

const routes = composeRoutes({
  user: userRouter,
  post: postRouter,
});

// routes.user.userList;
// routes.user.createUser;
