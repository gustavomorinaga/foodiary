import { createContext } from 'react';

interface IAuthContextValue {
	isLoading: boolean;
	isLoggedIn: boolean;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	return (
		<AuthContext.Provider value={{ isLoggedIn: false, isLoading: true }}>
			{children}
		</AuthContext.Provider>
	);
}
