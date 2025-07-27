import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '$/components/input.component';
import type { SignUpFormData } from './sign-up.schema';

export function WeightStep() {
	const { control } = useFormContext<SignUpFormData>();

	return (
		<Controller
			control={control}
			name="weight"
			render={({ field, fieldState }) => (
				<Input
					append="kg"
					error={fieldState.error?.message}
					keyboardType="numeric"
					label="Peso"
					onChangeText={field.onChange}
					placeholder="Ex: 70"
					value={field.value}
				/>
			)}
		/>
	);
}
