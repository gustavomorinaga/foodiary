import { Controller, useFormContext } from 'react-hook-form';
import { OptionsSelector } from '../options-selector.component';
import type { SignUpFormData } from './sign-up.schema';

export function ActivityLevelStep() {
	const form = useFormContext<SignUpFormData>();

	return (
		<Controller
			control={form.control}
			name="activityLevel"
			render={({ field }) => (
				<OptionsSelector
					onChange={value => field.onChange(Number(value))}
					options={[
						{
							icon: '🛋️',
							title: 'Sedentário',
							description: 'Pouca ou nenhuma atividade física',
							value: '1',
						},
						{
							icon: '🚶',
							title: 'Leve',
							description: 'Exercício leve 1-3 dias por semana',
							value: '2',
						},
						{
							icon: '🏃',
							title: 'Moderado',
							description: 'Exercício moderado 3-5 dias por semana',
							value: '3',
						},
						{
							icon: '🏋️',
							title: 'Pesado',
							description: 'Exercício pesado 6-7 dias por semana',
							value: '4',
						},
						{
							icon: '🏆',
							title: 'Atleta',
							description: 'Exercício muito pesado, trabalho físico',
							value: '5',
						},
					]}
					value={field.value?.toString()}
				/>
			)}
		/>
	);
}
