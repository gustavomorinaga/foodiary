import { eq } from 'drizzle-orm';
import { db } from '../db/connection';
import { schema } from '../db/schema';
import type { HttpResponse, ProtectedHttpRequest } from '../types/http.type';
import { ok } from '../utils/http.util';

export class MeController {
	static async handle({ userID }: ProtectedHttpRequest): Promise<HttpResponse> {
		const user = await db.query.users.findFirst({
			columns: {
				id: true,
				name: true,
				email: true,
				calories: true,
				proteins: true,
				carbohydrates: true,
				fats: true,
			},
			where: eq(schema.users.id, userID),
		});

		return ok({ user });
	}
}
