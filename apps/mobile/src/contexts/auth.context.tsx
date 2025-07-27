import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createContext, useCallback, useEffect, useState } from 'react';
import { queryClient } from '$/clients/query.client';
import { httpClient } from '$/services/http-client.service';

type TUser = {
	email: string;
	name: string;
	id: string;
	calories: number;
	proteins: number;
	carbohydrates: number;
	fats: number;
};

type TSignInParams = {
	email: string;
	password: string;
};

type TSignUpParams = {
	goal: string;
	gender: string;
	birthDate: string;
	activityLevel: number;
	height: number;
	weight: number;
	account: {
		name: string;
		email: string;
		password: string;
	};
};

interface IAuthContextValue {
	user: TUser | null;
	isLoggedIn: boolean;
	isLoading: boolean;
	signIn(params: TSignInParams): Promise<void>;
	signUp(params: TSignUpParams): Promise<void>;
	signOut(): Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextValue);

const TOKEN_STORAGE_KEY = '@foodiary::token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [token, setToken] = useState<string | null>(null);
	const [isLoadingToken, setIsLoadingToken] = useState(true);

	useEffect(() => {
		async function load() {
			const storedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

			setToken(storedToken);
			setIsLoadingToken(false);
		}

		load();
	}, []);

	useEffect(() => {
		async function run() {
			if (!token) {
				httpClient.defaults.headers.common.Authorization = null;
				return;
			}

			httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
			await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
		}

		run();
	}, [token]);

	const { mutateAsync: signIn } = useMutation({
		mutationFn: async (params: TSignInParams) => {
			const { data } = await httpClient.post('/sign-in', params);
			setToken(data.accessToken);
		},
	});

	const { mutateAsync: signUp } = useMutation({
		mutationFn: async (params: TSignUpParams) => {
			const { data } = await httpClient.post('/sign-up', params);
			setToken(data.accessToken);
		},
	});

	const { data: user, isFetching } = useQuery({
		enabled: !!token,
		queryKey: ['user'],
		queryFn: async () => {
			const { data } = await httpClient.get<{ user: TUser }>('/me');
			return data.user;
		},
	});

	const signOut = useCallback(async () => {
		setToken(null);
		await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
		queryClient.resetQueries({ queryKey: ['user'] });
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!user,
				isLoading: isLoadingToken || isFetching,
				user: user ?? null,
				signIn,
				signUp,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
