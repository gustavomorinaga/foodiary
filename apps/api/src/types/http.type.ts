/** biome-ignore-all lint/suspicious/noExplicitAny: This is a utility file where `any` is acceptable. */

export type HttpRequest = {
	body: Record<string, any>;
	queryParams: Record<string, any>;
	params: Record<string, any>;
};

export type ProtectedHttpRequest = HttpRequest & { userID: string };

export type HttpResponse = {
	statusCode: number;
	body?: Record<string, any>;
};
