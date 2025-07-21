import { CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { CameraIcon, CheckIcon, Trash2Icon, XIcon } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Image, Modal, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';
import { Button } from './button.component';

interface ICameraModalProps {
	open: boolean;
	onClose: () => void;
}

export function CameraModal({ onClose, open }: ICameraModalProps) {
	const [photoURI, setPhotoURI] = useState<string | null>(null);
	const [permission, requestPermission] = useCameraPermissions();

	const cameraRef = useRef<CameraView>(null);

	function handleCloseModal() {
		onClose();
		setPhotoURI(null);
	}

	async function handleTakePicture() {
		if (!cameraRef.current) {
			return;
		}

		const { uri } = await cameraRef.current.takePictureAsync({
			imageType: 'jpg',
		});

		setPhotoURI(uri);
	}

	function handleDeletePhoto() {
		setPhotoURI(null);
	}

	if (!permission) {
		return null;
	}

	return (
		<Modal
			animationType="slide"
			onRequestClose={handleCloseModal}
			statusBarTranslucent
			transparent
			visible={open}
		>
			<StatusBar style="light" />

			<View className="flex-1 bg-black">
				{!permission.granted && (
					<View className="flex-1 items-center justify-center">
						<Text className="mb-4 px-10 text-center font-sans-regular text-base text-white">
							Precisamos de permissão para acessar a câmera!
						</Text>
						<Button onPress={requestPermission}>Dar permissão</Button>
					</View>
				)}

				{permission.granted && (
					<SafeAreaProvider>
						<SafeAreaView className="flex-1">
							<View className="flex-row p-5">
								<Button color="dark" onPress={handleCloseModal} size="icon">
									<XIcon color={colors.gray[500]} size={20} />
									<Text className="sr-only">Fechar</Text>
								</Button>
							</View>

							{!photoURI && <CameraView ref={cameraRef} style={{ flex: 1 }} />}

							{photoURI && (
								<Image
									className="flex-1"
									resizeMode="contain"
									source={{ uri: photoURI }}
								/>
							)}

							{!photoURI && (
								<View className="items-center gap-2 p-5 pt-6 pb-12">
									<View className="flex-row">
										<Button
											color="dark"
											onPress={handleTakePicture}
											size="icon"
										>
											<CameraIcon color={colors.lime[600]} size={20} />
											<Text className="sr-only">Tirar foto</Text>
										</Button>
									</View>

									<Text className="font-sans-regular text-base text-gray-100">
										Tirar foto
									</Text>
								</View>
							)}

							{photoURI && (
								<View className="flex-row items-center justify-center gap-8 p-5 pt-6 pb-12">
									<Button color="dark" onPress={handleDeletePhoto} size="icon">
										<Trash2Icon color={colors.gray[500]} size={20} />
										<Text className="sr-only">Excluir</Text>
									</Button>
									<Button size="icon">
										<CheckIcon color={colors.black[700]} size={20} />
										<Text className="sr-only">Confirmar</Text>
									</Button>
								</View>
							)}
						</SafeAreaView>
					</SafeAreaProvider>
				)}
			</View>
		</Modal>
	);
}
