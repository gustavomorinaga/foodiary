import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { router } from 'expo-router';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react-native';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import { AuthLayout } from '../../../components/auth-layout.component';
import { Button } from '../../../components/button.component';
import { AccountStep } from '../../../components/sign-up-steps/account-step.component';
import { ActivityLevelStep } from '../../../components/sign-up-steps/activity-level.component';
import { BirthDateStep } from '../../../components/sign-up-steps/birth-date-step.component';
import { GenderStep } from '../../../components/sign-up-steps/gender-step.component';
import { GoalStep } from '../../../components/sign-up-steps/goal-step.component';
import { HeightStep } from '../../../components/sign-up-steps/height-step.component';
import { signUpSchema } from '../../../components/sign-up-steps/sign-up.schema';
import { WeightStep } from '../../../components/sign-up-steps/weight-step.component';
import { useAuth } from '../../../hooks/auth.hook';
import { colors } from '../../../styles/colors';

export default function SignUp() {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	const form = useForm({
		resolver: zodResolver(signUpSchema),
	});

	const steps = [
		{
			icon: '🎯',
			title: 'Qual é seu objetivo?',
			subtitle: 'O que você pretende alcançar com a dieta?',
			Component: GoalStep,
		},
		{
			icon: '👥',
			title: 'Qual é seu gênero',
			subtitle: 'Seu gênero influencia no tipo da dieta',
			Component: GenderStep,
		},
		{
			icon: '📅',
			title: 'Qual é sua data de nascimento?',
			subtitle: 'Sua idade ajuda a personalizar sua dieta',
			Component: BirthDateStep,
		},
		{
			icon: '📏',
			title: 'Qual é sua altura?',
			subtitle: 'Sua altura é importante para o cálculo do IMC',
			Component: HeightStep,
		},
		{
			icon: '⚖️',
			title: 'Qual é seu peso atual?',
			subtitle: 'Seu peso atual nos ajuda a criar sua dieta',
			Component: WeightStep,
		},
		{
			icon: '🏃',
			title: 'Qual é seu nível de atividade?',
			subtitle: 'Isso nos ajuda a calcular suas necessidades calóricas',
			Component: ActivityLevelStep,
		},
		{
			icon: '📝',
			title: 'Crie sua conta',
			subtitle: 'Finalize seu cadastro para começar sua jornada',
			Component: AccountStep,
		},
	];

	function handlePreviousStep() {
		if (currentStepIndex === 0) {
			router.back();
			return;
		}

		setCurrentStepIndex(prevState => prevState - 1);
	}

	function handleNextStep() {
		setCurrentStepIndex(prevState => prevState + 1);
	}

	const { signUp } = useAuth();

	const handleSubmit = form.handleSubmit(async formData => {
		try {
			const [day, month, year] = formData.birthDate.split('/');

			await signUp({
				height: Number(formData.height),
				weight: Number(formData.weight),
				activityLevel: Number(formData.activityLevel),
				gender: formData.gender,
				goal: formData.goal,
				birthDate: `${year}-${month}-${day}`,
				account: {
					email: formData.email,
					name: formData.name,
					password: formData.password,
				},
			});
		} catch (error) {
			if (isAxiosError(error)) {
				console.error(error.response?.data);
			}

			Alert.alert('Erro ao criar conta', 'Tente novamente mais tarde.');
		}
	});

	const currentStep = steps[currentStepIndex];
	const isLastStep = currentStepIndex === steps.length - 1;

	return (
		<AuthLayout
			icon={currentStep.icon}
			subtitle={currentStep.subtitle}
			title={currentStep.title}
		>
			<View className="flex-1 justify-between">
				<FormProvider {...form}>
					<currentStep.Component />
				</FormProvider>

				<View className="flex-row justify-between gap-4">
					<Button color="gray" onPress={handlePreviousStep} size="icon">
						<ArrowLeftIcon color={colors.black[700]} size={20} />
					</Button>

					{isLastStep ? (
						<Button
							className="flex-1"
							loading={form.formState.isSubmitting}
							onPress={handleSubmit}
						>
							Criar conta
						</Button>
					) : (
						<Button onPress={handleNextStep} size="icon">
							<ArrowRightIcon color={colors.black[700]} size={20} />
						</Button>
					)}
				</View>
			</View>
		</AuthLayout>
	);
}
