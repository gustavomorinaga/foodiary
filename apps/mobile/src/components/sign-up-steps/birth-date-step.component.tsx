import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '../input.component';
import type { SignUpFormData } from './sign-up.schema';

export function BirthDateStep() {
	const { control } = useFormContext<SignUpFormData>();

	return (
		<Controller
			control={control}
			name="birthDate"
			render={({ field, fieldState }) => (
				<Input
					error={fieldState.error?.message}
					keyboardType="numeric"
					label="Data de nascimento"
					mask="99/99/9999"
					onChangeText={field.onChange}
					placeholder="DD/MM/AAAA"
					value={field.value}
				/>
			)}
		/>
	);
}
