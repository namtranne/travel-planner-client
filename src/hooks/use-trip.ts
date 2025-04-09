import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    addTripParticipant as addTripParticipantApi,
    autofillTripItinerary as autofillTripItineraryApi,
    createChecklistItemItinerary as createChecklistItemItineraryApi,
    createChecklistItemOverview as createChecklistItemOverviewApi,
    createChecklistItinerary as createChecklistItineraryApi,
    createChecklistOverview as createChecklistOverviewApi,
    createNoteItinerary as createNoteItineraryApi,
    createNoteOverview as createNoteOverviewApi,
    createPlaceToVisitItinerary as createPlaceToVisitItineraryApi,
    createPlaceToVisitOverview as createPlaceToVisitOverviewApi,
    createTrip as createTripApi,
    createTripExpense as createTripExpenseApi,
    createTripOverviewSection as createTripOverviewSectionApi,
    deleteChecklistItemItinerary as deleteChecklistItemItineraryApi,
    deleteChecklistItemOverview as deleteChecklistItemOverviewApi,
    deleteChecklistItinerary as deleteChecklistItineraryApi,
    deleteChecklistOverview as deleteChecklistOverviewApi,
    deleteNoteItinerary as deleteNoteItineraryApi,
    deleteNoteOverview as deleteNoteOverviewApi,
    deletePlaceToVisitItinerary as deletePlaceToVisitItineraryApi,
    deletePlaceToVisitOverview as deletePlaceToVisitOverviewApi,
    deleteTrip as deleteTripApi,
    deleteTripExpense as deleteTripExpenseApi,
    deleteTripItineraryDay as deleteTripItineraryDayApi,
    deleteTripOverviewSection as deleteTripOverviewSectionApi,
    getMyTrips,
    getPlaceToVisitDetailsItinerary as getPlaceToVisitDetailsItineraryApi,
    getPlaceToVisitDetailsOverview as getPlaceToVisitDetailsOverviewApi,
    getTripBudgetDetails as getTripBudgetDetailsApi,
    getTripDetails,
    getTripExpenseDetails as getTripExpenseDetailsApi,
    getTripExpenses as getTripExpensesApi,
    getTripItineraryDayDetails as getTripItineraryDayDetailsApi,
    getTripOverviewSectionDetails,
    getTripParticipants as getTripParticipantsApi,
    leaveTrip as leaveTripApi,
    removeTripParticipant as removeTripParticipantApi,
    updateChecklistItemItinerary as updateChecklistItemItineraryApi,
    updateChecklistItemOverview as updateChecklistItemOverviewApi,
    updateChecklistItinerary as updateChecklistItineraryApi,
    updateChecklistOverview as updateChecklistOverviewApi,
    updateNoteItinerary as updateNoteItineraryApi,
    updateNoteOverview as updateNoteOverviewApi,
    updatePlaceToVisitItinerary as updatePlaceToVisitItineraryApi,
    updatePlaceToVisitOverview as updatePlaceToVisitOverviewApi,
    updateTrip as updateTripApi,
    updateTripBudget as updateTripBudgetApi,
    updateTripExpense as updateTripExpenseApi,
    updateTripItineraryDay as updateTripItineraryDayApi,
    updateTripOverviewSection as updateTripOverviewSectionApi
} from '../services/api-trip';
import type {
    AddTripParticipant,
    AutofillItineraryREQ,
    CreateCheckListItemREQ,
    CreateCheckListREQ,
    CreateNoteREQ,
    CreatePlaceToVisitREQ,
    CreateTripExpenseREQ,
    CreateTripOverviewSectionREQ,
    UpdateCheckListREQ,
    UpdateNoteREQ,
    UpdatePlaceToVisitREQ,
    UpdateTripBudgetREQ,
    UpdateTripExpenseREQ,
    UpdateTripItineraryDayREQ,
    UpdateTripOverviewSectionREQ,
    UpdateTripREQ
} from '../services/types';

// Trip
export function useMyTrips() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['trips'],
        queryFn: getMyTrips
    });
    if (error) {
        console.log('error', error);
    }

    return { isLoading, data, error };
}

export function useTripDetails(tripId: any) {
    const { data, isLoading, error } = useQuery({
        queryKey: [`trip-${tripId}`, tripId],
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
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['trips'] });
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
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
        mutationFn: (data: { tripId: number }) => deleteTripApi(data.tripId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['trips'] });
            queryClient.removeQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, deleteTrip, error };
}

// Trip Overview Section
export function useTripOverviewSectionDetails(tripId: number, sectionId: number) {
    const { data, isLoading, error } = useQuery({
        queryKey: [`trip-overview-section-${sectionId}`, { tripId, sectionId }],
        queryFn: () => getTripOverviewSectionDetails(tripId, sectionId)
    });
    if (error) {
        console.log('error', error);
    }

    return { isLoading, tripOverviewSection: data, error };
}

export function useCreateTripOverviewSection() {
    const queryClient = useQueryClient();

    const {
        mutate: createTripOverviewSection,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; createTripOverviewSectionReq: CreateTripOverviewSectionREQ }) =>
            createTripOverviewSectionApi(data.tripId, data.createTripOverviewSectionReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, createTripOverviewSection, error };
}

export function useUpdateTripOverviewSection() {
    const queryClient = useQueryClient();

    const {
        mutate: updateTripOverviewSection,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: {
            tripId: number;
            sectionId: number;
            updateTripOverviewSectionReq: UpdateTripOverviewSectionREQ;
        }) =>
            updateTripOverviewSectionApi(data.tripId, data.sectionId, {
                title: data.updateTripOverviewSectionReq.title
            }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, updateTripOverviewSection, error };
}

export function useDeleteTripOverviewSection() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteTripOverviewSection,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; sectionId: number }) =>
            deleteTripOverviewSectionApi(data.tripId, data.sectionId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
            queryClient.removeQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, deleteTripOverviewSection, error };
}

// Place to visit (Overview)
export function useGetPlaceToVisitDetailsOverview(tripId: number, sectionId: number, placeToVisitId: number) {
    const { data, isLoading, error } = useQuery({
        queryKey: [`place-to-visit-${placeToVisitId}`],
        queryFn: () => getPlaceToVisitDetailsOverviewApi(tripId, sectionId, placeToVisitId)
    });
    if (error) {
        console.log('error', error);
    }

    return { isLoading, data, error };
}

export function useCreatePlaceToVisitOverview() {
    const queryClient = useQueryClient();

    const {
        mutate: createPlaceToVisitOverview,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; sectionId: number; createPlaceToVisitReq: CreatePlaceToVisitREQ }) =>
            createPlaceToVisitOverviewApi(data.tripId, data.sectionId, data.createPlaceToVisitReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, createPlaceToVisitOverview, error };
}

export function useUpdatePlaceToVisitOverview() {
    const queryClient = useQueryClient();

    const {
        mutate: updatePlaceToVisitOverview,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: {
            tripId: number;
            sectionId: number;
            placeToVisitId: number;
            updatePlaceToVisitReq: UpdatePlaceToVisitREQ;
        }) =>
            updatePlaceToVisitOverviewApi(data.tripId, data.sectionId, data.placeToVisitId, data.updatePlaceToVisitReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, updatePlaceToVisitOverview, error };
}

export function useDeletePlaceToVisitOverview() {
    const queryClient = useQueryClient();

    const {
        mutate: deletePlaceToVisitOverview,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; sectionId: number; placeToVisitId: number }) =>
            deletePlaceToVisitOverviewApi(data.tripId, data.sectionId, data.placeToVisitId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, deletePlaceToVisitOverview, error };
}

// Note (Overview)
export function useCreateNoteOverview() {
    const queryClient = useQueryClient();

    const {
        mutate: createNoteOverview,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; sectionId: number; createNoteReq: CreateNoteREQ }) =>
            createNoteOverviewApi(data.tripId, data.sectionId, data.createNoteReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, createNoteOverview, error };
}

export function useUpdateNoteOverview() {
    const queryClient = useQueryClient();

    const {
        mutate: updateNoteOverview,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; sectionId: number; noteId: number; updateNoteReq: UpdateNoteREQ }) =>
            updateNoteOverviewApi(data.tripId, data.sectionId, data.noteId, data.updateNoteReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, updateNoteOverview, error };
}

export function useDeleteNoteOverview() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteNoteOverview,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; sectionId: number; noteId: number }) =>
            deleteNoteOverviewApi(data.tripId, data.sectionId, data.noteId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, deleteNoteOverview, error };
}

// Checklist (Overview)
export function useCreateChecklistOverview() {
    const queryClient = useQueryClient();

    const {
        mutate: createChecklistOverview,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; sectionId: number; createCheckListReq: CreateCheckListREQ }) =>
            createChecklistOverviewApi(data.tripId, data.sectionId, data.createCheckListReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, createChecklistOverview, error };
}

export function useUpdateChecklistOverview() {
    const queryClient = useQueryClient();

    const {
        mutate: updateChecklistOverview,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: {
            tripId: number;
            sectionId: number;
            checklistId: number;
            updateCheckListReq: UpdateCheckListREQ;
        }) => updateChecklistOverviewApi(data.tripId, data.sectionId, data.checklistId, data.updateCheckListReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, updateChecklistOverview, error };
}

export function useDeleteChecklistOverview() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteChecklistOverview,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; sectionId: number; checklistId: number }) =>
            deleteChecklistOverviewApi(data.tripId, data.sectionId, data.checklistId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, deleteChecklistOverview, error };
}

// Checklist Item (Overview)
export function useCreateChecklistItemOverview() {
    const queryClient = useQueryClient();

    const {
        mutate: createChecklistItemOverview,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: {
            tripId: number;
            sectionId: number;
            checklistId: number;
            createCheckListItemReq: CreateCheckListItemREQ;
        }) =>
            createChecklistItemOverviewApi(data.tripId, data.sectionId, data.checklistId, data.createCheckListItemReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, createChecklistItemOverview, error };
}

export function useUpdateChecklistItemOverview() {
    const queryClient = useQueryClient();

    const {
        mutate: updateChecklistItemOverview,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: {
            tripId: number;
            sectionId: number;
            checklistId: number;
            checklistItemId: number;
            updateCheckListItemReq: CreateCheckListItemREQ;
        }) =>
            updateChecklistItemOverviewApi(
                data.tripId,
                data.sectionId,
                data.checklistId,
                data.checklistItemId,
                data.updateCheckListItemReq
            ),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, updateChecklistItemOverview, error };
}

export function useDeleteChecklistItemOverview() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteChecklistItemOverview,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; sectionId: number; checklistId: number; checklistItemId: number }) =>
            deleteChecklistItemOverviewApi(data.tripId, data.sectionId, data.checklistId, data.checklistItemId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, deleteChecklistItemOverview, error };
}

// Trip Itinerary Day
export function useTripItineraryDayDetails(tripId: number, dayId: number) {
    const { data, isLoading, error } = useQuery({
        queryKey: [`trip-itinerary-day-${dayId}`, { tripId, dayId }],
        queryFn: () => getTripItineraryDayDetailsApi(tripId, dayId)
    });
    if (error) {
        console.log('error', error);
    }

    return { isLoading, tripItineraryDay: data, error };
}

export function useUpdateTripItineraryDay() {
    const queryClient = useQueryClient();

    const {
        mutate: updateTripItineraryDay,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; dayId: number; updateTripItineraryDayReq: UpdateTripItineraryDayREQ }) =>
            updateTripItineraryDayApi(data.tripId, data.dayId, data.updateTripItineraryDayReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-itinerary-day-${variables.dayId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, updateTripItineraryDay, error };
}

export function useDeleteTripItineraryDay() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteTripItineraryDay,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; dayId: number }) => deleteTripItineraryDayApi(data.tripId, data.dayId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-itinerary-day-${variables.dayId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, deleteTripItineraryDay, error };
}

// Place to visit (Itinerary)
export function useGetPlaceToVisitDetailsItinerary(tripId: number, dayId: number, placeToVisitId: number) {
    const { data, isLoading, error } = useQuery({
        queryKey: [`place-to-visit-${placeToVisitId}`],
        queryFn: () => getPlaceToVisitDetailsItineraryApi(tripId, dayId, placeToVisitId)
    });
    if (error) {
        console.log('error', error);
    }

    return { isLoading, data, error };
}

export function useCreatePlaceToVisitItinerary() {
    const queryClient = useQueryClient();

    const {
        mutate: createPlaceToVisitItinerary,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; dayId: number; createPlaceToVisitReq: CreatePlaceToVisitREQ }) =>
            createPlaceToVisitItineraryApi(data.tripId, data.dayId, data.createPlaceToVisitReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-itinerary-day-${variables.dayId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, createPlaceToVisitItinerary, error };
}

export function useUpdatePlaceToVisitItinerary() {
    const queryClient = useQueryClient();

    const {
        mutate: updatePlaceToVisitItinerary,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: {
            tripId: number;
            dayId: number;
            placeToVisitId: number;
            updatePlaceToVisitReq: UpdatePlaceToVisitREQ;
        }) => updatePlaceToVisitItineraryApi(data.tripId, data.dayId, data.placeToVisitId, data.updatePlaceToVisitReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-itinerary-day-${variables.dayId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, updatePlaceToVisitItinerary, error };
}

export function useDeletePlaceToVisitItinerary() {
    const queryClient = useQueryClient();

    const {
        mutate: deletePlaceToVisitItinerary,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; dayId: number; placeToVisitId: number }) =>
            deletePlaceToVisitItineraryApi(data.tripId, data.dayId, data.placeToVisitId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-itinerary-day-${variables.dayId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, deletePlaceToVisitItinerary, error };
}

// Note (Itinerary)
export function useCreateNoteItinerary() {
    const queryClient = useQueryClient();

    const {
        mutate: createNoteItinerary,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; dayId: number; createNoteReq: CreateNoteREQ }) =>
            createNoteItineraryApi(data.tripId, data.dayId, data.createNoteReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-itinerary-day-${variables.dayId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, createNoteItinerary, error };
}

export function useUpdateNoteItinerary() {
    const queryClient = useQueryClient();

    const {
        mutate: updateNoteItinerary,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; dayId: number; noteId: number; updateNoteReq: UpdateNoteREQ }) =>
            updateNoteItineraryApi(data.tripId, data.dayId, data.noteId, data.updateNoteReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-itinerary-day-${variables.dayId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, updateNoteItinerary, error };
}

export function useDeleteNoteItinerary() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteNoteItinerary,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; dayId: number; noteId: number }) =>
            deleteNoteItineraryApi(data.tripId, data.dayId, data.noteId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-itinerary-day-${variables.dayId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, deleteNoteItinerary, error };
}

// Checklist (Itinerary)
export function useCreateChecklistItinerary() {
    const queryClient = useQueryClient();

    const {
        mutate: createChecklistItinerary,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; dayId: number; createCheckListReq: CreateCheckListREQ }) =>
            createChecklistItineraryApi(data.tripId, data.dayId, data.createCheckListReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-itinerary-day-${variables.dayId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, createChecklistItinerary, error };
}

export function useUpdateChecklistItinerary() {
    const queryClient = useQueryClient();

    const {
        mutate: updateChecklistItinerary,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: {
            tripId: number;
            dayId: number;
            checklistId: number;
            updateCheckListReq: UpdateCheckListREQ;
        }) => updateChecklistItineraryApi(data.tripId, data.dayId, data.checklistId, data.updateCheckListReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-itinerary-day-${variables.dayId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, updateChecklistItinerary, error };
}

export function useDeleteChecklistItinerary() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteChecklistItinerary,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; dayId: number; checklistId: number }) =>
            deleteChecklistItineraryApi(data.tripId, data.dayId, data.checklistId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-itinerary-day-${variables.dayId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, deleteChecklistItinerary, error };
}

// Checklist Item (Itinerary)
export function useCreateChecklistItemItinerary() {
    const queryClient = useQueryClient();

    const {
        mutate: createChecklistItemItinerary,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: {
            tripId: number;
            dayId: number;
            checklistId: number;
            createCheckListItemReq: CreateCheckListItemREQ;
        }) => createChecklistItemItineraryApi(data.tripId, data.dayId, data.checklistId, data.createCheckListItemReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-itinerary-day-${variables.dayId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, createChecklistItemItinerary, error };
}

export function useUpdateChecklistItemItinerary() {
    const queryClient = useQueryClient();

    const {
        mutate: updateChecklistItemItinerary,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: {
            tripId: number;
            dayId: number;
            checklistId: number;
            checklistItemId: number;
            updateCheckListItemReq: CreateCheckListItemREQ;
        }) =>
            updateChecklistItemItineraryApi(
                data.tripId,
                data.dayId,
                data.checklistId,
                data.checklistItemId,
                data.updateCheckListItemReq
            ),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-itinerary-day-${variables.dayId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, updateChecklistItemItinerary, error };
}

export function useDeleteChecklistItemItinerary() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteChecklistItemItinerary,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; dayId: number; checklistId: number; checklistItemId: number }) =>
            deleteChecklistItemItineraryApi(data.tripId, data.dayId, data.checklistId, data.checklistItemId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-itinerary-day-${variables.dayId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, deleteChecklistItemItinerary, error };
}

/* TRIP BUDGET */
// Trip Budget
export function useTripBudgetDetails(tripId: number) {
    const { data, isLoading, error } = useQuery({
        queryKey: [`trip-budget-${tripId}`, tripId],
        queryFn: () => getTripBudgetDetailsApi(tripId)
    });
    if (error) {
        console.log('error', error);
    }

    return { isLoading, tripBudget: data, error };
}

export function useUpdateTripBudget() {
    const queryClient = useQueryClient();

    const {
        mutate: updateTripBudget,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; updateTripBudgetReq: UpdateTripBudgetREQ }) =>
            updateTripBudgetApi(data.tripId, data.updateTripBudgetReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-budget-${variables.tripId}`] });
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, updateTripBudget, error };
}

// Trip Budget Expense
export function useTripExpenses(tripId: number, sortBy: string, sortOrder: string) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: [`trip-expenses-${tripId}`, tripId, sortBy, sortOrder],
        queryFn: () => getTripExpensesApi(tripId, sortBy, sortOrder)
    });
    if (error) {
        console.log('error', error);
    }

    return { isLoading, tripExpenses: data, error, refetch };
}

export function useTripExpenseDetails(tripId: number, expenseId: number) {
    const { data, isLoading, error } = useQuery({
        queryKey: [`trip-expense-${expenseId}`, tripId, expenseId],
        queryFn: () => getTripExpenseDetailsApi(tripId, expenseId),
        enabled: !!tripId && !!expenseId && expenseId !== -1
    });
    if (error) {
        console.log('error', error);
    }

    return { isLoading, tripExpense: data, error };
}

export function useCreateTripExpense() {
    const queryClient = useQueryClient();

    const {
        mutate: createTripExpense,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; createTripExpenseReq: CreateTripExpenseREQ }) =>
            createTripExpenseApi(data.tripId, data.createTripExpenseReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-expenses-${variables.tripId}`] });
            queryClient.invalidateQueries({ queryKey: [`trip-budget-${variables.tripId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, createTripExpense, error };
}

export function useUpdateTripExpense() {
    const queryClient = useQueryClient();

    const {
        mutate: updateTripExpense,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; expenseId: number; updateTripExpenseReq: UpdateTripExpenseREQ }) =>
            updateTripExpenseApi(data.tripId, data.expenseId, data.updateTripExpenseReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-expenses-${variables.tripId}`] });
            queryClient.invalidateQueries({ queryKey: [`trip-budget-${variables.tripId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, updateTripExpense, error };
}

export function useDeleteTripExpense() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteTripExpense,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; expenseId: number }) => deleteTripExpenseApi(data.tripId, data.expenseId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-expenses-${variables.tripId}`] });
            queryClient.invalidateQueries({ queryKey: [`trip-budget-${variables.tripId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, deleteTripExpense, error };
}

// Trip Participants
export function useGetTripParticipants(tripId: number) {
    const { data, isLoading, error } = useQuery({
        queryKey: [`trip-participants-${tripId}`, tripId],
        queryFn: () => getTripParticipantsApi(tripId)
    });
    if (error) {
        console.log('error', error);
    }

    return { isLoading, tripParticipants: data, error };
}

export function useAddTripParticipant() {
    const queryClient = useQueryClient();
    const {
        mutate: addTripParticipant,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; participants: AddTripParticipant[] }) =>
            addTripParticipantApi(data.tripId, data.participants),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
            queryClient.invalidateQueries({ queryKey: [`trip-participants-${variables.tripId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, addTripParticipant, error };
}

export function useLeaveTrip() {
    const queryClient = useQueryClient();
    const {
        mutate: leaveTrip,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number }) => leaveTripApi(data.tripId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
            queryClient.invalidateQueries({ queryKey: [`trip-participants-${variables.tripId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, leaveTrip, error };
}

export function useRemoveTripParticipant() {
    const queryClient = useQueryClient();
    const {
        mutate: removeTripParticipant,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; participantId: number }) =>
            removeTripParticipantApi(data.tripId, data.participantId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
            queryClient.invalidateQueries({ queryKey: [`trip-participants-${variables.tripId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, removeTripParticipant, error };
}

// Autofill Trip Itinerary
export function useAutofillTripItinerary() {
    const queryClient = useQueryClient();

    const {
        mutate: autofillTripItinerary,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; autofillItineraryReq: AutofillItineraryREQ }) =>
            autofillTripItineraryApi(data.tripId, data.autofillItineraryReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, autofillTripItinerary, error };
}
