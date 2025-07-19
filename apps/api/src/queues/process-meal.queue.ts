import { eq } from 'drizzle-orm';
import { db } from '../db/connection';
import { schema } from '../db/schema';

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

		// call AI...

		try {
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
