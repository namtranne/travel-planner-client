import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    createTrip as createTripApi,
    deleteTrip as deleteTripApi,
    getMyTrips,
    getTripDetails,
    getTripOverviewSectionDetails,
    updateTrip as updateTripApi
} from '../services/api-trip';
import type { UpdateTripREQ } from '../services/types';

// Trip
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
        mutationFn: (data: { tripId: number; updateTripReq: UpdateTripREQ }) =>
            updateTripApi(data.tripId, data.updateTripReq),
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

// Trip Overview Section
export function useTripOverviewSectionDetails(tripId: number, sectionId: number) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['trip-overview-section', { tripId, sectionId }],
        queryFn: () => getTripOverviewSectionDetails(tripId, sectionId),
        retry: false
    });
    if (error) {
        console.log('error', error);
    }

    return { isLoading, tripOverviewSection: data, error };
}

// Note
