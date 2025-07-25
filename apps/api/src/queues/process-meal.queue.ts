import { Readable } from 'node:stream';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { eq } from 'drizzle-orm';
import { s3Client } from '$/clients/s3.client';
import { db } from '$/db/connection';
import { schema } from '$/db/schema';
import { env } from '$/env';
import {
	getMealDetailsFromImage,
	getMealDetailsFromText,
	transcribeAudio,
} from '$/services/ai.service';

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
			let name = '';
			let icon = '';
			let foods: object[] = [];

			if (meal.inputType === 'audio') {
				const audioFileBuffer = await ProcessMeal.downloadAudioFile(
					meal.inputFileKey
				);
				const transcription = await transcribeAudio(audioFileBuffer);

				const mealDetails = await getMealDetailsFromText({
					text: transcription,
					createdAt: meal.createdAt,
				});

				name = mealDetails.name;
				icon = mealDetails.icon;
				foods = mealDetails.foods;
			}

			if (meal.inputType === 'picture') {
				const imageURL = await ProcessMeal.getImageURL(meal.inputFileKey);

				const mealDetails = await getMealDetailsFromImage({
					imageURL,
					createdAt: meal.createdAt,
				});

				name = mealDetails.name;
				icon = mealDetails.icon;
				foods = mealDetails.foods;
			}

			await db
				.update(schema.meals)
				.set({ status: 'success', name, icon, foods })
				.where(eq(schema.meals.id, meal.id));
		} catch {
			await db
				.update(schema.meals)
				.set({ status: 'failed' })
				.where(eq(schema.meals.id, meal.id));
		}
	}

	private static async downloadAudioFile(
		fileKey: string
	): Promise<Buffer<ArrayBuffer>> {
		const command = new GetObjectCommand({
			Bucket: env.BUCKET_NAME,
			Key: fileKey,
		});

		const { Body } = await s3Client.send(command);

		if (!(Body && Body instanceof Readable)) {
			throw new Error('Cannot load the audio file.');
		}

		const chunks: Buffer[] = [];
		for await (const chunk of Body) {
			chunks.push(chunk);
		}

		return Buffer.concat(chunks);
	}

	private static getImageURL(fileKey: string): Promise<string> {
		const command = new GetObjectCommand({
			Bucket: env.BUCKET_NAME,
			Key: fileKey,
		});

		return getSignedUrl(s3Client, command, { expiresIn: 600 });
	}
}
