import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { GetMealByIDController } from '../controllers/get-meal-by-id.controller';
import { unauthorized } from '../utils/http.util';
import { parseProtectedEvent } from '../utils/parse-protected-event.util';
import { parseResponse } from '../utils/parse-response.util';

export async function handler(event: APIGatewayProxyEventV2) {
	try {
		const request = parseProtectedEvent(event);
		const response = await GetMealByIDController.handle(request);
		return parseResponse(response);
	} catch {
		return parseResponse(unauthorized({ error: 'Invalid access token.' }));
	}
}
