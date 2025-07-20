import '../styles/global.css';

import {
	HostGrotesk_400Regular,
	HostGrotesk_500Medium,
	HostGrotesk_600SemiBold,
	HostGrotesk_700Bold,
	useFonts,
} from '@expo-google-fonts/host-grotesk';
import { Stack } from 'expo-router';
// biome-ignore lint/performance/noNamespaceImport: This is a common pattern in React Native projects.
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../contexts/auth.context';
import { useAuth } from '../hooks/auth.hook';

SplashScreen.preventAutoHideAsync();

function AppContainer() {
	const { isLoading, isLoggedIn } = useAuth();

	const [loaded, error] = useFonts({
		HostGrotesk_400Regular,
		HostGrotesk_500Medium,
		HostGrotesk_600SemiBold,
		HostGrotesk_700Bold,
	});

	useEffect(() => {
		const isFontLoaded = loaded || error;
		const isUserLoaded = !isLoading;

		if (isFontLoaded || isUserLoaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error, isLoading]);

	if (!(loaded || error)) {
		return null;
	}

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Protected guard={isLoggedIn}>
				<Stack.Screen name="(private)" />
			</Stack.Protected>

			<Stack.Protected guard={!isLoggedIn}>
				<Stack.Screen name="(public)" />
			</Stack.Protected>
		</Stack>
	);
}

export default function RootLayout() {
	return (
		<SafeAreaProvider>
			<AuthProvider>
				<AppContainer />
			</AuthProvider>
		</SafeAreaProvider>
	);
}
