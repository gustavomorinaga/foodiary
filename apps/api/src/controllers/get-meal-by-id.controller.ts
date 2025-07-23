import { and, eq } from 'drizzle-orm';
import z from 'zod';
import { db } from '$/db/connection';
import { schema } from '$/db/schema';
import type { HttpResponse, ProtectedHttpRequest } from '$/types/http.type';
import { badRequest, ok } from '$/utils/http.util';

const getMealByIDSchema = z.object({ mealID: z.uuid() });

export class GetMealByIDController {
	static async handle({
		userID,
		params,
	}: ProtectedHttpRequest): Promise<HttpResponse> {
		const { success, error, data } = getMealByIDSchema.safeParse(params);

		if (!success) {
			return badRequest({ errors: error.issues });
		}

		const meal = await db.query.meals.findFirst({
			columns: {
				id: true,
				foods: true,
				createdAt: true,
				icon: true,
				name: true,
				status: true,
			},
			where: and(
				eq(schema.meals.id, data.mealID),
				eq(schema.meals.userID, userID)
			),
		});

		return ok({ meal });
	}
}
