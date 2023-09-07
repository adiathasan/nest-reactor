import { httpClient, HttpOptions } from './http-client';

export class HttpClientWithBaseUrl {
	constructor(private baseUrl: string) {}

	HttpRequest<T>(options?: HttpOptions) {
		return httpClient<T>({
			baseUrl: this.baseUrl,
			...options,
		});
	}
}
