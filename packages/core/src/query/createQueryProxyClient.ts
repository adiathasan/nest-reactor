import {
  QueryClient,
  QueryObserverOptions,
  QueryOptions,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ApiError, httpClient } from "../http/http-client";
import { ModuleRoutePath } from "../router/createRouter";

export interface CreateQueryClientOptions {}

const noop = () => {};

export type CreateQueryProxyClientReturn<
  TRouter extends { [K in keyof TRouter]: TRouter[K] }
> = {
  [KModule in keyof TRouter]: {
    [KRoute in keyof TRouter[KModule]]: TRouter[KModule][KRoute] extends Partial<{
      method: infer _TMethod extends "GET";
      dto: infer TDto extends abstract new (...args: any) => any;
      returnedSchema: infer TReturnedSchema extends abstract new (
        ...args: any
      ) => any;
    }>
      ? {
          useQuery: (
            props?: UseQueryProps<InstanceType<TDto>>
          ) => UseQueryResult<
            AxiosResponse<{
              result: InstanceType<TReturnedSchema>;
            }>,
            ApiError
          >;
        }
      : TRouter[KModule][KRoute] extends Partial<{
          method: infer _TMethod extends "GET";
          returnedSchema: infer TReturnedSchema extends abstract new (
            ...args: any
          ) => any;
        }>
      ? {
          useQuery: (props: {
            id?: string;
            options?: QueryOptions;
          }) => UseQueryResult<
            AxiosResponse<{
              result: InstanceType<TReturnedSchema>;
            }>,
            ApiError
          >;
        }
      : TRouter[KModule][KRoute] extends Partial<{
          method: infer _TMethod extends "POST" | "PUT" | "DELETE" | "PATCH";
          dto: infer TDto extends abstract new (...args: any) => any;
          returnedSchema: infer TReturnedSchema extends abstract new (
            ...args: any
          ) => any;
        }>
      ? {
          useMutation: (options?: UseMutationOptions) => UseMutationResult<
            AxiosResponse<{
              result: InstanceType<TReturnedSchema>;
            }>,
            ApiError,
            TRouter[KModule][KRoute]["method"] extends "DELETE"
              ? { id: string }
              : TRouter[KModule][KRoute]["method"] extends "POST"
              ? { data: InstanceType<TDto> }
              : {
                  id: string;
                  data: InstanceType<TDto>;
                }
          >;
        }
      : never;
  };
};

export type UseQueryProps<TQuery> = {
  query?: TQuery;
  options?: QueryObserverOptions;
  id?: string;
};

export const createQueryProxyClient = <
  TRouter extends { [K in keyof TRouter]: TRouter[K] }
>({}: {
  options?: CreateQueryClientOptions;
  queryClient: QueryClient;
}) => {
  return new Proxy(noop, {
    get: (_target, moduleName: ModuleRoutePath) => {
      return new Proxy(noop, {
        get: (_target, path: string) => {
          return {
            useQuery: ({ id, query, options }: UseQueryProps<{}> = {}) => {
              const queryKey =
                query || !id
                  ? [`${moduleName}-${path}`, query]
                  : [`${moduleName}-${id ?? "paused"}`];

              return useQuery({
                ...options,
                enabled:
                  typeof options?.enabled !== "undefined"
                    ? options.enabled
                    : true,
                queryKey,
                queryFn: () => {
                  return httpClient({
                    module: {
                      name: moduleName,
                      path: id ? `:id` : path,
                    },
                    method: "GET",
                    query,
                    pathParams: id
                      ? {
                          id,
                        }
                      : undefined,
                  });
                },
              });
            },
            useMutation: (options?: UseMutationOptions<any, any, any>) => {
              return useMutation({
                mutationFn: (props: { data: any; id: string }) => {
                  const { data, id } = props;

                  const method = !id ? "POST" : !data ? "DELETE" : "PUT";

                  return httpClient({
                    module: {
                      name: moduleName,
                      path: id ? `:id` : undefined,
                    },
                    method,
                    axiosConfig: {
                      data,
                    },
                    pathParams: id
                      ? {
                          id,
                        }
                      : undefined,
                  });
                },
                ...options,
              });
            },
          };
        },
      });
    },
  }) as unknown as CreateQueryProxyClientReturn<TRouter>;
};
