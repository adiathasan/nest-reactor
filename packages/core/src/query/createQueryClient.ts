import { AppRouter } from "../router/createRouter";
import { UseQueryResult } from "@tanstack/react-query";
import { ApiError } from "../http/http-client";
import { AxiosResponse } from "axios";
import { Pagination } from "../commons/pagination";

export interface CreateQueryClientOptions {}

const noop = () => {};

export type CreateQueryClientReturn<
  TRouter extends { [K in keyof TRouter]: TRouter[K] }
> = {
  [KModule in keyof TRouter]: {
    [KRoute in keyof TRouter[KModule]]: TRouter[KModule][KRoute] extends Partial<{
      method: infer TMethod extends "GET";
      dto: infer TDto; // at first, don't shallow the dto
      returnedSchema: infer TReturnedSchema extends abstract new (
        ...args: any
      ) => any;
    }>
      ? // now narrow down the type of dto
        TDto extends abstract new (...args: any) => any
        ? {
            useQuery: (
              props?: UseQueryProps<InstanceType<TDto>>
            ) => UseQueryResult<
              AxiosResponse<{
                result: {
                  data: InstanceType<TReturnedSchema>[];
                  pagination: Pagination;
                };
              }>,
              ApiError
            >;
          }
        : {
            useQuery: () => void;
          }
      : {
          useMutation: () => void;
        };
  };
};

export type UseQueryProps<TQuery> = {
  query?: TQuery;
};

export const createQueryClient = <
  TRouter extends { [K in keyof TRouter]: TRouter[K] }
>(
  _options?: CreateQueryClientOptions
) => {
  return new Proxy(noop, {
    get: (_target, _key) => {
      return new Proxy(noop, {
        get: (_target, key) => {
          return {
            useQuery: <T>(props?: UseQueryProps<T>) => {
              console.log("useQuery", { key, _target, _key });
            },
            useMutation: () => {
              console.log("useMutation", { key, _target, _key });
            },
          };
        },
      });
    },
  }) as unknown as CreateQueryClientReturn<TRouter>;
};

/**
 * api - module - name -
 * api.user.userList
 */
export const api = createQueryClient<AppRouter>();
