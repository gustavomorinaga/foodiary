import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/colors';

export function DateSwitcher() {
	return (
		<View className="mt-3 flex-row items-center justify-between px-2">
			<TouchableOpacity className="size-12 items-center justify-center">
				<ChevronLeftIcon color={colors.black[700]} size={20} />
			</TouchableOpacity>

			<Text className="font-sans-medium text-base text-gray-700 tracking-[1.28px]">
				HOJE, 20 DE JULHO
			</Text>

			<TouchableOpacity className="size-12 items-center justify-center">
				<ChevronRightIcon color={colors.black[700]} size={20} />
			</TouchableOpacity>
		</View>
	);
}
