import { useMutation } from '@tanstack/react-query';
import {
	AudioModule,
	RecordingPresets,
	setAudioModeAsync,
	useAudioPlayer,
	useAudioRecorder,
	useAudioRecorderState,
} from 'expo-audio';
import { StatusBar } from 'expo-status-bar';
import {
	CheckIcon,
	MicIcon,
	PauseIcon,
	PlayIcon,
	SquareIcon,
	Trash2Icon,
	XIcon,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Alert, Modal, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { httpClient } from '../services/http-client.service';
import { colors } from '../styles/colors';
import { cn } from '../utils/cn';
import { Button } from './button.component';

interface IAudioModalProps {
	open: boolean;
	onClose: () => void;
}

export function AudioModal({ onClose, open }: IAudioModalProps) {
	const [audioURI, setAudioURI] = useState<null | string>(null);

	const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
	const { isRecording } = useAudioRecorderState(audioRecorder);
	const player = useAudioPlayer(audioURI);

	const { mutateAsync: createMeal } = useMutation({
		mutationFn: async (uri: string) => {
			const {
				data: { uploadURL },
			} = await httpClient.post('/meals', {
				fileType: 'audio/m4a',
			});

			const { data: file } = await httpClient.get(uri, {
				responseType: 'blob',
			});

			await httpClient.put(uploadURL, file);
		},
	});

	useEffect(() => {
		(async () => {
			const status = await AudioModule.requestRecordingPermissionsAsync();

			if (!status.granted) {
				Alert.alert('A permissão para acessar o microfone foi negada.');
			}

			setAudioModeAsync({ playsInSilentMode: true, allowsRecording: true });
		})();
	}, []);

	async function handleStartRecording() {
		await audioRecorder.prepareToRecordAsync();
		audioRecorder.record();
	}

	async function handleStopRecording() {
		await audioRecorder.stop();
		setAudioURI(audioRecorder.uri);
	}

	function handlePlayAudio() {
		player.seekTo(0);
		player.play();
	}

	function handlePauseAudio() {
		player.pause();
	}

	function handleDeleteAudio() {
		setAudioURI(null);
	}

	function handleCloseModal() {
		setAudioURI(null);
		onClose();
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
				<SafeAreaProvider>
					<SafeAreaView className="flex-1">
						<View className="flex-row p-5">
							<Button color="dark" onPress={handleCloseModal} size="icon">
								<XIcon color={colors.gray[500]} size={20} />
								<Text className="sr-only">Fechar</Text>
							</Button>
						</View>

						<View className="flex-1 items-center justify-center">
							<View className="size-[265px] items-center justify-center rounded-full border border-gray-700/10">
								<View
									className={cn(
										'size-[227px] items-center justify-center rounded-full border border-gray-700/50',
										isRecording && 'border-lime-600/50'
									)}
								>
									<View
										className={cn(
											'size-[179px] rounded-full bg-gray-700/10',
											isRecording && 'bg-lime-600/10'
										)}
									/>
								</View>
							</View>

							<Text className="mt-8 w-[192px] text-center font-sans-regular text-base text-white">
								Tente dizer algo como: 100g de Arroz, 2 Ovos e 100g de Salada
							</Text>
						</View>

						{!audioURI && (
							<View className="items-center gap-2 p-5 pt-6 pb-20">
								<View className="flex-row">
									{!isRecording && (
										<Button
											color="dark"
											onPress={handleStartRecording}
											size="icon"
										>
											<MicIcon color={colors.lime[600]} size={20} />
											<Text className="sr-only">Gravar</Text>
										</Button>
									)}

									{isRecording && (
										<Button
											color="dark"
											onPress={handleStopRecording}
											size="icon"
										>
											<SquareIcon color={colors.gray[500]} size={20} />
											<Text className="sr-only">Parar</Text>
										</Button>
									)}
								</View>

								<Text className="w-[180px] text-center font-sans-regular text-base text-gray-100">
									Toque no microfone para começar a gravar
								</Text>
							</View>
						)}

						{audioURI && (
							<View className="flex-row items-center justify-center gap-8 p-5 pt-6 pb-20">
								<Button color="dark" onPress={handleDeleteAudio} size="icon">
									<Trash2Icon color={colors.gray[500]} size={20} />
									<Text className="sr-only">Excluir</Text>
								</Button>

								{!player.playing && (
									<Button color="dark" onPress={handlePlayAudio} size="icon">
										<PlayIcon color={colors.lime[600]} size={20} />
										<Text className="sr-only">Reproduzir</Text>
									</Button>
								)}
								{player.playing && (
									<Button color="dark" onPress={handlePauseAudio} size="icon">
										<PauseIcon color={colors.lime[600]} size={20} />
										<Text className="sr-only">Pausar</Text>
									</Button>
								)}

								<Button onPress={() => createMeal(audioURI)} size="icon">
									<CheckIcon color={colors.black[700]} size={20} />
									<Text className="sr-only">Confirmar</Text>
								</Button>
							</View>
						)}
					</SafeAreaView>
				</SafeAreaProvider>
			</View>
		</Modal>
	);
}
