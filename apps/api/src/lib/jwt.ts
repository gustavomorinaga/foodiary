import { sign } from 'jsonwebtoken';
import { env } from '../env';

export function signAccessToken(userID: string): string {
	return sign({ sub: userID }, env.JWT_SECRET, { expiresIn: '3d' });
}
