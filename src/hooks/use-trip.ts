import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    createChecklist as createChecklistApi,
    createChecklistItem as createChecklistItemApi,
    createNote as createNoteApi,
    createTrip as createTripApi,
    createTripOverviewSection as createTripOverviewSectionApi,
    deleteChecklist as deleteChecklistApi,
    deleteChecklistItem as deleteChecklistItemApi,
    deleteNote as deleteNoteApi,
    deleteTrip as deleteTripApi,
    deleteTripOverviewSection as deleteTripOverviewSectionApi,
    getMyTrips,
    getTripDetails,
    getTripOverviewSectionDetails,
    updateChecklist as updateChecklistApi,
    updateChecklistItem as updateChecklistItemApi,
    updateNote as updateNoteApi,
    updateTrip as updateTripApi,
    updateTripOverviewSection as updateTripOverviewSectionApi
} from '../services/api-trip';
import type {
    CreateCheckListItemREQ,
    CreateCheckListREQ,
    CreateNoteREQ,
    CreateTripOverviewSectionREQ,
    UpdateCheckListREQ,
    UpdateNoteREQ,
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

// Note
export function useCreateNote() {
    const queryClient = useQueryClient();

    const {
        mutate: createNote,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; sectionId: number; createNoteReq: CreateNoteREQ }) =>
            createNoteApi(data.tripId, data.sectionId, data.createNoteReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, createNote, error };
}

export function useUpdateNote() {
    const queryClient = useQueryClient();

    const {
        mutate: updateNote,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; sectionId: number; noteId: number; updateNoteReq: UpdateNoteREQ }) =>
            updateNoteApi(data.tripId, data.sectionId, data.noteId, data.updateNoteReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, updateNote, error };
}

export function useDeleteNote() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteNote,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; sectionId: number; noteId: number }) =>
            deleteNoteApi(data.tripId, data.sectionId, data.noteId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, deleteNote, error };
}

// Checklist
export function useCreateChecklist() {
    const queryClient = useQueryClient();

    const {
        mutate: createChecklist,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; sectionId: number; createCheckListReq: CreateCheckListREQ }) =>
            createChecklistApi(data.tripId, data.sectionId, data.createCheckListReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, createChecklist, error };
}

export function useUpdateChecklist() {
    const queryClient = useQueryClient();

    const {
        mutate: updateChecklist,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: {
            tripId: number;
            sectionId: number;
            checklistId: number;
            updateCheckListReq: UpdateCheckListREQ;
        }) => updateChecklistApi(data.tripId, data.sectionId, data.checklistId, data.updateCheckListReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, updateChecklist, error };
}

export function useDeleteChecklist() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteChecklist,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; sectionId: number; checklistId: number }) =>
            deleteChecklistApi(data.tripId, data.sectionId, data.checklistId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, deleteChecklist, error };
}

// Checklist Item
export function useCreateChecklistItem() {
    const queryClient = useQueryClient();

    const {
        mutate: createChecklistItem,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: {
            tripId: number;
            sectionId: number;
            checklistId: number;
            createCheckListItemReq: CreateCheckListItemREQ;
        }) => createChecklistItemApi(data.tripId, data.sectionId, data.checklistId, data.createCheckListItemReq),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, createChecklistItem, error };
}

export function useUpdateChecklistItem() {
    const queryClient = useQueryClient();

    const {
        mutate: updateChecklistItem,
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
            updateChecklistItemApi(
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

    return { isPending, updateChecklistItem, error };
}

export function useDeleteChecklistItem() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteChecklistItem,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { tripId: number; sectionId: number; checklistId: number; checklistItemId: number }) =>
            deleteChecklistItemApi(data.tripId, data.sectionId, data.checklistId, data.checklistItemId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`trip-overview-section-${variables.sectionId}`] });
        },
        onError: (err) => console.error(err.message)
    });

    return { isPending, deleteChecklistItem, error };
}
