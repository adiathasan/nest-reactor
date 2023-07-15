import { QueryClient } from "@tanstack/react-query";

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
