import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { formatDateTime } from '../utils/format-date-time.util';

interface IMealCardProps {
	id: string;
	icon: string;
	name: string;
	foods: { name: string }[];
	createdAt: Date;
}

export function MealCard({ id, icon, name, createdAt, foods }: IMealCardProps) {
	return (
		<Link asChild href={`/meals/${id}`}>
			<TouchableOpacity>
				<Text className="font-sans-regular text-base text-gray-700">
					{formatDateTime(createdAt)}
				</Text>

				<View className="mt-2 flex-row items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-5">
					<View className="size-12 items-center justify-center rounded-full bg-gray-200">
						<Text>{icon}</Text>
					</View>

					<View>
						<Text className="font-sans-regular text-base text-gray-700">
							{name}
						</Text>
						<Text className="font-sans-medium text-base text-colors-black-700">
							{foods.map(food => food.name).join(', ')}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</Link>
	);
}
