import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/colors';
import { formatDate } from '../utils/format-date.util';

interface IDateSwitcherProps {
	currentDate: Date;
	onPreviousDate?: () => void;
	onNextDate?: () => void;
}

export function DateSwitcher({
	currentDate,
	onPreviousDate,
	onNextDate,
}: IDateSwitcherProps) {
	return (
		<View className="mt-3 flex-row items-center justify-between px-2">
			<TouchableOpacity
				className="size-12 items-center justify-center"
				onPress={onPreviousDate}
			>
				<ChevronLeftIcon color={colors.black[700]} size={20} />
				<Text className="sr-only">Anterior</Text>
			</TouchableOpacity>

			<Text className="font-sans-medium text-base text-gray-700 tracking-[1.28px]">
				{formatDate(currentDate)}
			</Text>

			<TouchableOpacity
				className="size-12 items-center justify-center"
				onPress={onNextDate}
			>
				<Text className="sr-only">Próximo</Text>
				<ChevronRightIcon color={colors.black[700]} size={20} />
			</TouchableOpacity>
		</View>
	);
}
