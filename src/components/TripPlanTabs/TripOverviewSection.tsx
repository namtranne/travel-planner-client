import { CheckBox } from '@rneui/base';
import type React from 'react';
import { useState } from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

import Button from '../ui/CommonButton';

interface TripOverviewSectionProps {
    titleSection: string;
    openSheet: () => void;
    closeSheet: () => void;
    setBottomSheetContent: (content: React.ReactNode) => void;
}

const Note = () => {
    const [expanded, setExpanded] = useState(false);
    return (
        <View className="border-t border-gray-200 py-3">
            <View className={`rounded-lg ${expanded ? 'bg-gray-100' : ''} p-3`}>
                <View className="flex-1 flex-row items-center justify-center">
                    <View className="h-6 w-6 items-center justify-center rounded-full bg-gray-300">
                        <Iconify icon="fluent:note-48-filled" size={16} color="white" />
                    </View>
                    <TextInput
                        className="ml-3 flex-1 text-base italic text-gray-500"
                        placeholder="Add your notes here"
                        onFocus={() => setExpanded(true)}
                    />
                </View>
                {expanded && (
                    <View className="mt-4 flex-row items-center justify-end gap-3">
                        <TouchableOpacity>
                            <Iconify icon="mdi:trash-can" size={24} color="#6b7280" />
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

interface ChecklistItemProps {
    handleFocus: () => void;
}

const ChecklistItem = ({ handleFocus }: ChecklistItemProps) => {
    return (
        <View className="mb-3 flex-row items-center">
            <CheckBox
                checked={false}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="#000"
                uncheckedColor="#000"
                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
            />
            <TextInput
                placeholder="Add some items"
                placeholderTextColor="#6c757d"
                className="flex-1 text-base text-gray-800"
                onFocus={handleFocus}
            />
        </View>
    );
};

const Checklist = () => {
    const [expanded, setExpanded] = useState(false);
    return (
        <Pressable className="border-t border-gray-200 py-3" onPress={() => setExpanded(true)}>
            <View className="rounded-xl bg-gray-100 p-3">
                <TextInput
                    placeholder="Add a title"
                    placeholderTextColor="#333"
                    className="mb-2 text-base font-bold text-gray-800"
                    onFocus={() => setExpanded(true)}
                />
                {/* Checklist items */}
                <ChecklistItem handleFocus={() => setExpanded(true)} />
                {/* Options */}
                {expanded && (
                    <>
                        <View className="flex-row items-center border-t border-gray-200 pt-2">
                            <Iconify icon="mdi:briefcase-outline" size={20} color="#6c757d" />
                            <Text className="ml-2 font-semibold text-gray-700">Pre-made lists</Text>
                        </View>
                        <View className="mt-2 flex-row justify-end gap-3">
                            <TouchableOpacity>
                                <Iconify icon="mdi:trash-can" size={24} color="#6c757d" />
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

const TripOverviewSection = ({ titleSection, openSheet, setBottomSheetContent }: TripOverviewSectionProps) => {
    const [expanded, setExpanded] = useState(true);
    const [title, setTitle] = useState(titleSection);
    const [showNoteInput, setShowNoteInput] = useState(false);
    const [showChecklistInput, setShowChecklistInput] = useState(false);

    const options = [
        { icon: 'mdi:pencil', label: 'Edit section heading', action: () => {} },
        { icon: 'mdi:trash-can', label: 'Delete section', action: () => {} },
        { icon: 'mdi:dots-grid', label: 'Reorder sections', action: () => {} }
    ];

    return (
        <View className="h-full rounded-lg bg-white p-4 pb-6 shadow">
            <View className="flex-row items-center justify-between gap-x-2">
                <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                    <Iconify icon={expanded ? 'mdi:chevron-down' : 'mdi:chevron-right'} color="black" size={36} />
                </TouchableOpacity>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    className="h-[60px] flex-1 rounded-lg p-2 text-lg font-semibold focus:bg-gray-200"
                    placeholder="Enter title"
                    style={{ textAlignVertical: 'top' }}
                    multiline
                    numberOfLines={1}
                />
                <TouchableOpacity
                    onPress={() => {
                        setBottomSheetContent(
                            <View className="rounded-t-3xl bg-white p-4">
                                {options.map(({ icon, label, action }, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        className="flex-row items-center gap-2 p-3"
                                        onPress={() => action()}
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
                    <Iconify icon="bi:three-dots" size={24} />
                </TouchableOpacity>
            </View>
            {expanded && (
                <View className="mt-2">
                    {showNoteInput && <Note />}
                    {showChecklistInput && <Checklist />}
                    <View className="mt-2 flex-row items-center justify-between">
                        <TouchableOpacity
                            className="flex-1 flex-row items-center rounded-lg bg-gray-100 p-3"
                            onPress={() => {
                                setBottomSheetContent(
                                    <View className="px-5 pb-6 pt-2">
                                        <Text className="text-center text-base font-bold">Add a place</Text>
                                        <View className="mt-4 flex-row items-center rounded-lg bg-gray-100 px-4 py-2">
                                            <TextInput
                                                placeholder="Search by name or address"
                                                className="flex-1 text-gray-600"
                                            />
                                            <TouchableOpacity
                                                className="h-6 w-6 items-center justify-center rounded-full bg-gray-300"
                                                onPress={() => {}}
                                            >
                                                <Text className="text-gray-500">X</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View className="mt-12 items-center">
                                            <Text className="text-center text-gray-500">Need more ideas?</Text>
                                            <Button
                                                text="Explore guides and blogs"
                                                onPress={() => {}}
                                                additionalStyle="mt-2 bg-[#60ABEF] w-[250px] rounded-xl"
                                            />
                                        </View>
                                    </View>
                                );
                                openSheet();
                            }}
                        >
                            <Iconify icon="mdi-light:map-marker" size={20} color="black" />
                            <Text className="ml-2 text-gray-500">Add a place</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="mx-2 rounded-lg bg-gray-100 p-3"
                            onPress={() => setShowNoteInput((prevShowNoteInput) => !prevShowNoteInput)}
                        >
                            <Iconify icon="mdi-light:note" size={20} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="rounded-lg bg-gray-100 p-3"
                            onPress={() => setShowChecklistInput(true)}
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
