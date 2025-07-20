import { Text, TouchableOpacity, View } from 'react-native';

interface IMealCardProps {
	id: string;
	name: string;
}

export function MealCard(props: IMealCardProps) {
	return (
		<TouchableOpacity>
			<Text className="font-sans-regular text-base text-gray-700">
				Hoje, 12h15
			</Text>

			<View className="mt-2 flex-row items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-5">
				<View className="size-12 items-center justify-center rounded-full bg-gray-200">
					<Text>🍞</Text>
				</View>

				<View>
					<Text className="font-sans-regular text-base text-gray-700">
						{props.name}
					</Text>
					<Text className="font-sans-medium text-base text-colors-black-700">
						Pão
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}
