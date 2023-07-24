import { QueryClient } from "@tanstack/react-query";

import { appRouter } from "../router/createRouter";
import { createQueryClient } from "./createQueryClient";

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
export const api = createQueryClient({
  router: appRouter,
  queryClient: queryConfig.client,
});
