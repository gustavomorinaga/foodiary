import { LogOutIcon } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import {
	SafeAreaView,
	useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useAuth } from '$/hooks/auth.hook';
import { colors } from '$/styles/colors';

export function HomeHeader() {
	const { top } = useSafeAreaInsets();
	const { signOut, user } = useAuth();

	return (
		<View className="h-[130px] bg-lime-400">
			<SafeAreaView
				className="flex-1 flex-row items-center justify-between px-4"
				style={{ paddingTop: top }}
			>
				<View>
					<Text className="font-sans-regular text-gray-700 text-sm">
						Olá, 👋
					</Text>
					<Text className="font-sans-semibold text-base text-black-700">
						{user!.name}
					</Text>
				</View>

				<TouchableOpacity
					className="size-12 items-center justify-center"
					onPress={signOut}
				>
					<LogOutIcon color={colors.black[700]} size={20} />
					<Text className="sr-only">Sair</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</View>
	);
}
