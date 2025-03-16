import { CheckBox } from '@rneui/base';
import type React from 'react';
import { useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

import {
    useCreateChecklist,
    useCreateChecklistItem,
    useCreateNote,
    useDeleteChecklist,
    useDeleteChecklistItem,
    useDeleteNote,
    useDeleteTripOverviewSection,
    useTripOverviewSectionDetails,
    useUpdateChecklist,
    useUpdateChecklistItem,
    useUpdateNote,
    useUpdateTripOverviewSection
} from '@/src/hooks/use-trip';

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

const Note = ({
    initialNote,
    handleUpdateNote,
    handleDeleteNote
}: {
    initialNote: string;
    handleUpdateNote: (note: string) => void;
    handleDeleteNote: () => void;
}) => {
    const [expanded, setExpanded] = useState(false);
    const [note, setNote] = useState(initialNote);
    return (
        <View className="border-t border-gray-200 py-3">
            <View className={`rounded-lg ${expanded ? 'bg-gray-100' : ''} p-3`}>
                <View className="flex-1 flex-row items-center justify-center">
                    <View className="h-6 w-6 items-center justify-center rounded-full bg-gray-300">
                        <Iconify icon="fluent:note-48-filled" size={16} color="white" />
                    </View>
                    <TextInput
                        className="ml-3 flex-1 italic text-gray-500"
                        style={{ textAlignVertical: 'top' }}
                        placeholder="Add your notes here"
                        onFocus={() => setExpanded(true)}
                        value={note}
                        onChangeText={(text) => setNote(text)}
                        onBlur={() => handleUpdateNote(note)}
                    />
                </View>
                {expanded && (
                    <View className="mt-4 flex-row items-center justify-end gap-3">
                        <TouchableOpacity>
                            <Iconify
                                icon="mdi:trash-can"
                                size={24}
                                color="#6b7280"
                                onPress={() => handleDeleteNote()}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Iconify icon="mdi:view-grid-outline" size={24} color="#6b7280" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setExpanded(false)}>
                            <Iconify icon="mdi:chevron-up" size={24} color="#6b7280" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

const ChecklistItem = ({
    initialTitle,
    isChecked,
    handleFocus,
    handleUpdateChecklistItem,
    handleDeleteChecklistItem
}: {
    initialTitle: string;
    isChecked: boolean;
    handleFocus: () => void;
    handleUpdateChecklistItem: (title: string, isChecked: boolean) => void;
    handleDeleteChecklistItem: () => void;
}) => {
    const [title, setTitle] = useState(initialTitle);
    const [checked, setChecked] = useState(isChecked);
    return (
        <View className="flex-row items-center justify-between pr-2">
            <View className="flex-row items-center">
                <CheckBox
                    checked={checked}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor="#60ABEF"
                    uncheckedColor="#000"
                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                    onPress={() => {
                        setChecked(!checked);
                        handleUpdateChecklistItem(title, !checked);
                    }}
                />
                <TextInput
                    placeholder="Add some items"
                    placeholderTextColor="#6c757d"
                    className={`flex-1 text-gray-800 ${checked ? 'line-through' : ''}`}
                    onFocus={handleFocus}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    onBlur={() => handleUpdateChecklistItem(title, checked)}
                />
            </View>
            <TouchableOpacity onPress={() => handleDeleteChecklistItem()}>
                <Text className="text-sm text-red-500">X</Text>
            </TouchableOpacity>
        </View>
    );
};

const Checklist = ({
    initialTitle,
    items,
    handleUpdateChecklist,
    handleDeleteChecklist,
    handleCreateChecklistItem,
    handleUpdateChecklistItem,
    handleDeleteChecklistItem
}: {
    initialTitle: string;
    items: any;
    handleUpdateChecklist: (title: string) => void;
    handleDeleteChecklist: () => void;
    handleCreateChecklistItem: () => void;
    handleUpdateChecklistItem: (checklistItemId: number, title: string, isChecked: boolean) => void;
    handleDeleteChecklistItem: (checklistItemId: number) => void;
}) => {
    const [expanded, setExpanded] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    return (
        <Pressable className="border-t border-gray-200 py-3" onPress={() => setExpanded(true)}>
            <View className="rounded-xl bg-gray-100 p-3">
                <TextInput
                    placeholder="Add a title"
                    placeholderTextColor="#a3a1a1"
                    className="mb-2 text-base font-bold text-gray-600"
                    onFocus={() => setExpanded(true)}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    onBlur={() => handleUpdateChecklist(title)}
                />
                <TouchableOpacity className="flex-row items-center" onPress={() => handleCreateChecklistItem()}>
                    <CheckBox
                        checked={false}
                        iconType="material-community"
                        checkedIcon="checkbox-marked"
                        uncheckedIcon="checkbox-blank-outline"
                        checkedColor="#4c4c4c"
                        uncheckedColor="#585656"
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                    />
                    <Text className="flex-1 text-sm text-gray-500">Add some items</Text>
                </TouchableOpacity>
                {/* Checklist items */}
                {items.map((item: any) => (
                    <ChecklistItem
                        initialTitle={item.title}
                        isChecked={item.isChecked}
                        handleFocus={() => setExpanded(true)}
                        handleUpdateChecklistItem={(itemTitle, isChecked) =>
                            handleUpdateChecklistItem(item.id, itemTitle, isChecked)
                        }
                        handleDeleteChecklistItem={() => handleDeleteChecklistItem(item.id)}
                        key={item.id}
                    />
                ))}
                {/* Options */}
                {expanded && (
                    <>
                        <View className="flex-row items-center border-t border-gray-200 pt-2">
                            <Iconify icon="mdi:briefcase-outline" size={20} color="#6c757d" />
                            <Text className="ml-2 font-semibold text-gray-700">Pre-made lists</Text>
                        </View>
                        <View className="mt-2 flex-row justify-end gap-3">
                            <TouchableOpacity>
                                <Iconify
                                    icon="mdi:trash-can"
                                    size={24}
                                    color="#6c757d"
                                    onPress={() => handleDeleteChecklist()}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Iconify icon="mdi:view-grid-outline" size={24} color="#6c757d" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setExpanded(false)}>
                                <Iconify icon="mdi:chevron-up" size={24} color="#6c757d" />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </Pressable>
    );
};

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
    const { isPending: isPendingCreateNote, createNote } = useCreateNote();
    const { isPending: isPendingUpdateNote, updateNote } = useUpdateNote();
    const { isPending: isPendingDeleteNote, deleteNote } = useDeleteNote();
    const { isPending: isPendingCreateChecklist, createChecklist } = useCreateChecklist();
    const { isPending: isPendingUpdateChecklist, updateChecklist } = useUpdateChecklist();
    const { isPending: isPendingDeleteChecklist, deleteChecklist } = useDeleteChecklist();
    const { isPending: isPendingCreateChecklistItem, createChecklistItem } = useCreateChecklistItem();
    const { isPending: isPendingUpdateChecklistItem, updateChecklistItem } = useUpdateChecklistItem();
    const { isPending: isPendingDeleteChecklistItem, deleteChecklistItem } = useDeleteChecklistItem();

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
                    <Iconify icon={expanded ? 'mdi:chevron-down' : 'mdi:chevron-right'} color="black" size={36} />
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
                                        <Iconify icon={icon} size={20} color="black" />
                                        <Text className="text-base">{label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        );
                        openSheet();
                    }}
                >
                    <Iconify icon="bi:three-dots" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {expanded && (
                <View className="mt-2">
                    {/* Notes */}
                    {tripOverviewSection?.notes.map((note: any) => (
                        <Note
                            initialNote={note.content}
                            handleUpdateNote={(updatedNote) =>
                                updateNote({
                                    tripId,
                                    sectionId,
                                    noteId: note.id,
                                    updateNoteReq: { content: updatedNote }
                                })
                            }
                            handleDeleteNote={() =>
                                deleteNote(
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
                                updateChecklist({
                                    tripId,
                                    sectionId,
                                    checklistId: checklist.id,
                                    updateCheckListReq: { title: updatedTitle }
                                })
                            }
                            handleDeleteChecklist={() =>
                                deleteChecklist(
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
                                createChecklistItem({
                                    tripId,
                                    sectionId,
                                    checklistId: checklist.id,
                                    createCheckListItemReq: { title: 'Add item title' }
                                })
                            }
                            handleUpdateChecklistItem={(checklistItemId, itemTitle, isChecked) => {
                                updateChecklistItem({
                                    tripId,
                                    sectionId,
                                    checklistId: checklist.id,
                                    checklistItemId,
                                    updateCheckListItemReq: { title: itemTitle, isChecked }
                                });
                            }}
                            handleDeleteChecklistItem={(checklistItemId) =>
                                deleteChecklistItem({
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
                    <PlaceToVisitCard />
                    <View className="mt-2 flex-row items-center justify-between">
                        <TouchableOpacity
                            className="flex-1 flex-row items-center rounded-lg bg-gray-100 p-3"
                            onPress={() => {
                                setSnapPoints(['80%']);
                                setBottomSheetContent(<SearchPlaceSheet />);
                                openSheet();
                            }}
                        >
                            <Iconify icon="mdi-light:map-marker" size={20} color="black" />
                            <Text className="ml-2 text-gray-500">Add a place</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="mx-2 rounded-lg bg-gray-100 p-3"
                            onPress={() =>
                                createNote({ tripId, sectionId, createNoteReq: { content: 'Add your notes here' } })
                            }
                            disabled={isPendingCreateNote || isPendingUpdateNote || isPendingDeleteNote}
                        >
                            <Iconify icon="mdi-light:note" size={20} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="rounded-lg bg-gray-100 p-3"
                            onPress={() =>
                                createChecklist({ tripId, sectionId, createCheckListReq: { title: 'Add a title' } })
                            }
                            disabled={
                                isPendingCreateChecklist ||
                                isPendingUpdateChecklist ||
                                isPendingDeleteChecklist ||
                                isPendingCreateChecklistItem ||
                                isPendingUpdateChecklistItem ||
                                isPendingDeleteChecklistItem
                            }
                        >
                            <Iconify icon="material-symbols-light:checklist" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default TripOverviewSection;
