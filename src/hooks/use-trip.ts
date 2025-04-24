import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

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
    createTripCruise as createTripCruiseApi,
    createTripExpense as createTripExpenseApi,
    createTripExpenseFromInvoice as createTripExpenseFromInvoiceApi,
    createTripFlight as createTripFlightApi,
    createTripLodging as createTripLodgingApi,
    createTripOverviewSection as createTripOverviewSectionApi,
    createTripTransit as createTripTransitApi,
    deleteChecklistItemItinerary as deleteChecklistItemItineraryApi,
    deleteChecklistItemOverview as deleteChecklistItemOverviewApi,
    deleteChecklistItinerary as deleteChecklistItineraryApi,
    deleteChecklistOverview as deleteChecklistOverviewApi,
    deleteNoteItinerary as deleteNoteItineraryApi,
    deleteNoteOverview as deleteNoteOverviewApi,
    deletePlaceToVisitItinerary as deletePlaceToVisitItineraryApi,
    deletePlaceToVisitOverview as deletePlaceToVisitOverviewApi,
    deleteTrip as deleteTripApi,
    deleteTripCruise as deleteTripCruiseApi,
    deleteTripExpense as deleteTripExpenseApi,
    deleteTripFlight as deleteTripFlightApi,
    deleteTripItineraryDay as deleteTripItineraryDayApi,
    deleteTripLodging as deleteTripLodgingApi,
    deleteTripOverviewSection as deleteTripOverviewSectionApi,
    deleteTripTransit as deleteTripTransitApi,
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
    updateTripCruise as updateTripCruiseApi,
    updateTripExpense as updateTripExpenseApi,
    updateTripFlight as updateTripFlightApi,
    updateTripItineraryDay as updateTripItineraryDayApi,
    updateTripLodging as updateTripLodgingApi,
    updateTripOverviewSection as updateTripOverviewSectionApi,
    updateTripTransit as updateTripTransitApi,
    verifyCruiseEmailForwarded as verifyCruiseEmailForwardedApi,
    verifyFLightEmailForwarded as verifyFLightEmailForwardedApi,
    verifyLodgingEmailForwarded as verifyLodgingEmailForwardedApi,
    verifyTransitEmailForwarded as verifyTransitEmailForwardedApi
} from '../services/api-trip';
import type {
    AddTripParticipant,
    AutofillItineraryREQ,
    CreateCheckListItemREQ,
    CreateCheckListREQ,
    CreateNoteREQ,
    CreatePlaceToVisitREQ,
    CreateTripCruiseREQ,
    CreateTripExpenseREQ,
    CreateTripFlightREQ,
    CreateTripLodgingREQ,
    CreateTripOverviewSectionREQ,
    CreateTripTransitREQ,
    TransitType,
    UpdateCheckListREQ,
    UpdateNoteREQ,
    UpdatePlaceToVisitREQ,
    UpdateTripBudgetREQ,
    UpdateTripCruiseREQ,
    UpdateTripExpenseREQ,
    UpdateTripFlightREQ,
    UpdateTripItineraryDayREQ,
    UpdateTripLodgingREQ,
    UpdateTripOverviewSectionREQ,
    UpdateTripREQ,
    UpdateTripTransitREQ
} from '../services/types';

// Trip
export function useMyTrips() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['trips'],
        queryFn: getMyTrips
    });
    if (error) {
        Toast.show({
            type: 'error',
            text1: 'Get trips failed',
            text2: error.message,
            text2Style: { flexWrap: 'wrap' },
            position: 'top'
        });
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
        Toast.show({
            type: 'error',
            text1: 'Get trip failed',
            text2: error.message,
            text2Style: { flexWrap: 'wrap' },
            position: 'top'
        });
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Create trip failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Update trip failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Delete trip failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        Toast.show({
            type: 'error',
            text1: 'Get trip overview section failed',
            text2: error.message,
            text2Style: { flexWrap: 'wrap' },
            position: 'top'
        });
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Create trip overview section failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Update trip overview section failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Delete trip overview section failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        Toast.show({
            type: 'error',
            text1: 'Get place to visit failed',
            text2: error.message,
            text2Style: { flexWrap: 'wrap' },
            position: 'top'
        });
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
            Toast.show({
                type: 'success',
                text1: 'Place Added',
                text2: 'The place was added to your overview 🎉',
                position: 'top'
            });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Create place to visit failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Update place to visit failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Delete place to visit failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Create note failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Update note failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Delete note failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Create checklist failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Update checklist failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Delete checklist failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Create checklist item failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Update checklist item failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Delete checklist item failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, deleteChecklistItemOverview, error };
}

// Flights
export function useCreateTripFlight() {
    const queryClient = useQueryClient();

    const {
        mutate: createTripFlight,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; createTripFlightReq: CreateTripFlightREQ }) =>
            createTripFlightApi(data.tripId, data.createTripFlightReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey.some((key) => typeof key === 'string' && key.includes('trip-overview-section'))
            });
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Create flight reservation failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, createTripFlight, error };
}

export function useVerifyFlightEmailForwarded() {
    const queryClient = useQueryClient();

    const {
        mutate: verifyFlightEmailForwarded,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number }) => verifyFLightEmailForwardedApi(data.tripId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey.some((key) => typeof key === 'string' && key.includes('trip-overview-section'))
            });
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Verify flight email failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, verifyFlightEmailForwarded, error };
}

export function useUpdateTripFlight() {
    const queryClient = useQueryClient();

    const {
        mutate: updateTripFlight,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; flightId: number; updateTripFlightReq: UpdateTripFlightREQ }) =>
            updateTripFlightApi(data.tripId, data.flightId, data.updateTripFlightReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Update flight reservation failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, updateTripFlight, error };
}

export function useDeleteTripFlight() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteTripFlight,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; tripOverviewSectionId: number; flightId: number }) =>
            deleteTripFlightApi(data.tripId, data.flightId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.tripOverviewSectionId}`] });
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Delete flight reservation failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, deleteTripFlight, error };
}

// Transits
export function useCreateTripTransit() {
    const queryClient = useQueryClient();

    const {
        mutate: createTripTransit,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; createTripTransitReq: CreateTripTransitREQ }) =>
            createTripTransitApi(data.tripId, data.createTripTransitReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey.some((key) => typeof key === 'string' && key.includes('trip-overview-section'))
            });
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Create transit reservation failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, createTripTransit, error };
}

export function useVerifyTransitEmailForwarded() {
    const queryClient = useQueryClient();

    const {
        mutate: verifyTransitEmailForwarded,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; transitType: TransitType }) =>
            verifyTransitEmailForwardedApi(data.tripId, data.transitType),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Verify transit email failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, verifyTransitEmailForwarded, error };
}

export function useUpdateTripTransit() {
    const queryClient = useQueryClient();

    const {
        mutate: updateTripTransit,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; transitId: number; updateTripTransitReq: UpdateTripTransitREQ }) =>
            updateTripTransitApi(data.tripId, data.transitId, data.updateTripTransitReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Update transit reservation failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, updateTripTransit, error };
}

export function useDeleteTripTransit() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteTripTransit,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; tripOverviewSectionId: number; transitId: number }) =>
            deleteTripTransitApi(data.tripId, data.transitId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.tripOverviewSectionId}`] });
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Delete transit reservation failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, deleteTripTransit, error };
}

// Cruises
export function useCreateTripCruise() {
    const queryClient = useQueryClient();

    const {
        mutate: createTripCruise,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; createTripCruiseReq: CreateTripCruiseREQ }) =>
            createTripCruiseApi(data.tripId, data.createTripCruiseReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey.some((key) => typeof key === 'string' && key.includes('trip-overview-section'))
            });
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Create cruise reservation failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, createTripCruise, error };
}

export function useVerifyCruiseEmailForwarded() {
    const queryClient = useQueryClient();

    const {
        mutate: verifyCruiseEmailForwarded,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number }) => verifyCruiseEmailForwardedApi(data.tripId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Verify cruise email failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, verifyCruiseEmailForwarded, error };
}

export function useUpdateTripCruise() {
    const queryClient = useQueryClient();

    const {
        mutate: updateTripCruise,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; cruiseId: number; updateTripCruiseReq: UpdateTripCruiseREQ }) =>
            updateTripCruiseApi(data.tripId, data.cruiseId, data.updateTripCruiseReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Update cruise reservation failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, updateTripCruise, error };
}

export function useDeleteTripCruise() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteTripCruise,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; tripOverviewSectionId: number; cruiseId: number }) =>
            deleteTripCruiseApi(data.tripId, data.cruiseId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.tripOverviewSectionId}`] });
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Delete cruise reservation failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, deleteTripCruise, error };
}

// Lodging
export function useCreateTripLodging() {
    const queryClient = useQueryClient();

    const {
        mutate: createTripLodging,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; createTripLodgingReq: CreateTripLodgingREQ }) =>
            createTripLodgingApi(data.tripId, data.createTripLodgingReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey.some((key) => typeof key === 'string' && key.includes('trip-overview-section'))
            });
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Create lodging reservation failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, createTripLodging, error };
}

export function useVerifyLodgingEmailForwarded() {
    const queryClient = useQueryClient();

    const {
        mutate: verifyLodgingEmailForwarded,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number }) => verifyLodgingEmailForwardedApi(data.tripId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Verify lodging email failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, verifyLodgingEmailForwarded, error };
}

export function useUpdateTripLodging() {
    const queryClient = useQueryClient();

    const {
        mutate: updateTripLodging,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; lodgingId: number; updateTripLodgingReq: UpdateTripLodgingREQ }) =>
            updateTripLodgingApi(data.tripId, data.lodgingId, data.updateTripLodgingReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Update lodging reservation failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, updateTripLodging, error };
}

export function useDeleteTripLodging() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteTripLodging,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; tripOverviewSectionId: number; lodgingId: number }) =>
            deleteTripLodgingApi(data.tripId, data.lodgingId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.tripOverviewSectionId}`] });
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Delete lodging reservation failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, deleteTripLodging, error };
}

// Trip Itinerary Day
export function useTripItineraryDayDetails(tripId: number, dayId: number) {
    const { data, isLoading, error } = useQuery({
        queryKey: [`trip-itinerary-day-${dayId}`, { tripId, dayId }],
        queryFn: () => getTripItineraryDayDetailsApi(tripId, dayId)
    });
    if (error) {
        Toast.show({
            type: 'error',
            text1: 'Get trip itinerary day failed',
            text2: error.message,
            text2Style: { flexWrap: 'wrap' },
            position: 'top'
        });
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Delete trip itinerary day failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Delete trip itinerary day failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        Toast.show({
            type: 'error',
            text1: 'Get place to visit failed',
            text2: error.message,
            text2Style: { flexWrap: 'wrap' },
            position: 'top'
        });
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
            Toast.show({
                type: 'success',
                text1: 'Place Added',
                text2: 'The place was added to your itinerary ✅',
                position: 'top'
            });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Create place to visit failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Update place to visit failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Delete place to visit failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Create note failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Update note failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Delete note failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Create checklist failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Update checklist failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Delete checklist item failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Create checklist item failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Update checklist item failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Delete checklist item failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        Toast.show({
            type: 'error',
            text1: 'Get trip budget failed',
            text2: error.message,
            text2Style: { flexWrap: 'wrap' },
            position: 'top'
        });
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
            queryClient.invalidateQueries({ queryKey: [`trip-expenses-${variables.tripId}`] });
            queryClient.invalidateQueries({ queryKey: [`trip-${variables.tripId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Update trip expense failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
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
        Toast.show({
            type: 'error',
            text1: 'Retrieve trip expenses failed',
            text2: error.message,
            text2Style: { flexWrap: 'wrap' },
            position: 'top'
        });
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
        Toast.show({
            type: 'error',
            text1: 'Retrieve trip expense failed',
            text2: error.message,
            text2Style: { flexWrap: 'wrap' },
            position: 'top'
        });
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
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Expense created failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            });
        }
    });

    return { isPending, createTripExpense, error };
}

export function useCreateTripExpenseFromInvoice() {
    const queryClient = useQueryClient();

    const {
        mutate: createTripExpenseFromInvoice,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; invoice: any }) =>
            createTripExpenseFromInvoiceApi(data.tripId, data.invoice),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-expenses-${variables.tripId}`] });
            queryClient.invalidateQueries({ queryKey: [`trip-budget-${variables.tripId}`] });
        },
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Expense created from invoice failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            });
        }
    });

    return { isPending, createTripExpenseFromInvoice, error };
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
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Expense updated failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            });
        }
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
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Expense deleted failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            });
        }
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
        Toast.show({
            type: 'error',
            text1: 'Get tripmates failed',
            text2: error.message,
            text2Style: { flexWrap: 'wrap' },
            position: 'top'
        });
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
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Tripmates added failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            });
        }
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
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Leave trip failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            });
        }
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
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Remove trip collaborator failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            });
        }
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
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Autofill trip itinerary failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            });
        }
    });

    return { isPending, autofillTripItinerary, error };
}
