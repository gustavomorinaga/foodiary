import { HttpResponse } from '../types/http';

export function parseResponse({ statusCode, body }: HttpResponse) {
	return {
		statusCode: statusCode,
		body: body ? JSON.stringify(body) : undefined,
	};
}
