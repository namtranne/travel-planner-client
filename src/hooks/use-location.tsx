import { useQuery } from '@tanstack/react-query';

import { fetchExplorePage } from '../services';

export function useExplorePage(locationId?: number) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['explorePage', locationId],
        queryFn: () => fetchExplorePage(locationId!),
        enabled: !!locationId,
        staleTime: 1000 * 60 * 5 // Cache data for 5 minutes
    });
    return { data, isLoading, error };
}
