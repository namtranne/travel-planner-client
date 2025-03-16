import { useMutation } from '@tanstack/react-query';

import { searchPlaces as searchPlacesApi } from '../services/api-place';

// Place
export function useSearchPlaces() {
    const {
        mutate: searchPlaces,
        data,
        isPending,
        error
    } = useMutation({
        mutationFn: (searchQuery: string) => searchPlacesApi(searchQuery)
    });

    return {
        searchPlaces,
        data,
        isPending,
        error
    };
}
