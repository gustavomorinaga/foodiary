import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../services/http-client.service';

export type TMeal = {
	id: string;
	icon: string;
	name: string;
	status: 'uploading' | 'processing' | 'success' | 'failed';
	foods: {
		name: string;
		quantity: string;
		calories: number;
		proteins: number;
		carbohydrates: number;
		fats: number;
	}[];
	createdAt: string;
};

export function useMealDetails(mealID: string) {
	const { data: meal, isFetching } = useQuery({
		queryKey: ['meal', mealID],
		staleTime: Number.POSITIVE_INFINITY,
		queryFn: async () => {
			const { data } = await httpClient.get<{ meal: TMeal }>(
				`/meals/${mealID}`
			);

			return data.meal;
		},
		refetchInterval: query => {
			if (query.state.data?.status === 'success') {
				return false;
			}

			return 2000;
		},
	});

	return { meal, isFetching };
}
