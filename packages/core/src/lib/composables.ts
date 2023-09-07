export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type IRoute = {
	method: Method;
	dto?: new () => any;
	mappedId?: ':id';
	returnedSchema?: new () => any;
	query?: new () => any;
	path?: string;
};

export type Routes<T extends { [x: string]: IRoute }> = {
	[K in keyof T]: T[K];
};

export const createRouter = <T extends { [x: string]: IRoute }>(routes: Routes<T>) => {
	return routes;
};

export const composeRoutes = <T extends { [x: string]: { [x: string]: IRoute } }>(routes: {
	[K in keyof T]: T[K];
}) => {
	return routes;
};
