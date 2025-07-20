import { LogOutIcon } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';

export function HomeHeader() {
	return (
		<View className="h-[136px] bg-lime-400">
			<SafeAreaView className="flex-1 flex-row items-center justify-between px-4">
				<View>
					<Text className="font-sans-regular text-gray-700 text-sm">
						Olá, 👋🏻
					</Text>
					<Text className="font-sans-semibold text-base text-black-700">
						Gustavo
					</Text>
				</View>

				<TouchableOpacity className="size-12 items-center justify-center">
					<LogOutIcon color={colors.black[700]} size={20} />
					<Text className="sr-only">Sair</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</View>
	);
}
