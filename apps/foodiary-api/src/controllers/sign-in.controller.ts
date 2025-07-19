import z from 'zod';
import { HttpRequest } from '../types/http';
import { ok } from '../utils/http.util';

const schema = z.object({
	email: z.email(),
	password: z.string().min(8),
});

export class SignInController {
	static async handle(request: HttpRequest) {
		return ok({ accessToken: 'token de acesso' });
	}
}
