import './styles/global.css';

import {
	HostGrotesk_400Regular,
	HostGrotesk_500Medium,
	HostGrotesk_600SemiBold,
	HostGrotesk_700Bold,
	useFonts,
} from '@expo-google-fonts/host-grotesk';
// biome-ignore lint/performance/noNamespaceImport: This is a common pattern in React Native projects.
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './screens/home.screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [loaded, error] = useFonts({
		HostGrotesk_400Regular,
		HostGrotesk_500Medium,
		HostGrotesk_600SemiBold,
		HostGrotesk_700Bold,
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!(loaded || error)) {
		return null;
	}

	return (
		<View className="flex-1 bg-white">
			<SafeAreaProvider>
				<HomeScreen />
			</SafeAreaProvider>
		</View>
	);
}
