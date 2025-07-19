import { eq } from 'drizzle-orm';
import z from 'zod';
import { db } from '../db/connection';
import { schema } from '../db/schema';
import type { HttpRequest, HttpResponse } from '../types/http';
import { badRequest, conflict, created } from '../utils/http.util';

const signInSchema = z.object({
	goal: z.enum(['lose', 'maintain', 'gain']),
	gender: z.enum(['male', 'female']),
	birthDate: z.iso.date(),
	height: z.number(),
	weight: z.number(),
	activityLevel: z.number().min(1).max(5),
	account: z.object({
		name: z.string().min(1),
		email: z.email(),
		password: z.string().min(8),
	}),
});

export class SignUpController {
	static async handle({ body }: HttpRequest): Promise<HttpResponse> {
		const { success, error, data } = signInSchema.safeParse(body);

		if (!success) return badRequest({ errors: error.issues });

		const userAlreadyExists = await db.query.users.findFirst({
			columns: { email: true },
			where: eq(schema.users.email, data.account.email),
		});

		if (userAlreadyExists) {
			return conflict({ error: 'This email is already in use.' });
		}

		const { account, ...rest } = data;

		const [user] = await db
			.insert(schema.users)
			.values({
				...rest,
				...account,
				calories: 0,
				proteins: 0,
				carbohydrates: 0,
				fats: 0,
			})
			.returning({ id: schema.users.id });

		return created({ userID: user.id });
	}
}
