import { Controller, useFormContext } from 'react-hook-form';
import { OptionsSelector } from '$/components/options-selector.component';
import type { SignUpFormData } from './sign-up.schema';

export function GenderStep() {
	const form = useFormContext<SignUpFormData>();

	return (
		<Controller
			control={form.control}
			name="gender"
			render={({ field }) => (
				<OptionsSelector
					onChange={field.onChange}
					options={[
						{
							icon: '👨',
							title: 'Masculino',
							value: 'male',
						},
						{
							icon: '👩',
							title: 'Feminino',
							value: 'female',
						},
					]}
					value={field.value}
				/>
			)}
		/>
	);
}
