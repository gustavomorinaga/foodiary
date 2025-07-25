import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../services/http-client.service';

export type TMeal = {
	id: string;
	name: string;
	icon: string;
	foods: {
		name: string;
		quantity: string;
		calories: number;
		proteins: number;
		carbohydrates: number;
		fasts: number;
	}[];
	createdAt: string;
};

export function useMealsList(dateParam: string) {
	const { data: meals, refetch } = useQuery({
		queryKey: ['meals', dateParam],
		staleTime: 15_000,
		queryFn: async () => {
			const { data } = await httpClient.get<{ meals: TMeal[] }>('/meals', {
				params: { date: dateParam },
			});

			return data.meals;
		},
	});

	return { meals, refetch };
}
