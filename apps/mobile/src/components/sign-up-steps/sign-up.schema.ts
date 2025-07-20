import z from 'zod';

export const signUpSchema = z.object({
	goal: z.enum(['lose', 'maintain', 'gain']),
	birthDate: z.string().min(1, { message: 'Data de nascimento é obrigatória' }),
	gender: z.enum(['male', 'female']),
	height: z.string().min(1, { message: 'Altura é obrigatória' }),
	weight: z.string().min(1, { message: 'Peso é obrigatório' }),
	activityLevel: z.string(),
	name: z.string().min(1, { message: 'Nome é obrigatório' }),
	email: z.email({ message: 'Email inválido' }),
	password: z
		.string()
		.min(8, { message: 'Senha deve ter pelo menos 8 caracteres' }),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
