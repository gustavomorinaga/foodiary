import z from 'zod';
import { HttpRequest, HttpResponse } from '../types/http';
import { created } from '../utils/http.util';

const schema = z.object({
	email: z.email(),
	password: z.string().min(8),
});

export class SignUpController {
	static async handle(request: HttpRequest): Promise<HttpResponse> {
		return created({ accessToken: 'signup: token de acesso' });
	}
}
