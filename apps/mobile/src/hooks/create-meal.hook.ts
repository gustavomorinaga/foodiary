import { useMutation, useQueryClient } from '@tanstack/react-query';
// biome-ignore lint/performance/noNamespaceImport: Expo FileSystem needs to be imported as a namespace
import * as FileSystem from 'expo-file-system';
import { httpClient } from '../services/http-client.service';

export type TCreateMealResponse = {
	mealID: string;
	uploadURL: string;
};

interface ICreateMealParams {
	fileType: 'image/jpeg' | 'audio/m4a';
	onSuccess?: (mealID: string) => void;
}

export function useCreateMeal({ fileType, onSuccess }: ICreateMealParams) {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (uri: string) => {
			const {
				data: { mealID, uploadURL },
			} = await httpClient.post<TCreateMealResponse>('/meals', {
				fileType,
			});

			await FileSystem.uploadAsync(uploadURL, uri, {
				httpMethod: 'PUT',
				uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
			});

			return { mealID };
		},
		onSuccess: ({ mealID }) => {
			onSuccess?.(mealID);
			queryClient.refetchQueries({ queryKey: ['meals'] });
		},
	});

	return {
		createMeal: mutateAsync,
		isLoading: isPending,
	};
}
