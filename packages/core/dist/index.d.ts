declare const add: (a: number, b: number) => number;
declare const subtract: (a: number, b: number) => number;
interface IAppConfig {
    port: number;
}
declare class Post {
    title: string;
}

export { IAppConfig, Post, add, subtract };
