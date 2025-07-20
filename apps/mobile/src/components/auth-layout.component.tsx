import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IAuthLayoutProps {
	icon: string;
	title: string;
	subtitle: string;
	children?: React.ReactNode;
}

export function AuthLayout({
	icon,
	title,
	subtitle,
	children,
}: IAuthLayoutProps) {
	const { bottom } = useSafeAreaInsets();

	return (
		<View className="flex-1">
			<View className="flex-1 bg-white">
				<View className="h-[98px] bg-lime-400" />

				<View className="-mt-6 mx-auto size-12 items-center justify-center rounded-xl border-2 border-lime-400 bg-white">
					<Text>{icon}</Text>
				</View>

				<View className="mx-auto mt-6 items-center">
					<Text className="font-sans-semibold text-[32px] text-black-700 tracking-[-0.32px]">
						{title}
					</Text>
					<Text className="mt-1 font-sans-regular text-base text-gray-700">
						{subtitle}
					</Text>
				</View>

				<View className="mt-10 flex-1 px-6" style={{ marginBottom: bottom }}>
					{children}
				</View>
			</View>
		</View>
	);
}
