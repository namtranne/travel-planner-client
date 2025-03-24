import { CheckBox } from '@rneui/base';
import { useState } from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

import ChecklistItem from './ChecklistItem';

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
                            <Iconify
                                className="text-[#6c757d]"
                                icon="mdi:briefcase-outline"
                                size={20}
                                color="#6c757d"
                            />
                            <Text className="ml-2 font-semibold text-gray-700">Pre-made lists</Text>
                        </View>
                        <View className="mt-2 flex-row justify-end gap-3">
                            <TouchableOpacity>
                                <Iconify
                                    className="text-[#6c757d]"
                                    icon="mdi:trash-can"
                                    size={24}
                                    color="#6c757d"
                                    onPress={() => handleDeleteChecklist()}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Iconify
                                    className="text-[#6c757d]"
                                    icon="mdi:view-grid-outline"
                                    size={24}
                                    color="#6c757d"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setExpanded(false)}>
                                <Iconify className="text-[#6c757d]" icon="mdi:chevron-up" size={24} color="#6c757d" />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </Pressable>
    );
};

export default Checklist;
