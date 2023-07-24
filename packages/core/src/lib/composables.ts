export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type IRoute = {
  method: Method;
  dto?: new () => any;
  returnedSchema?: new () => any;
};

export type Routes<T extends { [x: string]: IRoute }> = {
  [K in keyof T]: T[K];
};

export const createRouter = <T extends { [x: string]: IRoute }>(
  routes: Routes<T>
) => {
  return routes;
};

export const composeRoutes = <T extends object>(routes: {
  [K in keyof T]: T[K];
}) => {
  return routes;
};
