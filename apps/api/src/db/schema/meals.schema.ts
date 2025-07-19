import {
	json,
	pgEnum,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { usersTable as users } from './users.schema';

export const mealStatus = pgEnum('meal_status', [
	'uploading',
	'processing',
	'success',
	'failed',
]);

export const mealInputType = pgEnum('meal_input_type', ['audio', 'picture']);

export const mealsTable = pgTable('meals', {
	id: uuid().primaryKey().defaultRandom(),
	userID: uuid()
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	status: mealStatus().notNull(),
	inputType: mealInputType().notNull(),
	inputFileKey: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	icon: varchar({ length: 100 }).notNull(),
	foods: json(),
	createdAt: timestamp().defaultNow().notNull(),
});
