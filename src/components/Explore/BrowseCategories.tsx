import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BrowseCategories({ categories }: any) {
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const filteredCategories = categories.filter((category: any) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View className="items-center justify-center p-4">
            <TouchableOpacity onPress={() => setModalVisible(true)} className="rounded-lg">
                <Text className="text-red-500">See all</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View className="flex-1 justify-end bg-black/50">
                    {/* Modal Container */}
                    <TouchableOpacity className="flex-1" onPress={() => setModalVisible(false)} />
                    <View className="h-3/4 w-full rounded-t-xl bg-white shadow-lg">
                        <SafeAreaView className="flex-1">
                            <View className="flex-1 px-6 pt-4">
                                {/* Header */}
                                <View className="mb-4 flex flex-row items-center justify-between">
                                    <Text className="font-inter text-xl font-bold">Browse categories</Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <Iconify icon="material-symbols:close" size={25} color="black" />
                                    </TouchableOpacity>
                                </View>

                                {/* Search Input */}
                                <TextInput
                                    className="rounded-lg bg-gray-100 p-2"
                                    placeholder="Search for pizza, galleries, etc."
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                />

                                {/* Scrollable List (LIMITED TO 10 ITEMS) */}
                                <FlatList
                                    data={filteredCategories}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            className="flex-row items-center py-3"
                                            onPress={() => {
                                                router.push(`/category/${item.id}`);
                                                setModalVisible(false);
                                            }}
                                        >
                                            <Text className="mr-3 text-lg">{item.emoji}</Text>
                                            <Text className="font-inter text-sm">{item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                    contentContainerStyle={{ paddingBottom: 20 }} // Extra space at bottom
                                    showsVerticalScrollIndicator={false} // Hide scrollbar
                                />
                            </View>
                        </SafeAreaView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
