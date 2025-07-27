import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { Input } from '$/components/input.component';
import type { SignUpFormData } from './sign-up.schema';

export function AccountStep() {
	const { control } = useFormContext<SignUpFormData>();

	return (
		<View className="gap-4">
			<Controller
				control={control}
				name="name"
				render={({ field, fieldState }) => (
					<Input
						autoCapitalize="words"
						error={fieldState.error?.message}
						label="Nome completo"
						onChangeText={field.onChange}
						placeholder="Digite seu nome"
						value={field.value}
					/>
				)}
			/>

			<Controller
				control={control}
				name="email"
				render={({ field, fieldState }) => (
					<Input
						autoCapitalize="none"
						autoCorrect={false}
						error={fieldState.error?.message}
						keyboardType="email-address"
						label="Email"
						onChangeText={field.onChange}
						placeholder="Digite seu email"
						value={field.value}
					/>
				)}
			/>

			<Controller
				control={control}
				name="password"
				render={({ field, fieldState }) => (
					<Input
						autoCapitalize="none"
						autoCorrect={false}
						error={fieldState.error?.message}
						label="Senha"
						onChangeText={field.onChange}
						placeholder="Digite sua senha (min. 8 caracteres)"
						secureTextEntry
						value={field.value}
					/>
				)}
			/>
		</View>
	);
}
