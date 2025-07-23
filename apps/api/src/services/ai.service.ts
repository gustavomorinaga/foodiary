import OpenAI, { toFile } from 'openai';
import { env } from '$/env';

export const aiClient = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export async function transcribeAudio(file: Buffer) {
	const transcription = await aiClient.audio.transcriptions.create({
		model: 'whisper-1',
		language: 'pt',
		response_format: 'text',
		file: await toFile(file, 'audio.m4a', { type: 'audio/m4a' }),
	});

	return transcription;
}
