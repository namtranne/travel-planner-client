import authAxios from '../utils/axios';
import type {
    CreateCheckListItemREQ,
    CreateCheckListREQ,
    CreateNoteREQ,
    CreatePlaceToVisitREQ,
    CreateTripOverviewSectionREQ,
    CreateTripREQ,
    UpdateCheckListItemREQ,
    UpdateCheckListREQ,
    UpdateNoteREQ,
    UpdatePlaceToVisitREQ,
    UpdateTripOverviewSectionREQ,
    UpdateTripREQ
} from './types';

// Trip
export async function getMyTrips() {
    const data = await authAxios
        .get('/trips')
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function getTripDetails(tripId: number) {
    const data = await authAxios
        .get(`/trips/${tripId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function createTrip(createTripReq: CreateTripREQ) {
    const data = await authAxios
        .post('/trips', createTripReq)
        .then((response) => {
            return response.data.data;
        })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updateTrip(tripId: number, updateTripReq: UpdateTripREQ) {
    const data = await authAxios
        .patch(`/trips/${tripId}`, updateTripReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function deleteTrip(tripId: number) {
    await authAxios
        .delete(`/trips/${tripId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

// Trip Overview Section
export async function getTripOverviewSectionDetails(tripId: number, sectionId: number) {
    const data = await authAxios
        .get(`/trips/${tripId}/overview-sections/${sectionId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function createTripOverviewSection(
    tripId: number,
    createTripOverviewSectionReq: CreateTripOverviewSectionREQ
) {
    const data = await authAxios
        .post(`/trips/${tripId}/overview-sections`, createTripOverviewSectionReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updateTripOverviewSection(
    tripId: number,
    sectionId: number,
    updateTripOverviewSectionReq: UpdateTripOverviewSectionREQ
) {
    const data = await authAxios
        .patch(`/trips/${tripId}/overview-sections/${sectionId}`, updateTripOverviewSectionReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function deleteTripOverviewSection(tripId: number, sectionId: number) {
    await authAxios
        .delete(`/trips/${tripId}/overview-sections/${sectionId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

// Place to visit
export async function getPlaceToVisitDetails(tripId: number, sectionId: number, placeToVisitId: number) {
    const data = await authAxios
        .get(`/trips/${tripId}/overview-sections/${sectionId}/places/${placeToVisitId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function createPlaceToVisit(
    tripId: number,
    sectionId: number,
    createPlaceToVisitReq: CreatePlaceToVisitREQ
) {
    const data = await authAxios
        .post(`/trips/${tripId}/overview-sections/${sectionId}/places`, createPlaceToVisitReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updatePlaceToVisit(
    tripId: number,
    sectionId: number,
    placeToVisitId: number,
    updatePlaceToVisitReq: UpdatePlaceToVisitREQ
) {
    const data = await authAxios
        .patch(`/trips/${tripId}/overview-sections/${sectionId}/places/${placeToVisitId}`, updatePlaceToVisitReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function deletePlaceToVisit(tripId: number, sectionId: number, placeToVisitId: number) {
    await authAxios
        .delete(`/trips/${tripId}/overview-sections/${sectionId}/places/${placeToVisitId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

// Note
export async function createNote(tripId: number, sectionId: number, createNoteReq: CreateNoteREQ) {
    const data = await authAxios
        .post(`/trips/${tripId}/overview-sections/${sectionId}/notes`, createNoteReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updateNote(tripId: number, sectionId: number, noteId: number, updateNoteReq: UpdateNoteREQ) {
    const data = await authAxios
        .patch(`/trips/${tripId}/overview-sections/${sectionId}/notes/${noteId}`, updateNoteReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function deleteNote(tripId: number, sectionId: number, noteId: number) {
    await authAxios
        .delete(`/trips/${tripId}/overview-sections/${sectionId}/notes/${noteId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

// Checklist
export async function createChecklist(tripId: number, sectionId: number, createCheckListReq: CreateCheckListREQ) {
    const data = await authAxios
        .post(`/trips/${tripId}/overview-sections/${sectionId}/checklists`, createCheckListReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updateChecklist(
    tripId: number,
    sectionId: number,
    checklistId: number,
    updateCheckListReq: UpdateCheckListREQ
) {
    const data = await authAxios
        .patch(`/trips/${tripId}/overview-sections/${sectionId}/checklists/${checklistId}`, updateCheckListReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function deleteChecklist(tripId: number, sectionId: number, checklistId: number) {
    await authAxios
        .delete(`/trips/${tripId}/overview-sections/${sectionId}/checklists/${checklistId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

// Checklist item
export async function createChecklistItem(
    tripId: number,
    sectionId: number,
    checklistId: number,
    createCheckListItemReq: CreateCheckListItemREQ
) {
    const data = await authAxios
        .post(`/trips/${tripId}/overview-sections/${sectionId}/checklists/${checklistId}/items`, createCheckListItemReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updateChecklistItem(
    tripId: number,
    sectionId: number,
    checklistId: number,
    itemId: number,
    updateCheckListItemReq: UpdateCheckListItemREQ
) {
    const data = await authAxios
        .patch(
            `/trips/${tripId}/overview-sections/${sectionId}/checklists/${checklistId}/items/${itemId}`,
            updateCheckListItemReq
        )
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function deleteChecklistItem(tripId: number, sectionId: number, checklistId: number, itemId: number) {
    await authAxios
        .delete(`/trips/${tripId}/overview-sections/${sectionId}/checklists/${checklistId}/items/${itemId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}
