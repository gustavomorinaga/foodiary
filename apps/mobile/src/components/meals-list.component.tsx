import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/auth.hook';
import { type TMeal, useMealsList } from '../hooks/meals-list.hook';
import { DailyStats } from './daily-stats.component';
import { DateSwitcher } from './date-switcher.component';
import { Divider } from './divider.component';
import { MealCard } from './meal-card.component';

interface IMealsListHeaderProps {
	currentDate: Date;
	meals: TMeal[];
	onPreviousDate?: () => void;
	onNextDate?: () => void;
}

function MealsListHeader({
	currentDate,
	meals,
	onPreviousDate,
	onNextDate,
}: IMealsListHeaderProps) {
	const { user } = useAuth();

	const totals = useMemo(() => {
		let calories = 0;
		let proteins = 0;
		let carbohydrates = 0;
		let fats = 0;

		for (const meal of meals) {
			for (const food of meal.foods) {
				calories += food.calories;
				proteins += food.proteins;
				carbohydrates += food.carbohydrates;
				fats += food.fasts;
			}
		}

		return {
			calories,
			proteins,
			carbohydrates,
			fats,
		};
	}, [meals]);

	return (
		<View>
			<DateSwitcher
				currentDate={currentDate}
				onNextDate={onNextDate}
				onPreviousDate={onPreviousDate}
			/>

			<View className="mt-2">
				<DailyStats
					calories={{
						current: totals.calories,
						goal: user!.calories,
					}}
					carbohydrates={{
						current: totals.carbohydrates,
						goal: user!.carbohydrates,
					}}
					fats={{
						current: totals.fats,
						goal: user!.fats,
					}}
					proteins={{
						current: totals.proteins,
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

	const [currentDate, setCurrentDate] = useState(new Date());

	const dateParam = useMemo(() => {
		const [date] = new Date(currentDate).toISOString().split('T');
		return date;
	}, [currentDate]);

	const { meals, refetch } = useMealsList(dateParam);

	useFocusEffect(
		useCallback(() => {
			refetch();
		}, [refetch])
	);

	function handlePreviousDate() {
		setCurrentDate(prevState => {
			const newDate = new Date(prevState);
			newDate.setDate(newDate.getDate() - 1);
			return newDate;
		});
	}

	function handleNextDate() {
		setCurrentDate(prevState => {
			const newDate = new Date(prevState);
			newDate.setDate(newDate.getDate() + 1);
			return newDate;
		});
	}

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
			ListHeaderComponent={
				<MealsListHeader
					currentDate={currentDate}
					meals={meals ?? []}
					onNextDate={handleNextDate}
					onPreviousDate={handlePreviousDate}
				/>
			}
			renderItem={({ item: meal }) => (
				<View className="mx-5">
					<MealCard {...meal} createdAt={new Date(meal.createdAt)} />
				</View>
			)}
		/>
	);
}
