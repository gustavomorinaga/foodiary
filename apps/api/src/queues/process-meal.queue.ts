import { Readable } from 'node:stream';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { eq } from 'drizzle-orm';
import { s3Client } from '$/clients/s3.client';
import { db } from '$/db/connection';
import { schema } from '$/db/schema';
import { env } from '$/env';
import { transcribeAudio } from '$/services/ai.service';

export class ProcessMeal {
	static async process({ fileKey }: { fileKey: string }) {
		const meal = await db.query.meals.findFirst({
			where: eq(schema.meals.inputFileKey, fileKey),
		});

		if (!meal) {
			throw new Error('Meal not found.');
		}

		if (meal.status === 'failed' || meal.status === 'success') {
			return;
		}

		await db
			.update(schema.meals)
			.set({ status: 'processing' })
			.where(eq(schema.meals.id, meal.id));

		try {
			if (meal.inputType === 'audio') {
				const command = new GetObjectCommand({
					Bucket: env.BUCKET_NAME,
					Key: meal.inputFileKey,
				});

				const { Body } = await s3Client.send(command);

				if (!(Body && Body instanceof Readable)) {
					throw new Error('Cannot load the audio file.');
				}

				const chunks: Buffer[] = [];
				for await (const chunk of Body) {
					chunks.push(chunk);
				}

				const audioFileBuffer = Buffer.concat(chunks);

				const transcription = await transcribeAudio(audioFileBuffer);

				// biome-ignore lint/suspicious/noConsole: Debugging purpose
				console.log({ transcription });
			}

			await db
				.update(schema.meals)
				.set({ status: 'success' })
				.where(eq(schema.meals.id, meal.id));
		} catch {
			await db
				.update(schema.meals)
				.set({ status: 'failed' })
				.where(eq(schema.meals.id, meal.id));
		}
	}
}
