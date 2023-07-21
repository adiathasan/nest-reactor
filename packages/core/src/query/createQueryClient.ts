import { AppRouter } from "../router/createRouter";

export interface CreateQueryClientOptions {}

export const createQueryClient = <
  TRouter extends { [K in keyof TRouter]: TRouter[K] }
>(
  _options?: CreateQueryClientOptions
): {
  [KModule in keyof TRouter]: {
    [KRoute in keyof TRouter[KModule]]: TRouter[KModule][KRoute] extends Partial<{
      method: "GET";
    }>
      ? {
          useQuery: (props: { name: string }) => void;
        }
      : {
          useMutation: () => void;
        };
  };
} => {
  return new Proxy(() => {}, {
    get: (_target, _key) => {
      return new Proxy(
        {},
        {
          get: (target, key) => {
            return {
              useQuery: ({ name }: { name: string }) => {
                console.log("useQuery", { target, key, _target, _key, name });
              },
              useMutation: () => {
                console.log("useMutation", { target, key, _target, _key });
              },
            };
          },
        }
      );
    },
  }) as unknown as any;
};

/**
 * api - module - name -
 * api.user.userList
 */
export const api = createQueryClient<AppRouter>();
