import { CameraIcon, MicIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AudioModal } from './audio-modal.component';
import { Button } from './button.component';
import { CameraModal } from './camera-modal.component';

export function CreateMealBottomBar() {
	const { bottom } = useSafeAreaInsets();

	const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
	const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);

	return (
		<View
			className="absolute bottom-0 z-10 w-full border-gray-200 border-t bg-white"
			style={{ height: 80 + bottom }}
		>
			<View className="mx-auto mt-4 flex-row gap-4">
				<Button
					color="gray"
					onPress={() => setIsAudioModalOpen(true)}
					size="icon"
				>
					<MicIcon />
					<Text className="sr-only">Gravar</Text>
				</Button>

				<Button
					color="gray"
					onPress={() => setIsPictureModalOpen(true)}
					size="icon"
				>
					<CameraIcon />
					<Text className="sr-only">Tirar foto</Text>
				</Button>
			</View>

			<AudioModal
				onClose={() => setIsAudioModalOpen(false)}
				open={isAudioModalOpen}
			/>

			<CameraModal
				onClose={() => setIsPictureModalOpen(false)}
				open={isPictureModalOpen}
			/>
		</View>
	);
}
