import type { HttpResponse } from '../types/http.type';

export function parseResponse({ statusCode, body }: HttpResponse) {
	return {
		statusCode,
		body: body ? JSON.stringify(body) : undefined,
	};
}
