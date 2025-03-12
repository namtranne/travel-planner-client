import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
    { id: '1', name: 'Restaurants', icon: '🍽️' },
    { id: '2', name: 'Attractions', icon: '📍' },
    { id: '3', name: 'Cafes', icon: '☕' },
    { id: '4', name: 'Photo spots', icon: '📸' },
    { id: '5', name: 'Cheap eats', icon: '💰' },
    { id: '6', name: 'Breakfast and brunch', icon: '🔍' },
    { id: '7', name: 'Bakeries', icon: '🥐' },
    { id: '8', name: 'Breweries and beer', icon: '🍺' },
    { id: '9', name: 'Romantic places', icon: '❤️' },
    { id: '10', name: 'Family restaurants', icon: '🍗' }
];

export default function BrowseCategories() {
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View className="items-center justify-center p-4">
            <TouchableOpacity onPress={() => setModalVisible(true)} className="rounded-lg">
                <Text className="text-red-500">See all</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View className="flex-1 rounded-t-xl bg-white shadow-lg">
                    <SafeAreaView>
                        <View className="px-6 pt-4">
                            <View className="mb-4 flex flex-row items-center justify-between">
                                <Text className="font-inter text-xl font-bold">Browse categories</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    {/* <Text className="text-center font-inter text-lg text-black"></Text> */}
                                    <Iconify icon="material-symbols:close" size={25} color="black" />
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                className="rounded-lg bg-gray-100 p-2"
                                placeholder="Search for pizza, galleries, etc."
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />

                            <FlatList
                                data={filteredCategories}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        className="flex-row items-center py-2"
                                        onPress={() => {
                                            router.push(`/category/${item.name.toLowerCase()}`);
                                            setModalVisible(false);
                                        }}
                                    >
                                        <Text className="mr-2 text-lg">{item.icon}</Text>
                                        <Text className="font-inter text-sm">{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </SafeAreaView>
                </View>
            </Modal>
        </View>
    );
}
