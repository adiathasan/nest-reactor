import { QueryClient } from "@tanstack/react-query";

import { AppRouter, appRouter } from "../router/createRouter";
import { createQueryProxyClient } from "./createQueryProxyClient";

export const queryConfig = {
  client: new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 3,
      },
    },
  }),
};

/**
 * api - module - name -
 * api.user.userList
 */
export const api = createQueryProxyClient<AppRouter>({
  // router: appRouter,
  queryClient: queryConfig.client,
});
