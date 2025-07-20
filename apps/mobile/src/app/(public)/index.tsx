import { Link } from 'expo-router';
import { ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/button.component';
import Logo from '../../components/logo.component';

export default function OnBoardingPage() {
	return (
		<ImageBackground
			className="flex-1"
			source={require('../../assets/onboarding-bg/onboarding-bg.png')}
		>
			<SafeAreaView className="flex-1">
				<View className="flex-1 items-center justify-between">
					<View className="mx-auto mt-4">
						<Logo />
					</View>

					<View className="w-full items-center">
						<Text className="w-[311px] text-center font-sans-semibold text-[32px] text-white">
							Controle sua dieta de forma simples
						</Text>

						<View className="mt-6 w-full p-5">
							<Link asChild href="/auth/sign-up">
								<Button className="w-full ">Criar conta</Button>
							</Link>
						</View>

						<View className="mt-[30px] flex-row items-center justify-center gap-2">
							<Text className="font-sans-regular text-base text-white">
								Já tem conta?
							</Text>
							<Link href="/auth/sign-in">
								<Text className="font-sans-medium text-base text-lime-500">
									Acesse agora!
								</Text>
							</Link>
						</View>
					</View>
				</View>
			</SafeAreaView>
		</ImageBackground>
	);
}
