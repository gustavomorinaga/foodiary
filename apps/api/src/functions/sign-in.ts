import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { SignInController } from '$/controllers/sign-in.controller';
import { parseEvent } from '$/utils/parse-event.util';
import { parseResponse } from '$/utils/parse-response.util';

export async function handler(event: APIGatewayProxyEventV2) {
	const request = parseEvent(event);
	const response = await SignInController.handle(request);
	return parseResponse(response);
}
