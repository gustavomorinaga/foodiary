import { Text, TouchableOpacity, View } from 'react-native';
import { cn } from '../utils/cn';

interface IOptionSelectorProps {
	value?: string;
	onChange?: (value: string) => void;
	options: {
		value: string;
		icon: string;
		title: string;
		description?: string;
	}[];
}

export function OptionsSelector({
	options,
	onChange,
	value,
}: IOptionSelectorProps) {
	return (
		<View className="w-full gap-4">
			{options.map(option => (
				<TouchableOpacity
					className={cn(
						'flex-row items-center gap-4 rounded-2xl border border-gray-500 px-4 py-3',
						value === option.value && 'border-lime-700 bg-lime-700/10'
					)}
					key={option.value}
					onPress={() => onChange?.(option.value)}
				>
					<View
						className={cn(
							'size-12 items-center justify-center rounded-xl bg-gray-400',
							value === option.value && 'bg-white/40'
						)}
					>
						<Text>{option.icon}</Text>
					</View>

					<View>
						<Text className="font-sans-semibold text-base text-black-700">
							{option.title}
						</Text>

						{option.description && (
							<Text className="font-sans-regular text-gray-700 text-sm">
								{option.description}
							</Text>
						)}
					</View>
				</TouchableOpacity>
			))}
		</View>
	);
}
