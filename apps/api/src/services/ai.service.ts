import OpenAI, { toFile } from 'openai';
import { env } from '$/env';

export const aiClient = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export async function transcribeAudio(fileBuffer: Buffer) {
	const transcription = await aiClient.audio.transcriptions.create({
		model: 'whisper-1',
		language: 'pt',
		response_format: 'text',
		file: await toFile(fileBuffer, 'audio.m4a', { type: 'audio/m4a' }),
	});

	return transcription;
}

type TGetMealDetailsFromTextParams = {
	text: string;
	createdAt: Date;
};

export async function getMealDetailsFromText({
	text,
	createdAt,
	// biome-ignore lint/suspicious/noExplicitAny: This is a specific type for the AI response
}: TGetMealDetailsFromTextParams): Promise<Record<string, any>> {
	const {
		choices: [{ message }],
	} = await aiClient.chat.completions.create({
		model: 'gpt-4.1-nano',
		messages: [
			{
				role: 'system',
				content: `
					You are a nutritionist assisting one of your patients. You must respond to them following the instructions below.

					Your role is to:
					1. Give a name and choose an emoji for the meal based on its time.
					2. Identify the foods present in the image.
					3. Estimate, for each identified food:
					- Name of the food (in Portuguese)
					- Approximate quantity (in grams or units)
					- Calories (kcal)
					- Carbohydrates (g)
					- Proteins (g)
					- Fats (g)

					Be direct, objective, and avoid explanations. Only return the data in JSON in the format below:

					{
						"name": "Jantar",
						"icon": "🍗",
						"foods": [
							{
							"name": "Arroz branco cozido",
							"quantity": "150g",
							"calories": 193,
							"carbohydrates": 42,
							"proteins": 3.5,
							"fats": 0.4
							},
							{
							"name": "Peito de frango grelhado",
							"quantity": "100g",
							"calories": 165,
							"carbohydrates": 0,
							"proteins": 31,
							"fats": 3.6
							}
						]
					}
				`,
			},
			{
				role: 'user',
				content: `
					Date: ${createdAt}
					Meal: ${text}
				`,
			},
		],
	});

	if (!message.content) {
		throw new Error('Failed to process the meal.');
	}

	return JSON.parse(message.content);
}

type TGetMealDetailsFromImageParams = {
	imageURL: string;
	createdAt: Date;
};

export async function getMealDetailsFromImage({
	imageURL,
	createdAt,
	// biome-ignore lint/suspicious/noExplicitAny: This is a specific type for the AI response
}: TGetMealDetailsFromImageParams): Promise<Record<string, any>> {
	const {
		choices: [{ message }],
	} = await aiClient.chat.completions.create({
		model: 'gpt-4.1-nano',
		messages: [
			{
				role: 'system',
				content: `
					Meal date: ${createdAt}

					You are a nutritionist specialized in food analysis by image. The following image was taken by a user to record their meal.

					Your role is to:
					1. Give a name and choose an emoji for the meal based on its time.
					2. Identify the foods present in the image.
					3. Estimate, for each identified food:
					- Name of the food (in Portuguese)
					- Approximate quantity (in grams or units)
					- Calories (kcal)
					- Carbohydrates (g)
					- Proteins (g)
					- Fats (g)

					Consider proportions and visible volume to estimate the quantity. When there is uncertainty about the exact type of food (for example, type of rice, cut of meat), use the most common type. Be direct, objective, and avoid explanations. Only return the data in JSON in the format below:

					{
						"name": "Jantar",
						"icon": "🍗",
						"foods": [
							{
							"name": "Arroz branco cozido",
							"quantity": "150g",
							"calories": 193,
							"carbohydrates": 42,
							"proteins": 3.5,
							"fats": 0.4
							},
							{
							"name": "Peito de frango grelhado",
							"quantity": "100g",
							"calories": 165,
							"carbohydrates": 0,
							"proteins": 31,
							"fats": 3.6
							}
						]
					}
				`,
			},
			{
				role: 'user',
				content: [
					{
						type: 'image_url',
						image_url: {
							url: imageURL,
						},
					},
				],
			},
		],
	});

	if (!message.content) {
		throw new Error('Failed to process the meal.');
	}

	return JSON.parse(message.content);
}
