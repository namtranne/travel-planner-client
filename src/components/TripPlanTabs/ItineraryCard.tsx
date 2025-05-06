import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { Swipeable, TextInput } from 'react-native-gesture-handler';
import Iconify from 'react-native-iconify';

import {
    useCreateChecklistItemItinerary,
    useCreateChecklistItinerary,
    useCreateNoteItinerary,
    useDeleteChecklistItemItinerary,
    useDeleteChecklistItinerary,
    useDeleteNoteItinerary,
    useDeletePlaceToVisitItinerary,
    useDeleteTripItineraryDay,
    useTripItineraryDayDetails,
    useUpdateChecklistItemItinerary,
    useUpdateChecklistItinerary,
    useUpdateNoteItinerary,
    useUpdateTripItineraryDay
} from '@/src/hooks/use-trip';

import Checklist from './Checklist';
import Note from './Note';
import PlaceToVisitCard from './PlaceToVisitCard';
import SearchPlaceSheet from './SearchPlaceSheet';

interface ItineraryCardProps {
    tripId: number;
    dayId: number;
    dayTitle: string;
    subHeading: string;
    openSheet: () => void;
    // eslint-disable-next-line react/no-unused-prop-types
    closeSheet: () => void;
    setBottomSheetContent: (content: React.ReactNode) => void;
    setSnapPoints: (points: string[]) => void;
}

const ItineraryCard = ({
    tripId,
    dayId,
    dayTitle,
    subHeading,
    openSheet,
    closeSheet,
    setBottomSheetContent,
    setSnapPoints
}: ItineraryCardProps) => {
    const { t } = useTranslation();
    const [subheading, setSubheading] = useState(subHeading);
    const [isFocused, setIsFocused] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const inputHeadingRef = useRef<TextInput>(null);

    const { isLoading, tripItineraryDay } = useTripItineraryDayDetails(tripId, dayId);

    const { isPending: isPendingUpdateTripItineraryDay, updateTripItineraryDay } = useUpdateTripItineraryDay();
    const { isPending: isPendingDeleteTripItineraryDay, deleteTripItineraryDay } = useDeleteTripItineraryDay();

    const { isPending: isPendingCreateNoteItinerary, createNoteItinerary } = useCreateNoteItinerary();
    const { isPending: isPendingUpdateNoteItinerary, updateNoteItinerary } = useUpdateNoteItinerary();
    const { isPending: isPendingDeleteNoteItinerary, deleteNoteItinerary } = useDeleteNoteItinerary();
    const { isPending: isPendingCreateChecklistItinerary, createChecklistItinerary } = useCreateChecklistItinerary();
    const { isPending: isPendingUpdateChecklistItinerary, updateChecklistItinerary } = useUpdateChecklistItinerary();
    const { isPending: isPendingDeleteChecklistItinerary, deleteChecklistItinerary } = useDeleteChecklistItinerary();
    const { isPending: isPendingCreateChecklistItemItinerary, createChecklistItemItinerary } =
        useCreateChecklistItemItinerary();
    const { isPending: isPendingUpdateChecklistItemItinerary, updateChecklistItemItinerary } =
        useUpdateChecklistItemItinerary();
    const { isPending: isPendingDeleteChecklistItemItinerary, deleteChecklistItemItinerary } =
        useDeleteChecklistItemItinerary();
    const { isPending: isPendingDeletePlaceToVisitItinerary, deletePlaceToVisitItinerary } =
        useDeletePlaceToVisitItinerary();
    const options = useMemo(
        () => [
            {
                icon: 'mdi:pencil',
                label: 'Edit section heading',
                action: () => {
                    closeSheet();
                    setExpanded(true);
                    setTimeout(() => inputHeadingRef.current?.focus(), 100);
                }
            },
            {
                icon: 'tabler:calendar-x',
                label: 'Delete day',
                action: () => {
                    closeSheet();
                    deleteTripItineraryDay({ tripId, dayId });
                },
                disabled: isPendingDeleteTripItineraryDay
            },
            { icon: 'mdi:dots-grid', label: 'Reorder sections', action: () => {} }
        ],
        [isPendingDeleteTripItineraryDay, deleteTripItineraryDay, tripId, dayId, closeSheet]
    );

    useEffect(() => {
        if (tripItineraryDay) setSubheading(tripItineraryDay.subHeading);
    }, [tripItineraryDay]);

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
                    if (itemType === 'note') deleteNoteItinerary({ tripId, dayId, noteId: id });
                    if (itemType === 'checklist') deleteChecklistItinerary({ tripId, dayId, checklistId: id });
                    if (itemType === 'place') deletePlaceToVisitItinerary({ tripId, dayId, placeToVisitId: id });
                }}
            >
                <Text className="font-bold text-white">Delete</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View className="my-4 bg-white p-4 shadow-md">
            {/* Header */}
            <View className="flex-row items-center justify-between space-x-2">
                <TouchableOpacity onPress={() => setExpanded(false)}>
                    <Text className="text-3xl font-bold">{dayTitle}</Text>
                </TouchableOpacity>
                <TextInput
                    ref={inputHeadingRef}
                    className={`flex-1 rounded-lg p-2 text-base text-gray-400 ${isFocused ? 'bg-gray-200' : 'bg-transparent'}`}
                    placeholder={t('Add subheading')}
                    value={subheading}
                    onChangeText={setSubheading}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        updateTripItineraryDay({
                            tripId,
                            dayId,
                            updateTripItineraryDayReq: { subHeading: subheading }
                        });
                        setIsFocused(false);
                    }}
                />
                {expanded ? (
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
                                            <Iconify icon={icon} size={20} color="black" />
                                            <Text className="text-base">{label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            );
                            openSheet();
                        }}
                    >
                        <Iconify icon="bi:three-dots" size={24} className="text-black" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => setExpanded(true)}>
                        <Iconify icon="mdi:chevron-down" size={24} className="text-black" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Actions */}
            <View className="mt-2 flex-row items-center space-x-4">
                <TouchableOpacity className="flex-row items-center">
                    <Iconify icon="mdi:magic-wand" width="18" height="18" className="font-semibold text-blue-600" />
                    <Text className="ml-1 rounded-lg font-semibold text-blue-600">{t('Auto-fill day')}</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center">
                    <Iconify icon="fa-solid:route" width="18" height="18" className="font-semibold text-blue-600" />
                    <Text className="ml-1 font-semibold text-blue-600">{t('Optimize route')}</Text>
                </TouchableOpacity>
            </View>
            {expanded && (
                <View className="my-2">
                    {/* Notes */}
                    {tripItineraryDay?.notes.map((note: any) => (
                        <Swipeable renderRightActions={() => renderRightActions(note.id, 'note')} key={note.id}>
                            <Note
                                initialNote={note.content}
                                handleUpdateNote={(updatedNote) =>
                                    updateNoteItinerary({
                                        tripId,
                                        dayId,
                                        noteId: note.id,
                                        updateNoteReq: { content: updatedNote }
                                    })
                                }
                                handleDeleteNote={() =>
                                    deleteNoteItinerary(
                                        { tripId, dayId, noteId: note.id },
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
                    {tripItineraryDay?.checkLists.map((checklist: any) => (
                        <Swipeable
                            renderRightActions={() => renderRightActions(checklist.id, 'checklist')}
                            key={checklist.id}
                        >
                            <Checklist
                                initialTitle={checklist.title}
                                items={checklist.items}
                                handleUpdateChecklist={(updatedTitle) =>
                                    updateChecklistItinerary({
                                        tripId,
                                        dayId,
                                        checklistId: checklist.id,
                                        updateCheckListReq: { title: updatedTitle }
                                    })
                                }
                                handleDeleteChecklist={() =>
                                    deleteChecklistItinerary(
                                        { tripId, dayId, checklistId: checklist.id },
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
                                    createChecklistItemItinerary({
                                        tripId,
                                        dayId,
                                        checklistId: checklist.id,
                                        createCheckListItemReq: { title: 'Add item title' }
                                    })
                                }
                                handleUpdateChecklistItem={(checklistItemId, itemTitle, isChecked) => {
                                    updateChecklistItemItinerary({
                                        tripId,
                                        dayId,
                                        checklistId: checklist.id,
                                        checklistItemId,
                                        updateCheckListItemReq: { title: itemTitle, isChecked }
                                    });
                                }}
                                handleDeleteChecklistItem={(checklistItemId) =>
                                    deleteChecklistItemItinerary({
                                        tripId,
                                        dayId,
                                        checklistId: checklist.id,
                                        checklistItemId
                                    })
                                }
                            />
                        </Swipeable>
                    ))}
                    {/* Place to visits */}
                    {tripItineraryDay?.placeToVisits.map((placeToVisit: any, index: number) => {
                        return (
                            <Swipeable
                                renderRightActions={() => renderRightActions(placeToVisit.id, 'place')}
                                key={placeToVisit.id}
                            >
                                <PlaceToVisitCard
                                    tripId={tripId}
                                    sectionId={placeToVisit.itineraryDayId}
                                    placeToVisitId={placeToVisit.id}
                                    order={index + 1}
                                    onDelete={() =>
                                        deletePlaceToVisitItinerary({ tripId, dayId, placeToVisitId: placeToVisit.id })
                                    }
                                />
                            </Swipeable>
                        );
                    })}
                    <View className="mt-4 flex-row items-center justify-between">
                        <TouchableOpacity
                            className="flex-1 flex-row items-center rounded-lg bg-gray-100 p-3"
                            onPress={() => {
                                setSnapPoints(['80%']);
                                setBottomSheetContent(
                                    <SearchPlaceSheet tripId={tripId} dayId={dayId} closeSheet={closeSheet} />
                                );
                                openSheet();
                            }}
                            disabled={isPendingUpdateTripItineraryDay || isPendingDeletePlaceToVisitItinerary}
                        >
                            <Iconify icon="mdi-light:map-marker" size={20} className="text-black" />
                            <Text className="ml-2 text-gray-500">Add a place</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="mx-2 rounded-lg bg-gray-100 p-3"
                            onPress={() => {
                                createNoteItinerary({
                                    tripId,
                                    dayId,
                                    createNoteReq: { content: 'Add your notes here' }
                                });
                            }}
                            disabled={
                                isPendingUpdateTripItineraryDay ||
                                isPendingCreateNoteItinerary ||
                                isPendingUpdateNoteItinerary ||
                                isPendingDeleteNoteItinerary
                            }
                        >
                            <Iconify icon="mdi-light:note" size={20} className="text-black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="rounded-lg bg-gray-100 p-3"
                            onPress={() => {
                                createChecklistItinerary({
                                    tripId,
                                    dayId,
                                    createCheckListReq: { title: 'Add a title' }
                                });
                            }}
                            disabled={
                                isPendingUpdateTripItineraryDay ||
                                isPendingCreateChecklistItinerary ||
                                isPendingUpdateChecklistItinerary ||
                                isPendingDeleteChecklistItinerary ||
                                isPendingCreateChecklistItemItinerary ||
                                isPendingUpdateChecklistItemItinerary ||
                                isPendingDeleteChecklistItemItinerary
                            }
                        >
                            <Iconify className="text-black" icon="material-symbols-light:checklist" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default ItineraryCard;
