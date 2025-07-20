import { View } from 'react-native';
import { CreateMealBottomBar } from '../../components/create-meal-bottom-bar.component';
import { HomeHeader } from '../../components/home-header.component';
import { MealsList } from '../../components/meals-list.component';

export default function HomePage() {
	return (
		<View className="flex-1 bg-white">
			<HomeHeader />
			<MealsList />
			<CreateMealBottomBar />
		</View>
	);
}
