import {
	QueryClient,
	QueryObserverOptions,
	useMutation,
	UseMutationOptions,
	UseMutationResult,
	useQuery,
	UseQueryResult,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { IRoute } from '../lib/composables';
import { ApiError, HttpOptions } from '../http/http-client';
import { HttpClientWithBaseUrl } from '../http/http-client-with-base-url';

export interface CreateQueryClientOptions {
	baseUrl?: string;
}

const noop = () => {};

export type CreateQueryProxyClientReturn<TRouter extends { [K in keyof TRouter]: TRouter[K] }> = {
	[KModule in keyof TRouter]: {
		[KRoute in keyof TRouter[KModule]]: TRouter[KModule][KRoute] extends {
			method: infer _TMethod extends 'GET';
			query?: infer TDto extends abstract new (...args: any) => any;
			path?: infer _TPath;
			returnedSchema: infer TReturnedSchema extends abstract new (...args: any) => any;
		}
			? {
					useQuery: (props?: {
						options?: QueryObserverOptions;
						query?: InstanceType<TDto>;
						httpOptions?: HttpOptions;
					}) => UseQueryResult<
						AxiosResponse<{
							result: InstanceType<TReturnedSchema>;
						}>,
						ApiError
					>;
			  }
			: TRouter[KModule][KRoute] extends {
					method: infer _TMethod extends 'GET';
					query?: infer TDto extends abstract new (...args: any) => any;
					mappedId?: infer TMappedId extends string;
					path?: infer _TPath;
					returnedSchema: infer TReturnedSchema extends abstract new (...args: any) => any;
			  }
			? {
					useQuery: (props: {
						id: string;
						options?: QueryObserverOptions;
						httpOptions?: HttpOptions;
						query?: InstanceType<TDto>;
					}) => UseQueryResult<
						AxiosResponse<{
							result: InstanceType<TReturnedSchema>;
						}>,
						ApiError
					>;
			  }
			: TRouter[KModule][KRoute] extends Partial<{
					method: infer _TMethod extends 'POST' | 'PUT' | 'DELETE' | 'PATCH';
					dto: infer TDto extends abstract new (...args: any) => any;
					query?: infer TQuery extends abstract new (...args: any) => any;
					path?: infer _TPath;
					returnedSchema: infer TReturnedSchema extends abstract new (...args: any) => any;
			  }>
			? {
					useMutation: (props?: {
						httpOptions?: HttpOptions;
						options?: UseMutationOptions<
							AxiosResponse<{
								result: InstanceType<TReturnedSchema>;
							}>,
							ApiError,
							TRouter[KModule][KRoute]['method'] extends 'DELETE'
								? { id: string }
								: TRouter[KModule][KRoute]['method'] extends 'POST'
								? { data: InstanceType<TDto> }
								: {
										id: string;
										data: InstanceType<TDto>;
								  }
						>;
						query?: InstanceType<TQuery>;
					}) => UseMutationResult<
						AxiosResponse<{
							result: InstanceType<TReturnedSchema>;
						}>,
						ApiError,
						TRouter[KModule][KRoute]['method'] extends 'DELETE'
							? { id: string }
							: TRouter[KModule][KRoute]['method'] extends 'POST'
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
	httpOptions?: Omit<HttpOptions, 'pathParams'>;
	id?: string;
};

export type UseMutationProps<TQuery, TData, TVar> = {
	query?: TQuery;
	options?: UseMutationOptions<TData, ApiError, TVar>;
	httpOptions?: Omit<HttpOptions, 'pathParams'>;
};

export const createQueryProxyClient = <
	TRouter extends {
		[k: string]: {
			[x: string]: IRoute;
		};
	}
>(proxyClientProps: {
	options: CreateQueryClientOptions;
	queryClient: QueryClient;
	router: TRouter;
}) => {
	const httpClient = new HttpClientWithBaseUrl(proxyClientProps.options?.baseUrl);

	return new Proxy(noop, {
		get: (_target, moduleName: string) => {
			return new Proxy(noop, {
				get: (_target, path: string) => {
					return {
						useQuery: ({ id, query, options, httpOptions }: UseQueryProps<{}> = {}) => {
							const queryKey = query || !id ? [`${moduleName}-${path}`, query] : [`${moduleName}-${id ?? 'paused-⏸'}`];

							const pathFromConfig: string | undefined = proxyClientProps.router[moduleName][path].path;

							const isMappedId: boolean = !!proxyClientProps.router[moduleName][path].mappedId;

							let isEnable: boolean = true;

							if (isMappedId) {
								if (!id) {
									isEnable = false;
								}
							}

							if (typeof options?.enabled !== 'undefined') {
								isEnable = options.enabled;
							}

							let _module: HttpOptions['module'] = {
								name: moduleName,
								path: id ? `:id` : undefined,
							};

							if (pathFromConfig) {
								_module = undefined;
							}

							return useQuery({
								...options,
								enabled: isEnable,
								queryKey,
								queryFn: () => {
									return httpClient.HttpRequest({
										pathParams: id
											? {
													id,
											  }
											: undefined,
										...httpOptions,
										method: 'GET',
										module: _module,
										path: pathFromConfig,
										query,
									});
								},
							});
						},
						useMutation: ({ query, options, httpOptions }: UseMutationProps<any, any, any> = {}) => {
							return useMutation({
								mutationFn: (props: { data: any; id: string }) => {
									const { data, id } = props;

									const pathFromConfig: string | undefined = proxyClientProps.router[moduleName][path].path;

									let _module: HttpOptions['module'] = {
										name: moduleName,
										path: id ? `:id` : undefined,
									};

									if (pathFromConfig) {
										_module = undefined;
									}

									return httpClient.HttpRequest({
										pathParams: id
											? {
													id,
											  }
											: undefined,
										...httpOptions,
										module: _module,
										path: pathFromConfig,
										method: proxyClientProps.router[moduleName][path].method,
										query,
										axiosConfig: {
											...httpOptions?.axiosConfig,
											data,
										},
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
