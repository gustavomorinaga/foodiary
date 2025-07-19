import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { validateAccessToken } from '../lib/jwt.lib';
import type { ProtectedHttpRequest } from '../types/http.type';
import { parseEvent } from './parse-event.util';

export function parseProtectedEvent(
	event: APIGatewayProxyEventV2
): ProtectedHttpRequest {
	const baseEvent = parseEvent(event);
	const { authorization } = event.headers;

	if (!authorization) {
		throw new Error('Access token not provided.');
	}

	const [, token] = authorization.split(' ');

	const userID = validateAccessToken(token);

	if (!userID) {
		throw new Error('Invalid access token.');
	}

	return { ...baseEvent, userID };
}
