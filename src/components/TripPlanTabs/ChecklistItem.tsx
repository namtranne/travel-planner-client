import { CheckBox } from '@rneui/base';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

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

export default ChecklistItem;
