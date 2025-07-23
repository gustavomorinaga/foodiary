import { SendMessageCommand } from '@aws-sdk/client-sqs';
import type { S3Event } from 'aws-lambda';
import { sqsClient } from '$/clients/sqs.client';
import { env } from '$/env';

export async function handler(event: S3Event) {
	await Promise.all(
		event.Records.map(record => {
			const command = new SendMessageCommand({
				QueueUrl: env.MEALS_QUEUE_URL,
				MessageBody: JSON.stringify({ fileKey: record.s3.object.key }),
			});

			return sqsClient.send(command);
		})
	);
}
