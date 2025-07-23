import { useMutation } from '@tanstack/react-query';
import FileSystem from 'expo-file-system';
import { httpClient } from '../services/http-client.service';

type TCreateMealResponse = {
	mealID: string;
	uploadURL: string;
};

export function useCreateMeal(fileType: string) {
	const { mutateAsync: createMeal, isPending: isLoading } = useMutation({
		mutationFn: async (uri: string) => {
			const {
				data: { uploadURL },
			} = await httpClient.post<TCreateMealResponse>('/meals', {
				fileType,
			});

			await FileSystem.uploadAsync(uploadURL, uri, {
				httpMethod: 'PUT',
				uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
			});
		},
	});

	return { createMeal, isLoading };
}
