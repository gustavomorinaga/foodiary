import { and, eq, gte, lte } from 'drizzle-orm';
import z from 'zod';
import { db } from '$/db/connection';
import { schema } from '$/db/schema';
import type { HttpResponse, ProtectedHttpRequest } from '$/types/http.type';
import { badRequest, ok } from '$/utils/http.util';

const listMealsSchema = z.object({
	date: z.iso.date().transform(dateString => new Date(dateString)),
});

export class ListMealsController {
	static async handle({
		userID,
		queryParams,
	}: ProtectedHttpRequest): Promise<HttpResponse> {
		const { success, error, data } = listMealsSchema.safeParse(queryParams);

		if (!success) {
			return badRequest({ errors: error.issues });
		}

		const endDate = new Date(data.date);
		endDate.setUTCHours(23, 59, 59, 999);

		const meals = await db.query.meals.findMany({
			columns: {
				id: true,
				icon: true,
				name: true,
				foods: true,
				createdAt: true,
			},
			where: and(
				eq(schema.meals.userID, userID),
				eq(schema.meals.status, 'success'),
				gte(schema.meals.createdAt, data.date),
				lte(schema.meals.createdAt, endDate)
			),
		});

		return ok({ meals });
	}
}
