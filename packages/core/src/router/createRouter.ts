import { CreateUserDto } from "../module/user/dto/create-user.dto";
import { Pagination } from "../commons/pagination";
import { User } from "server-monolith/dist/apps/server-monolith/src/user/model/user.model";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type IRoute = {
  method: Method;
  dto?: new () => any;
  returnedSchema?: new () => any;
};

export type Routes<T extends { [x: string]: IRoute }> = {
  [K in keyof T]: T[K];
};

export const createRouter = <T extends { [x: string]: IRoute }>(
  routes: Routes<T>
) => {
  return routes;
};

const composeRoutes = <T extends object>(routes: { [K in keyof T]: T[K] }) => {
  return routes;
};

/**
 * Example:
 * 1. Create a router
 * 2. Compose routers
 */

export class Base {
  name: string;
  age: number;
}

class UserQuery extends Pagination {
  name?: string;
  age?: number;
}

const userRouter = createRouter({
  list: {
    method: "GET",
    dto: UserQuery,
    returnedSchema: User,
  },
  create: {
    method: "POST",
    dto: Base,
  },
});

const postRouter = createRouter({
  list: {
    method: "GET",
  },
  create: {
    method: "POST",
    dto: CreateUserDto,
  },
});

const router = composeRoutes({
  user: userRouter,
  post: postRouter,
});

export type AppRouter = typeof router;

export type ModuleRoutePath = keyof AppRouter;

export type ApiPath = keyof AppRouter[ModuleRoutePath];

// router.user.userList;
// router.user.createUser;
