import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Iconify from 'react-native-iconify';

const ItineraryCard = () => {
    const [subheading, setSubheading] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className="rounded-2xl bg-white p-4 shadow-md">
            {/* Header */}
            <View className="flex-row items-center justify-between space-x-2">
                <Text className="text-3xl font-bold">Thu 3/4</Text>
                <TextInput
                    className={`flex-1 rounded-lg p-2 text-base text-gray-400 ${isFocused ? 'bg-gray-200' : 'bg-transparent'}`}
                    placeholder="Add subheading"
                    value={subheading}
                    onChangeText={setSubheading}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <TouchableOpacity onPress={() => {}}>
                    <Iconify icon="bi:three-dots" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Actions */}
            <View className="mt-2 flex-row items-center space-x-4">
                <TouchableOpacity className="flex-row items-center">
                    <Iconify icon="mdi:magic-wand" width="18" height="18" className="font-semibold text-blue-600" />
                    <Text className="ml-1 rounded-lg font-semibold text-blue-600">Auto-fill day</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center">
                    <Iconify icon="fa-solid:route" width="18" height="18" className="font-semibold text-blue-600" />
                    <Text className="ml-1 font-semibold text-blue-600">Optimize route</Text>
                </TouchableOpacity>
            </View>

            <View className="mt-4 flex-row items-center justify-between">
                <TouchableOpacity
                    className="flex-1 flex-row items-center rounded-lg bg-gray-100 p-3"
                    onPress={() => {}}
                >
                    <Iconify icon="mdi-light:map-marker" size={20} color="black" />
                    <Text className="ml-2 text-gray-500">Add a place</Text>
                </TouchableOpacity>
                <TouchableOpacity className="mx-2 rounded-lg bg-gray-100 p-3" onPress={() => {}}>
                    <Iconify icon="mdi-light:note" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity className="rounded-lg bg-gray-100 p-3" onPress={() => {}}>
                    <Iconify icon="material-symbols-light:checklist" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ItineraryCard;
