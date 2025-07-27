import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';
import { Button } from '$/components/button.component';
import { Logo } from '$/components/logo.component';
import { useMealDetails } from '$/hooks/meal-details.hook';

export default function MealDetails() {
	const { mealID } = useLocalSearchParams();

	const { meal, isFetching } = useMealDetails(mealID as string);

	if (isFetching || meal?.status !== 'success') {
		return (
			<View className="flex-1 items-center justify-center gap-12 bg-lime-700">
				<Logo height={60} width={187} />
				<ActivityIndicator color="#fff" />
			</View>
		);
	}

	return (
		<View className="flex-1 items-center justify-center">
			<Button onPress={router.back}>Voltar</Button>

			<Text>{JSON.stringify(meal, null, 2)}</Text>
		</View>
	);
}
