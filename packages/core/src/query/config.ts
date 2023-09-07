import { QueryClient } from '@tanstack/react-query';
import { appRouter } from '../router/createRouter';

import { createQueryProxyClient } from './createQueryProxyClient';

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

const BASE_API_URL = 'http://localhost:5000/api/v1';

/**
 * api - module - name -
 * api.user.userList
 */
export const api = createQueryProxyClient({
	router: appRouter,
	queryClient: queryConfig.client,
	options: {
		baseUrl: BASE_API_URL,
	},
});
