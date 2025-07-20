import { router, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from '../../../components/button.component';

export default function MealDetailsPage() {
	const { mealID } = useLocalSearchParams();

	return (
		<View className="flex-1 items-center justify-center">
			<Text>Detalhes da refeição: {mealID}</Text>

			<Button onPress={router.back}>Voltar</Button>
		</View>
	);
}
