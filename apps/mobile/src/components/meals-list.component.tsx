import { useQuery } from '@tanstack/react-query';
import { FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/auth.hook';
import { httpClient } from '../services/http-client.service';
import { DailyStats } from './daily-stats.component';
import { DateSwitcher } from './date-switcher.component';
import { Divider } from './divider.component';
import { MealCard } from './meal-card.component';

type TMeals = {
	name: string;
	id: string;
	icon: string;
	foods: {
		name: string;
		quantity: string;
		calories: number;
		proteins: number;
		carbohydrates: number;
		fasts: number;
	}[];
	createdAt: string;
};

function MealsListHeader() {
	const { user } = useAuth();

	return (
		<View>
			<DateSwitcher />

			<View className="mt-2">
				<DailyStats
					calories={{
						current: 0,
						goal: user!.calories,
					}}
					carbohydrates={{
						current: 0,
						goal: user!.carbohydrates,
					}}
					fats={{
						current: 0,
						goal: user!.fats,
					}}
					proteins={{
						current: 0,
						goal: user!.proteins,
					}}
				/>
			</View>

			<Divider />

			<Text className="m-5 font-sans-medium text-base text-colors-black-700 tracking-[1.28px]">
				REFEIÇÕES
			</Text>
		</View>
	);
}

function Separator() {
	return <View className="h-8" />;
}

export function MealsList() {
	const { bottom } = useSafeAreaInsets();

	const { data: meals } = useQuery({
		queryKey: ['meals'],
		queryFn: async () => {
			const { data } = await httpClient.get<{ meals: TMeals[] }>('/meals', {
				params: {
					date: '2025-07-20',
				},
			});

			return data.meals;
		},
	});

	return (
		<FlatList
			contentContainerStyle={{ paddingBottom: 80 + bottom + 16 }}
			data={meals}
			ItemSeparatorComponent={Separator}
			keyExtractor={meal => meal.id}
			ListEmptyComponent={
				<Text className="mx-5 font-sans-regular">
					Nenhuma refeição cadastrada...
				</Text>
			}
			ListHeaderComponent={MealsListHeader}
			renderItem={({ item: meal }) => (
				<View className="mx-5">
					<MealCard {...meal} />
				</View>
			)}
		/>
	);
}
