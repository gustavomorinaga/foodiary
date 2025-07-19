import z from 'zod';
import { db } from '../db/connection';
import { schema } from '../db/schema';
import type { HttpResponse, ProtectedHttpRequest } from '../types/http.type';
import { badRequest, ok } from '../utils/http.util';

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

		const [meal] = await db
			.insert(schema.meals)
			.values({
				userID,
				inputFileKey: 'input_file_key',
				inputType: data.fileType === 'audio/m4a' ? 'audio' : 'picture',
				status: 'uploading',
				icon: '',
				name: '',
				foods: [],
			})
			.returning({
				id: schema.users.id,
			});

		return ok({ mealID: meal.id });
	}
}
