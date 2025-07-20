import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '../input.component';
import type { SignUpFormData } from './sign-up.schema';

export function HeightStep() {
	const { control } = useFormContext<SignUpFormData>();

	return (
		<Controller
			control={control}
			name="height"
			render={({ field, fieldState }) => (
				<Input
					append="cm"
					error={fieldState.error?.message}
					keyboardType="numeric"
					label="Altura"
					onChangeText={field.onChange}
					placeholder="Ex: 175"
					value={field.value}
				/>
			)}
		/>
	);
}
