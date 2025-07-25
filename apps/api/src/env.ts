import { z } from 'zod';

const envSchema = z.object({
	DATABASE_URL: z.url().startsWith('postgresql://'),
	JWT_SECRET: z.string().min(1),
	BUCKET_NAME: z.string().min(1),
	MEALS_QUEUE_URL: z.string().min(1),
	OPENAI_API_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
