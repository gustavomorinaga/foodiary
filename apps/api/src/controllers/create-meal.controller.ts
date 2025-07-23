import crypto from 'node:crypto';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import z from 'zod';
import { s3Client } from '$/clients/s3.client';
import { db } from '$/db/connection';
import { schema } from '$/db/schema';
import { env } from '$/env';
import type { HttpResponse, ProtectedHttpRequest } from '$/types/http.type';
import { badRequest, ok } from '$/utils/http.util';

const createMealSchema = z.object({
	fileType: z.enum(['audio/m4a', 'image/jpeg']),
});

export class CreateMealController {
	static async handle({
		userID,
		body,
	}: ProtectedHttpRequest): Promise<HttpResponse> {
		const { success, error, data } = createMealSchema.safeParse(body);

		if (!success) {
			return badRequest({ errors: error.issues });
		}

		const fileID = crypto.randomUUID();
		const extension = data.fileType === 'audio/m4a' ? 'm4a' : 'jpeg';
		const fileKey = `${fileID}.${extension}`;

		const command = new PutObjectCommand({
			Bucket: env.BUCKET_NAME,
			Key: fileKey,
		});
		const presignedURL = await getSignedUrl(s3Client, command, {
			expiresIn: 600,
		});

		const [meal] = await db
			.insert(schema.meals)
			.values({
				userID,
				inputFileKey: fileKey,
				inputType: data.fileType === 'audio/m4a' ? 'audio' : 'picture',
				status: 'uploading',
				icon: '',
				name: '',
				foods: [],
			})
			.returning({ id: schema.users.id });

		return ok({ mealID: meal.id, uploadURL: presignedURL });
	}
}
