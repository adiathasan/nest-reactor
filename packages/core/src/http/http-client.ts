import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

import { Pagination } from '../commons/pagination';
import { getLocalStorage } from '../storage/localStorage';
import { LocalStorageKeys } from '../storage/LocalStorageKeys';

export type Auth = {
	token?: {
		accessToken?: string;
		expiry?: number;
	};
};

export interface Filter {
	[key: string]: any;
}

export type ApiError = AxiosError<{
	statusCode?: number;
	message?: any;
	error?: string;
}>;

export interface HttpOptions {
	module?: {
		name: string;
		path?: string;
	};
	method?: Method;
	path?: string;
	pathParams?: Record<string, string>;
	axiosConfig?: AxiosRequestConfig;
	pagination?: Pagination;
	query?: Filter;
	requiredAuth?: boolean;
	baseUrl?: string;
}

const mapPathParams = (path: string, pathParams?: Record<string, string>) => {
	if (!pathParams) {
		return path;
	}

	return Object.keys(pathParams).reduce((acc, key) => {
		if (pathParams[key] !== undefined) {
			return acc.replace(`:${key}`, pathParams[key]!);
		}

		return acc;
	}, path);
};

export const httpClient = async <T>(options?: HttpOptions) => {
	const { module, method, path } = options ?? {};

	let url = '';

	if (options?.baseUrl) {
		url = options.baseUrl;
	}

	if (module) {
		url = url + `/${module.name}`;
	}

	if (module?.path) {
		url = url + `/${module.path}`;
	}

	if (path) {
		url = url + `${path}`;
	}

	if (options && options.pathParams) {
		url = mapPathParams(url, options.pathParams);
	}

	let params = {};

	if (options && options.pagination) {
		params = {
			...options.pagination,
		};
	}

	if (options && options.query) {
		params = {
			...params,
			...options.query,
		};
	}

	const headers: { [k: string]: string } = {
		'Content-Type': 'application/json',
	};

	if (options?.requiredAuth) {
		const token = getLocalStorage<Auth['token']>(LocalStorageKeys.Token);

		if (!token?.accessToken) {
			throw new Error('Token not found in local storage but :requiredAuth is true');
		}

		headers['Authorization'] = `Bearer ${token.accessToken}`;
	}

	return axios<T>({
		url,
		method,
		...options?.axiosConfig,
		params: {
			...params,
			...options?.axiosConfig?.params,
		},
		headers,
	});
};

/**
 * stack bar chart
 * water fall chart
 */
