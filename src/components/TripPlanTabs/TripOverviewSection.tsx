import type React from 'react';
import { useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Iconify from 'react-native-iconify';
import Toast from 'react-native-toast-message';

import {
    useCreateChecklistItemOverview,
    useCreateChecklistOverview,
    useCreateNoteOverview,
    useDeleteChecklistItemOverview,
    useDeleteChecklistOverview,
    useDeleteNoteOverview,
    useDeletePlaceToVisitOverview,
    useDeleteTripCruise,
    useDeleteTripFlight,
    useDeleteTripLodging,
    useDeleteTripOverviewSection,
    useDeleteTripTransit,
    useTripOverviewSectionDetails,
    useUpdateChecklistItemOverview,
    useUpdateChecklistOverview,
    useUpdateNoteOverview,
    useUpdateTripOverviewSection
} from '@/src/hooks/use-trip';

import { AddReservationSheet } from './AddReservationSheet';
import Checklist from './Checklist';
import CruiseReservationCard from './CruiseReservationCard';
import FlightReservationCard from './FlightReservationCard';
import LodgingReservationCard from './LodgingReservationCard';
import Note from './Note';
import PlaceToVisitCard from './PlaceToVisitCard';
import SearchPlaceSheet from './SearchPlaceSheet';
import TransitReservationCard from './TransitReservationCard';

interface TripOverviewSectionProps {
    tripId: number;
    sectionId: number;
    titleSection: string;
    openSheet: () => void;
    // eslint-disable-next-line react/no-unused-prop-types
    closeSheet: () => void;
    setBottomSheetContent: (content: React.ReactNode) => void;
    setSnapPoints: (points: string[]) => void;
}

const TripOverviewSection = ({
    tripId,
    sectionId,
    titleSection,
    openSheet,
    closeSheet,
    setBottomSheetContent,
    setSnapPoints
}: TripOverviewSectionProps) => {
    const [expanded, setExpanded] = useState(false);
    const [title, setTitle] = useState(titleSection);
    const inputTitleRef = useRef<TextInput>(null);

    const { isLoading, tripOverviewSection } = useTripOverviewSectionDetails(tripId, sectionId);
    const { isPending: isPendingCreateNote, createNoteOverview } = useCreateNoteOverview();
    const { isPending: isPendingUpdateNote, updateNoteOverview } = useUpdateNoteOverview();
    const { isPending: isPendingDeleteNote, deleteNoteOverview } = useDeleteNoteOverview();
    const { isPending: isPendingCreateChecklist, createChecklistOverview } = useCreateChecklistOverview();
    const { isPending: isPendingUpdateChecklist, updateChecklistOverview } = useUpdateChecklistOverview();
    const { isPending: isPendingDeleteChecklist, deleteChecklistOverview } = useDeleteChecklistOverview();
    const { isPending: isPendingCreateChecklistItem, createChecklistItemOverview } = useCreateChecklistItemOverview();
    const { isPending: isPendingUpdateChecklistItem, updateChecklistItemOverview } = useUpdateChecklistItemOverview();
    const { isPending: isPendingDeleteChecklistItem, deleteChecklistItemOverview } = useDeleteChecklistItemOverview();
    const { isPending: isPendingDeletePlaceToVisit, deletePlaceToVisitOverview } = useDeletePlaceToVisitOverview();

    const { isPending: isPendingDeleteTripOverviewSection, deleteTripOverviewSection } = useDeleteTripOverviewSection();
    const { updateTripOverviewSection } = useUpdateTripOverviewSection();

    const { isPending: isPendingDeleteTripFlight, deleteTripFlight } = useDeleteTripFlight();
    const { isPending: isPendingDeleteTripCruise, deleteTripCruise } = useDeleteTripCruise();
    const { isPending: isPendingDeleteTripLodging, deleteTripLodging } = useDeleteTripLodging();
    const { isPending: isPendingDeleteTripTransit, deleteTripTransit } = useDeleteTripTransit();

    const options = useMemo(
        () => [
            {
                icon: 'mdi:pencil',
                label: 'Edit section heading',
                action: () => {
                    closeSheet();
                    setExpanded(true);
                    setTimeout(() => inputTitleRef.current?.focus(), 100);
                }
            },
            {
                icon: 'mdi:trash-can',
                label: 'Delete section',
                action: () => {
                    closeSheet();
                    deleteTripOverviewSection({ tripId, sectionId });
                },
                disabled: isPendingDeleteTripOverviewSection
            },
            { icon: 'mdi:dots-grid', label: 'Reorder sections', action: () => {} }
        ],
        [isPendingDeleteTripOverviewSection, deleteTripOverviewSection, sectionId, tripId, closeSheet]
    );

    const transitTypes = useMemo(
        () => [
            {
                icon: 'mdi:bus',
                label: 'Add Bus',
                action: () => {
                    setBottomSheetContent(<AddReservationSheet reservationType="Bus" tripId={tripId} />);
                    openSheet();
                    setSnapPoints(['70%']);
                },
                disabled: isPendingDeleteTripTransit
            },
            {
                icon: 'mdi:ferry',
                label: 'Add Ferry',
                action: () => {
                    setBottomSheetContent(<AddReservationSheet reservationType="Ferry" tripId={tripId} />);
                    openSheet();
                    setSnapPoints(['70%']);
                },
                disabled: isPendingDeleteTripTransit
            },
            {
                icon: 'mdi:train',
                label: 'Add Train',
                action: () => {
                    setBottomSheetContent(<AddReservationSheet reservationType="Train" tripId={tripId} />);
                    openSheet();
                    setSnapPoints(['70%']);
                },
                disabled: isPendingDeleteTripTransit
            }
        ],
        [openSheet, setBottomSheetContent, setSnapPoints, tripId, isPendingDeleteTripTransit]
    );

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#60ABEF" />
            </View>
        );
    }

    const renderRightActions = (id: any, itemType: String) => {
        return (
            <TouchableOpacity
                className="ml-4 w-20 items-center justify-center bg-red-500"
                onPress={() => {
                    if (itemType === 'note') deleteNoteOverview({ tripId, sectionId, noteId: id });
                    if (itemType === 'checklist') deleteChecklistOverview({ tripId, sectionId, checklistId: id });
                    if (itemType === 'place') deletePlaceToVisitOverview({ tripId, sectionId, placeToVisitId: id });
                    if (itemType === 'flight')
                        deleteTripFlight(
                            { tripId, tripOverviewSectionId: tripOverviewSection.id, flightId: id },
                            {
                                onSuccess: () =>
                                    Toast.show({
                                        type: 'success',
                                        text1: 'Flight Reservation Deleted',
                                        position: 'top'
                                    })
                            }
                        );
                    if (itemType === 'transit')
                        deleteTripTransit(
                            { tripId, tripOverviewSectionId: tripOverviewSection.id, transitId: id },
                            {
                                onSuccess: () =>
                                    Toast.show({
                                        type: 'success',
                                        text1: 'Transit Reservation Deleted',
                                        position: 'top'
                                    })
                            }
                        );
                    if (itemType === 'cruise')
                        deleteTripCruise(
                            { tripId, tripOverviewSectionId: tripOverviewSection.id, cruiseId: id },
                            {
                                onSuccess: () =>
                                    Toast.show({
                                        type: 'success',
                                        text1: 'Cruise Reservation Deleted',
                                        position: 'top'
                                    })
                            }
                        );
                    if (itemType === 'lodging')
                        deleteTripLodging(
                            { tripId, tripOverviewSectionId: tripOverviewSection.id, lodgingId: id },
                            {
                                onSuccess: () =>
                                    Toast.show({
                                        type: 'success',
                                        text1: 'Lodging Reservation Deleted',
                                        position: 'top'
                                    })
                            }
                        );
                }}
            >
                <Text className="font-bold text-white">Delete</Text>
            </TouchableOpacity>
        );
    };

    const renderActionButtons = () => {
        switch (tripOverviewSection?.sectionType) {
            case 'COMMON':
                return (
                    <View className="mt-2 flex-row items-center justify-between">
                        <TouchableOpacity
                            className="flex-1 flex-row items-center rounded-lg bg-gray-100 p-3"
                            onPress={() => {
                                setSnapPoints(['80%']);
                                setBottomSheetContent(
                                    <SearchPlaceSheet tripId={tripId} sectionId={sectionId} closeSheet={closeSheet} />
                                );
                                openSheet();
                            }}
                        >
                            <Iconify className="text-black" icon="mdi-light:map-marker" size={20} color="black" />
                            <Text className="ml-2 text-gray-500">Add a place</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="mx-2 rounded-lg bg-gray-100 p-3"
                            onPress={() =>
                                createNoteOverview({
                                    tripId,
                                    sectionId,
                                    createNoteReq: { content: 'Add your notes here' }
                                })
                            }
                            disabled={isPendingCreateNote || isPendingUpdateNote || isPendingDeleteNote}
                        >
                            <Iconify className="text-black" icon="mdi-light:note" size={20} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="rounded-lg bg-gray-100 p-3"
                            onPress={() =>
                                createChecklistOverview({
                                    tripId,
                                    sectionId,
                                    createCheckListReq: { title: 'Add a title' }
                                })
                            }
                            disabled={
                                isPendingCreateChecklist ||
                                isPendingUpdateChecklist ||
                                isPendingDeleteChecklist ||
                                isPendingCreateChecklistItem ||
                                isPendingUpdateChecklistItem ||
                                isPendingDeleteChecklistItem ||
                                isPendingDeletePlaceToVisit
                            }
                        >
                            <Iconify
                                className="text-black"
                                icon="material-symbols-light:checklist"
                                size={20}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                );
            case 'FLIGHT':
                return (
                    <TouchableOpacity
                        className="mt-3 flex-row items-center gap-x-2"
                        onPress={() => {
                            setBottomSheetContent(<AddReservationSheet reservationType="Flight" tripId={tripId} />);
                            openSheet();
                            setSnapPoints(['70%']);
                        }}
                        disabled={isPendingDeleteTripFlight}
                    >
                        <Iconify className="font-semibold text-gray-600" icon="ic:baseline-plus" size={20} />
                        <Text className="font-semibold text-gray-600">Add another flight</Text>
                    </TouchableOpacity>
                );
            case 'TRANSIT':
                return (
                    <TouchableOpacity
                        className="mt-3 flex-row items-center gap-x-2"
                        onPress={() => {
                            setBottomSheetContent(
                                <View className="rounded-t-3xl bg-white p-4">
                                    {transitTypes.map(({ icon, label, action, disabled }, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            className="flex-row items-center gap-2 p-3"
                                            onPress={() => action()}
                                            disabled={disabled}
                                        >
                                            <Iconify className="text-black" icon={icon} size={20} color="black" />
                                            <Text className="text-base">{label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            );
                            openSheet();
                            setSnapPoints(['40%']);
                        }}
                        disabled={isPendingDeleteTripTransit}
                    >
                        <Iconify className="font-semibold text-gray-600" icon="ic:baseline-plus" size={20} />
                        <Text className="font-semibold text-gray-600">Add another transit</Text>
                    </TouchableOpacity>
                );
            case 'CRUISE':
                return (
                    <TouchableOpacity
                        className="mt-3 flex-row items-center gap-x-2"
                        onPress={() => {
                            setBottomSheetContent(<AddReservationSheet reservationType="Cruise" tripId={tripId} />);
                            openSheet();
                            setSnapPoints(['70%']);
                        }}
                        disabled={isPendingDeleteTripCruise}
                    >
                        <Iconify className="font-semibold text-gray-600" icon="ic:baseline-plus" size={20} />
                        <Text className="font-semibold text-gray-600">Add another cruise</Text>
                    </TouchableOpacity>
                );
            case 'LODGING':
                return (
                    <TouchableOpacity
                        className="mt-3 flex-row items-center gap-x-2"
                        onPress={() => {
                            setBottomSheetContent(<AddReservationSheet reservationType="Lodging" tripId={tripId} />);
                            openSheet();
                            setSnapPoints(['70%']);
                        }}
                        disabled={isPendingDeleteTripLodging}
                    >
                        <Iconify className="font-semibold text-gray-600" icon="ic:baseline-plus" size={20} />
                        <Text className="font-semibold text-gray-600">Add another lodging</Text>
                    </TouchableOpacity>
                );
            default:
                return <View />;
        }
    };

    return (
        <View className="mb-4 rounded-lg bg-white p-4 pb-6 shadow">
            <View className="flex-row items-center justify-between gap-x-2">
                <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                    <Iconify
                        className="text-black"
                        icon={expanded ? 'mdi:chevron-down' : 'mdi:chevron-right'}
                        color="black"
                        size={36}
                    />
                </TouchableOpacity>
                <TextInput
                    ref={inputTitleRef}
                    value={title}
                    onChangeText={setTitle}
                    className="h-[60px] flex-1 rounded-lg p-2 text-lg font-semibold focus:bg-gray-200"
                    placeholder="Enter title"
                    style={{ textAlignVertical: 'top' }}
                    multiline
                    numberOfLines={1}
                    onFocus={() => setExpanded(true)}
                    onBlur={() =>
                        updateTripOverviewSection({ tripId, sectionId, updateTripOverviewSectionReq: { title } })
                    }
                />
                <TouchableOpacity
                    onPress={() => {
                        setSnapPoints(['40%']);
                        setBottomSheetContent(
                            <View className="rounded-t-3xl bg-white p-4">
                                {options.map(({ icon, label, action, disabled }, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        className="flex-row items-center gap-2 p-3"
                                        onPress={() => action()}
                                        disabled={disabled}
                                    >
                                        <Iconify className="text-black" icon={icon} size={20} color="black" />
                                        <Text className="text-base">{label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        );
                        openSheet();
                    }}
                >
                    <Iconify className="text-black" icon="bi:three-dots" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {expanded && (
                <View className="mt-2">
                    {/* Notes */}
                    {tripOverviewSection?.notes.map((note: any) => (
                        <Swipeable renderRightActions={() => renderRightActions(note.id, 'note')} key={note.id}>
                            <Note
                                initialNote={note.content}
                                handleUpdateNote={(updatedNote) =>
                                    updateNoteOverview({
                                        tripId,
                                        sectionId,
                                        noteId: note.id,
                                        updateNoteReq: { content: updatedNote }
                                    })
                                }
                                handleDeleteNote={() =>
                                    deleteNoteOverview(
                                        { tripId, sectionId, noteId: note.id },
                                        {
                                            onSuccess: () =>
                                                Alert.alert('Success', 'Note deleted.', [
                                                    {
                                                        text: 'OK'
                                                    }
                                                ])
                                        }
                                    )
                                }
                            />
                        </Swipeable>
                    ))}
                    {/* Checklists */}
                    {tripOverviewSection?.checkLists.map((checklist: any) => (
                        <Swipeable
                            renderRightActions={() => renderRightActions(checklist.id, 'checklist')}
                            key={checklist.id}
                        >
                            <Checklist
                                initialTitle={checklist.title}
                                items={checklist.items}
                                handleUpdateChecklist={(updatedTitle) =>
                                    updateChecklistOverview({
                                        tripId,
                                        sectionId,
                                        checklistId: checklist.id,
                                        updateCheckListReq: { title: updatedTitle }
                                    })
                                }
                                handleDeleteChecklist={() =>
                                    deleteChecklistOverview(
                                        { tripId, sectionId, checklistId: checklist.id },
                                        {
                                            onSuccess: () =>
                                                Alert.alert('Success', 'Checklist deleted.', [
                                                    {
                                                        text: 'OK'
                                                    }
                                                ])
                                        }
                                    )
                                }
                                handleCreateChecklistItem={() =>
                                    createChecklistItemOverview({
                                        tripId,
                                        sectionId,
                                        checklistId: checklist.id,
                                        createCheckListItemReq: { title: 'Add item title' }
                                    })
                                }
                                handleUpdateChecklistItem={(checklistItemId, itemTitle, isChecked) => {
                                    updateChecklistItemOverview({
                                        tripId,
                                        sectionId,
                                        checklistId: checklist.id,
                                        checklistItemId,
                                        updateCheckListItemReq: { title: itemTitle, isChecked }
                                    });
                                }}
                                handleDeleteChecklistItem={(checklistItemId) =>
                                    deleteChecklistItemOverview({
                                        tripId,
                                        sectionId,
                                        checklistId: checklist.id,
                                        checklistItemId
                                    })
                                }
                                key={checklist.id}
                            />
                        </Swipeable>
                    ))}
                    {/* Place to visits */}
                    {tripOverviewSection?.placeToVisits.map((placeToVisit: any, index: number) => (
                        <Swipeable
                            renderRightActions={() => renderRightActions(placeToVisit.id, 'place')}
                            key={placeToVisit.id}
                        >
                            <PlaceToVisitCard
                                key={placeToVisit.id}
                                tripId={tripId}
                                sectionId={placeToVisit.sectionId}
                                placeToVisitId={placeToVisit.id}
                                order={index + 1}
                                onDelete={() =>
                                    deletePlaceToVisitOverview({ tripId, sectionId, placeToVisitId: placeToVisit.id })
                                }
                            />
                        </Swipeable>
                    ))}

                    {/* Flight reservations */}
                    {tripOverviewSection?.flights.map((flight: any) => (
                        <Swipeable renderRightActions={() => renderRightActions(flight.id, 'flight')} key={flight.id}>
                            <FlightReservationCard
                                key={flight.id}
                                tripId={tripId}
                                flightReservationDetails={flight}
                                handleDeleteFlightReservation={() =>
                                    deleteTripFlight(
                                        { tripId, tripOverviewSectionId: tripOverviewSection.id, flightId: flight.id },
                                        {
                                            onSuccess: () =>
                                                Toast.show({
                                                    type: 'success',
                                                    text1: 'Flight Reservation Deleted',
                                                    position: 'top'
                                                })
                                        }
                                    )
                                }
                            />
                        </Swipeable>
                    ))}
                    {/* Transit reservations */}
                    {tripOverviewSection?.transits.map((transit: any) => (
                        <Swipeable
                            renderRightActions={() => renderRightActions(transit.id, 'transit')}
                            key={transit.id}
                        >
                            <TransitReservationCard
                                key={transit.id}
                                tripId={tripId}
                                transitReservationDetails={transit}
                                transitType={transit.transitType}
                                handleDeleteTransitReservation={() =>
                                    deleteTripTransit(
                                        {
                                            tripId,
                                            tripOverviewSectionId: tripOverviewSection.id,
                                            transitId: transit.id
                                        },
                                        {
                                            onSuccess: () =>
                                                Toast.show({
                                                    type: 'success',
                                                    text1: 'Transit Reservation Deleted',
                                                    position: 'top'
                                                })
                                        }
                                    )
                                }
                            />
                        </Swipeable>
                    ))}
                    {/* Cruise reservations */}
                    {tripOverviewSection?.cruises.map((cruise: any) => (
                        <Swipeable renderRightActions={() => renderRightActions(cruise.id, 'cruise')} key={cruise.id}>
                            <CruiseReservationCard
                                key={cruise.id}
                                tripId={tripId}
                                cruiseReservationDetails={cruise}
                                handleDeleteCruiseReservation={() =>
                                    deleteTripCruise(
                                        { tripId, tripOverviewSectionId: tripOverviewSection.id, cruiseId: cruise.id },
                                        {
                                            onSuccess: () =>
                                                Toast.show({
                                                    type: 'success',
                                                    text1: 'Cruise Reservation Deleted',
                                                    position: 'top'
                                                })
                                        }
                                    )
                                }
                            />
                        </Swipeable>
                    ))}
                    {/* Lodging reservations */}
                    {tripOverviewSection?.lodgings.map((lodging: any) => (
                        <Swipeable
                            renderRightActions={() => renderRightActions(lodging.id, 'lodging')}
                            key={lodging.id}
                        >
                            <LodgingReservationCard
                                key={lodging.id}
                                tripId={tripId}
                                lodgingReservationDetails={lodging}
                                handleDeleteLodgingReservation={() =>
                                    deleteTripLodging(
                                        {
                                            tripId,
                                            tripOverviewSectionId: tripOverviewSection.id,
                                            lodgingId: lodging.id
                                        },
                                        {
                                            onSuccess: () =>
                                                Toast.show({
                                                    type: 'success',
                                                    text1: 'Lodging Reservation Deleted',
                                                    position: 'top'
                                                })
                                        }
                                    )
                                }
                            />
                        </Swipeable>
                    ))}
                    {/* Render action buttons */}
                    {renderActionButtons()}
                </View>
            )}
        </View>
    );
};

export default TripOverviewSection;
