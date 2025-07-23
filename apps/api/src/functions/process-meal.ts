import type { SQSEvent } from 'aws-lambda';
import { ProcessMeal } from '$/queues/process-meal.queue';

export async function handler(event: SQSEvent) {
	await Promise.all(
		event.Records.map(record => {
			const body = JSON.parse(record.body);
			return ProcessMeal.process(body);
		})
	);
}
