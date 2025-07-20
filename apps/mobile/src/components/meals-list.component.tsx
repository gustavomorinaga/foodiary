import { FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DailyStats } from './daily-stats.component';
import { DateSwitcher } from './date-switcher.component';
import { Divider } from './divider.component';
import { MealCard } from './meal-card.component';

const meals = [
	{
		id: String(Math.random()),
		name: 'Café da manhã',
	},
	{
		id: String(Math.random()),
		name: 'Almoço',
	},
	{
		id: String(Math.random()),
		name: 'Lanche',
	},
	{
		id: String(Math.random()),
		name: 'Jantar',
	},
];

function MealsListHeader() {
	return (
		<View>
			<DateSwitcher />
			<View className="mt-2">
				<View className="mt-2">
					<DailyStats
						calories={{
							current: 500,
							goal: 2500,
						}}
						carbohydrates={{
							current: 500,
							goal: 2500,
						}}
						fats={{
							current: 500,
							goal: 2500,
						}}
						proteins={{
							current: 2000,
							goal: 2500,
						}}
					/>
				</View>
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

	return (
		<FlatList
			contentContainerStyle={{ paddingBottom: 80 + bottom + 16 }}
			data={meals}
			ItemSeparatorComponent={Separator}
			keyExtractor={meal => meal.id}
			ListHeaderComponent={MealsListHeader}
			renderItem={({ item: meal }) => (
				<View className="mx-5">
					<MealCard {...meal} />
				</View>
			)}
		/>
	);
}
