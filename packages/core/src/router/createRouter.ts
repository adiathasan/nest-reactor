import { composeRoutes } from "../lib/composables";
import { userRouter } from "../module/user/userRouter";

/**
 * Example:
 * 1. Create a router
 * 2. Compose routers
 */

export const appRouter = composeRoutes({
  user: userRouter,
});

export type AppRouter = typeof appRouter;

export type ModuleRoutePath = keyof AppRouter;

export type ApiPath = keyof AppRouter[ModuleRoutePath];

// router.user.userList;
// router.user.createUser;
