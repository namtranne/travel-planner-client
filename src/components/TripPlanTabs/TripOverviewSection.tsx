import type React from 'react';
import { useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

import {
    useCreateChecklistItemOverview,
    useCreateChecklistOverview,
    useCreateNoteOverview,
    useDeleteChecklistItemOverview,
    useDeleteChecklistOverview,
    useDeleteNoteOverview,
    useDeletePlaceToVisitOverview,
    useDeleteTripOverviewSection,
    useTripOverviewSectionDetails,
    useUpdateChecklistItemOverview,
    useUpdateChecklistOverview,
    useUpdateNoteOverview,
    useUpdateTripOverviewSection
} from '@/src/hooks/use-trip';

import Checklist from './Checklist';
import Note from './Note';
import PlaceToVisitCard from './PlaceToVisitCard';
import SearchPlaceSheet from './SearchPlaceSheet';

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

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#60ABEF" />
            </View>
        );
    }

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
                            key={note.id}
                        />
                    ))}
                    {/* Checklists */}
                    {tripOverviewSection?.checkLists.map((checklist: any) => (
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
                    ))}
                    {/* Place to visits */}
                    {tripOverviewSection?.placeToVisits.map((placeToVisit: any, index: number) => (
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
                    ))}
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
                </View>
            )}
        </View>
    );
};

export default TripOverviewSection;
