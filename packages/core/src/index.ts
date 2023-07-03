import { IsDefined } from 'class-validator';

export const add = (a: number, b: number) => a + b;
export const subtract = (a: number, b: number) => a - b;

export interface IAppConfig {
	port: number;
}

export class Post {
	@IsDefined()
	title: string;

	@IsDefined()
	content: string;
}
