import { CameraIcon, MicIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from './button.component';

export function CreateMealBottomBar() {
	const { bottom } = useSafeAreaInsets();

	return (
		<View
			className="absolute bottom-0 z-10 w-full border-gray-200 border-t bg-white"
			style={{ height: 80 + bottom }}
		>
			<View className="mx-auto mt-4 flex-row gap-4">
				<Button color="gray" size="icon">
					<MicIcon />
					<Text className="sr-only">Gravar</Text>
				</Button>

				<Button color="gray" size="icon">
					<CameraIcon />
					<Text className="sr-only">Tirar foto</Text>
				</Button>
			</View>
		</View>
	);
}
