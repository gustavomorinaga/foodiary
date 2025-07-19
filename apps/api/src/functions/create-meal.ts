import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { CreateMealController } from '../controllers/create-meal.controller';
import { unauthorized } from '../utils/http.util';
import { parseProtectedEvent } from '../utils/parse-protected-event.util';
import { parseResponse } from '../utils/parse-response.util';

export async function handler(event: APIGatewayProxyEventV2) {
	try {
		const request = parseProtectedEvent(event);
		const response = await CreateMealController.handle(request);
		return parseResponse(response);
	} catch {
		return parseResponse(unauthorized({ error: 'Invalid access token.' }));
	}
}
