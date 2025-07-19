import { type JwtPayload, sign, verify } from 'jsonwebtoken';
import { env } from '../env';

export function signAccessToken(userID: string): string {
	return sign({ sub: userID }, env.JWT_SECRET, { expiresIn: '3d' });
}

export function validateAccessToken(token: string): string | null {
	try {
		const { sub } = verify(token, env.JWT_SECRET) as JwtPayload;

		return sub ?? null;
	} catch {
		return null;
	}
}
