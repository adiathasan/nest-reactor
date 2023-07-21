import { CreateUserDto } from "../module/user/dto/create-user.dto";

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

const composeRoutes = <T extends object>(routes: { [K in keyof T]: T[K] }) => {
  return routes;
};

/**
 * Example:
 * 1. Create a router
 * 2. Compose routers
 */

export class Base {}

const userRouter = createRouter({
  list: {
    method: "GET",
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

// router.user.userList;
// router.user.createUser;
