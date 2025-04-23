import authAxios from '../utils/axios';
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
    CreateTripREQ,
    CreateTripTransitREQ,
    TransitType,
    UpdateCheckListItemREQ,
    UpdateCheckListREQ,
    UpdateNoteREQ,
    UpdatePlaceToVisitREQ,
    UpdateTripBudgetREQ,
    UpdateTripCruiseREQ,
    UpdateTripExpenseREQ,
    UpdateTripFlightREQ,
    UpdateTripLodgingREQ,
    UpdateTripOverviewSectionREQ,
    UpdateTripREQ,
    UpdateTripTransitREQ
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

/* TRIP OVERVIEW */
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
export async function getPlaceToVisitDetailsOverview(tripId: number, sectionId: number, placeToVisitId: number) {
    const data = await authAxios
        .get(`/trips/${tripId}/overview-sections/${sectionId}/places/${placeToVisitId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function createPlaceToVisitOverview(
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

export async function updatePlaceToVisitOverview(
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

export async function deletePlaceToVisitOverview(tripId: number, sectionId: number, placeToVisitId: number) {
    await authAxios
        .delete(`/trips/${tripId}/overview-sections/${sectionId}/places/${placeToVisitId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

// Note
export async function createNoteOverview(tripId: number, sectionId: number, createNoteReq: CreateNoteREQ) {
    const data = await authAxios
        .post(`/trips/${tripId}/overview-sections/${sectionId}/notes`, createNoteReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updateNoteOverview(
    tripId: number,
    sectionId: number,
    noteId: number,
    updateNoteReq: UpdateNoteREQ
) {
    const data = await authAxios
        .patch(`/trips/${tripId}/overview-sections/${sectionId}/notes/${noteId}`, updateNoteReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function deleteNoteOverview(tripId: number, sectionId: number, noteId: number) {
    await authAxios
        .delete(`/trips/${tripId}/overview-sections/${sectionId}/notes/${noteId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

// Checklist
export async function createChecklistOverview(
    tripId: number,
    sectionId: number,
    createCheckListReq: CreateCheckListREQ
) {
    const data = await authAxios
        .post(`/trips/${tripId}/overview-sections/${sectionId}/checklists`, createCheckListReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updateChecklistOverview(
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

export async function deleteChecklistOverview(tripId: number, sectionId: number, checklistId: number) {
    await authAxios
        .delete(`/trips/${tripId}/overview-sections/${sectionId}/checklists/${checklistId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

// Checklist item
export async function createChecklistItemOverview(
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

export async function updateChecklistItemOverview(
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

export async function deleteChecklistItemOverview(
    tripId: number,
    sectionId: number,
    checklistId: number,
    itemId: number
) {
    await authAxios
        .delete(`/trips/${tripId}/overview-sections/${sectionId}/checklists/${checklistId}/items/${itemId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

// Flights
export async function createTripFlight(tripId: number, createTripFlightReq: CreateTripFlightREQ) {
    const data = await authAxios
        .post(`/trips/${tripId}/flights`, createTripFlightReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function verifyFLightEmailForwarded(tripId: number) {
    const data = await authAxios
        .post(`/trips/${tripId}/flights/verify-forwarded-email`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updateTripFlight(tripId: number, flightId: number, updateTripFlightReq: UpdateTripFlightREQ) {
    const data = await authAxios
        .patch(`/trips/${tripId}/flights/${flightId}`, updateTripFlightReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function deleteTripFlight(tripId: number, flightId: number) {
    await authAxios
        .delete(`/trips/${tripId}/flights/${flightId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

// Transits
export async function createTripTransit(tripId: number, createTripTransitReq: CreateTripTransitREQ) {
    const data = await authAxios
        .post(`/trips/${tripId}/transits`, createTripTransitReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function verifyTransitEmailForwarded(tripId: number, transitType: TransitType) {
    const data = await authAxios
        .post(`/trips/${tripId}/transits/verify-forwarded-email?transitType=${transitType}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updateTripTransit(tripId: number, transitId: number, updateTripTransitReq: UpdateTripTransitREQ) {
    const data = await authAxios
        .patch(`/trips/${tripId}/transits/${transitId}`, updateTripTransitReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function deleteTripTransit(tripId: number, transitId: number) {
    await authAxios
        .delete(`/trips/${tripId}/transits/${transitId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

// Cruises
export async function createTripCruise(tripId: number, createTripCruiseReq: CreateTripCruiseREQ) {
    const data = await authAxios
        .post(`/trips/${tripId}/cruises`, createTripCruiseReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function verifyCruiseEmailForwarded(tripId: number) {
    const data = await authAxios
        .post(`/trips/${tripId}/cruises/verify-forwarded-email`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updateTripCruise(tripId: number, cruiseId: number, updateTripCruiseReq: UpdateTripCruiseREQ) {
    const data = await authAxios
        .patch(`/trips/${tripId}/cruises/${cruiseId}`, updateTripCruiseReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function deleteTripCruise(tripId: number, cruiseId: number) {
    await authAxios
        .delete(`/trips/${tripId}/cruises/${cruiseId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

// Lodging
export async function createTripLodging(tripId: number, createTripLodgingReq: CreateTripLodgingREQ) {
    const data = await authAxios
        .post(`/trips/${tripId}/lodgings`, createTripLodgingReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function verifyLodgingEmailForwarded(tripId: number) {
    const data = await authAxios
        .post(`/trips/${tripId}/lodgings/verify-forwarded-email`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updateTripLodging(tripId: number, lodgingId: number, updateTripLodgingReq: UpdateTripLodgingREQ) {
    const data = await authAxios
        .patch(`/trips/${tripId}/lodgings/${lodgingId}`, updateTripLodgingReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function deleteTripLodging(tripId: number, lodgingId: number) {
    await authAxios
        .delete(`/trips/${tripId}/lodgings/${lodgingId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

/* TRIP ITINERARY */
// Trip Overview Section
export async function getTripItineraryDayDetails(tripId: number, dayId: number) {
    const data = await authAxios
        .get(`/trips/${tripId}/itineraries/${dayId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updateTripItineraryDay(
    tripId: number,
    dayId: number,
    updateTripOverviewSectionReq: UpdateTripOverviewSectionREQ
) {
    const data = await authAxios
        .patch(`/trips/${tripId}/itineraries/${dayId}`, updateTripOverviewSectionReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function deleteTripItineraryDay(tripId: number, dayId: number) {
    await authAxios
        .delete(`/trips/${tripId}/itineraries/${dayId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

// Place to visit
export async function getPlaceToVisitDetailsItinerary(tripId: number, dayId: number, placeToVisitId: number) {
    const data = await authAxios
        .get(`/trips/${tripId}/itineraries/${dayId}/places/${placeToVisitId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function createPlaceToVisitItinerary(
    tripId: number,
    dayId: number,
    createPlaceToVisitReq: CreatePlaceToVisitREQ
) {
    const data = await authAxios
        .post(`/trips/${tripId}/itineraries/${dayId}/places`, createPlaceToVisitReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updatePlaceToVisitItinerary(
    tripId: number,
    dayId: number,
    placeToVisitId: number,
    updatePlaceToVisitReq: UpdatePlaceToVisitREQ
) {
    const data = await authAxios
        .patch(`/trips/${tripId}/itineraries/${dayId}/places/${placeToVisitId}`, updatePlaceToVisitReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function deletePlaceToVisitItinerary(tripId: number, dayId: number, placeToVisitId: number) {
    await authAxios
        .delete(`/trips/${tripId}/itineraries/${dayId}/places/${placeToVisitId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

// Note
export async function createNoteItinerary(tripId: number, dayId: number, createNoteReq: CreateNoteREQ) {
    const data = await authAxios
        .post(`/trips/${tripId}/itineraries/${dayId}/notes`, createNoteReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updateNoteItinerary(tripId: number, dayId: number, noteId: number, updateNoteReq: UpdateNoteREQ) {
    const data = await authAxios
        .patch(`/trips/${tripId}/itineraries/${dayId}/notes/${noteId}`, updateNoteReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function deleteNoteItinerary(tripId: number, dayId: number, noteId: number) {
    await authAxios
        .delete(`/trips/${tripId}/itineraries/${dayId}/notes/${noteId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

// Checklist
export async function createChecklistItinerary(tripId: number, dayId: number, createCheckListReq: CreateCheckListREQ) {
    const data = await authAxios
        .post(`/trips/${tripId}/itineraries/${dayId}/checklists`, createCheckListReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updateChecklistItinerary(
    tripId: number,
    dayId: number,
    checklistId: number,
    updateCheckListReq: UpdateCheckListREQ
) {
    const data = await authAxios
        .patch(`/trips/${tripId}/itineraries/${dayId}/checklists/${checklistId}`, updateCheckListReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function deleteChecklistItinerary(tripId: number, dayId: number, checklistId: number) {
    await authAxios
        .delete(`/trips/${tripId}/itineraries/${dayId}/checklists/${checklistId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

// Checklist item
export async function createChecklistItemItinerary(
    tripId: number,
    dayId: number,
    checklistId: number,
    createCheckListItemReq: CreateCheckListItemREQ
) {
    const data = await authAxios
        .post(`/trips/${tripId}/itineraries/${dayId}/checklists/${checklistId}/items`, createCheckListItemReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updateChecklistItemItinerary(
    tripId: number,
    dayId: number,
    checklistId: number,
    itemId: number,
    updateCheckListItemReq: UpdateCheckListItemREQ
) {
    const data = await authAxios
        .patch(
            `/trips/${tripId}/itineraries/${dayId}/checklists/${checklistId}/items/${itemId}`,
            updateCheckListItemReq
        )
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function deleteChecklistItemItinerary(tripId: number, dayId: number, checklistId: number, itemId: number) {
    await authAxios
        .delete(`/trips/${tripId}/overview-sections/${dayId}/checklists/${checklistId}/items/${itemId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

/* TRIP BUDGET */
// Trip Budget
export async function getTripBudgetDetails(tripId: number) {
    const data = await authAxios
        .get(`/trips/${tripId}/budget`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updateTripBudget(tripId: number, updateTripBudgetReq: UpdateTripBudgetREQ) {
    const data = await authAxios
        .patch(`/trips/${tripId}/budget`, updateTripBudgetReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

// Trip Budget Expense
export async function getTripExpenses(tripId: number, sortBy: string, sortOrder: string) {
    const data = await authAxios
        .get(`/trips/${tripId}/budget/expenses?sortBy=${sortBy}&sortOrder=${sortOrder}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function getTripExpenseDetails(tripId?: number, expenseId?: number) {
    const data = await authAxios
        .get(`/trips/${tripId}/budget/expenses/${expenseId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function createTripExpense(tripId: number, createTripExpenseReq: CreateTripExpenseREQ) {
    const data = await authAxios
        .post(`/trips/${tripId}/budget/expenses`, createTripExpenseReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function updateTripExpense(tripId: number, expenseId: number, updateTripExpenseReq: UpdateTripExpenseREQ) {
    const data = await authAxios
        .patch(`/trips/${tripId}/budget/expenses/${expenseId}`, updateTripExpenseReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function deleteTripExpense(tripId: number, expenseId: number) {
    await authAxios
        .delete(`/trips/${tripId}/budget/expenses/${expenseId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

// Trip Participants
export async function getTripParticipants(tripId: number) {
    const data = await authAxios
        .get(`/trips/${tripId}/participants`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function addTripParticipant(tripId: number, participants: AddTripParticipant[]) {
    const data = await authAxios
        .post(`/trips/${tripId}/participants`, { participants })
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function leaveTrip(tripId: number) {
    await authAxios
        .delete(`/trips/${tripId}/participants`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

export async function removeTripParticipant(tripId: number, participantId: number) {
    return authAxios
        .delete(`/trips/${tripId}/participants/${participantId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
}

// Autofill Trip Itinerary
export async function autofillTripItinerary(tripId: number, autofillItineraryReq: AutofillItineraryREQ) {
    const data = await authAxios
        .post(`/trips/${tripId}/itineraries/autofill-itinerary`, autofillItineraryReq)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}
