import { View } from 'react-native';
import { CreateMealBottomBar } from '../components/create-meal-bottom-bar.component';
import { HomeHeader } from '../components/home-header.component';
import { MealsList } from '../components/meals-list.component';

export function HomeScreen() {
	return (
		<View className="flex-1">
			<HomeHeader />
			<MealsList />
			<CreateMealBottomBar />
		</View>
	);
}
