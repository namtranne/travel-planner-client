import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    createTrip as createTripApi,
    deleteTrip as deleteTripApi,
    getMyTrips,
    getTripDetails,
    updateTrip as updateTripApi
} from '../services/api-trip';

export function useMyTrips() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['trips'],
        queryFn: getMyTrips
    });
    if (error) {
        console.log('error', error);
    }

    return { isLoading, user: data, error };
}

export function useTripDetails(tripId: number) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['trip', tripId],
        queryFn: () => getTripDetails(tripId),
        retry: false
    });
    if (error) {
        console.log('error', error);
    }

    return { isLoading, trip: data, error };
}

export function useCreateTrip() {
    const queryClient = useQueryClient();

    const {
        mutate: createTrip,
        isPending,
        error
    } = useMutation({
        mutationFn: createTripApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, createTrip, error };
}

export function useUpdateTrip() {
    const queryClient = useQueryClient();

    const {
        mutate: updateTrip,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; updateTripReq: any }) => updateTripApi(data.tripId, data.updateTripReq),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, updateTrip, error };
}

export function useDeleteTrip() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteTrip,
        isPending,
        error
    } = useMutation({
        mutationFn: (tripId: number) => deleteTripApi(tripId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, deleteTrip, error };
}
