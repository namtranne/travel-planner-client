import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const itineraryData = [
    {
        id: '1',
        name: 'Mongo Land Dalat',
        time: '07:00 - 17:30',
        description: 'Nestled in the picturesque Da Lat, Mongo Land Dalat offers a one-of-a-kind experience...',
        image: 'https://via.placeholder.com/100'
    }
];

const recommendedPlaces = [
    { id: '2', name: 'Đường Hầm Đ...', image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Canyons Walk', image: 'https://via.placeholder.com/100' }
];

export default function ItineraryScreen() {
    const [selectedDate, setSelectedDate] = useState('Wed 3/5');
    const [notes, setNotes] = useState('');
    const router = useRouter();

    const dates = ['Wed 3/5', 'Thu 3/6', 'Fri 3/7', 'Sat 3/8'];

    return (
        <View className="flex-1 bg-white p-4">
            {/* Date Tabs */}
            <View className="flex-row space-x-2">
                {dates.map((date) => (
                    <TouchableOpacity
                        key={date}
                        onPress={() => setSelectedDate(date)}
                        className={`rounded-lg px-4 py-2 ${selectedDate === date ? 'bg-black text-white' : 'bg-gray-200'}`}
                    >
                        <Text className={selectedDate === date ? 'font-bold text-white' : 'text-gray-600'}>{date}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Optimize Route Section */}
            <TouchableOpacity className="mt-4 flex-row items-center rounded-lg bg-gray-100 p-3">
                <Text className="font-semibold text-blue-600">Optimize route</Text>
                <View className="ml-2 rounded-full bg-yellow-400 px-2">
                    <Text className="text-xs font-bold">PRO</Text>
                </View>
            </TouchableOpacity>

            {/* Notes Section */}
            <TextInput
                className="mt-4 rounded-lg border p-3"
                placeholder="Add your notes here"
                value={notes}
                onChangeText={setNotes}
            />

            {/* Itinerary List */}
            <FlatList
                data={itineraryData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="mt-4 flex-row items-center rounded-lg border p-3">
                        <View className="flex-1">
                            <Text className="text-lg font-bold">{item.name}</Text>
                            <Text className="text-gray-500">{item.time}</Text>
                            <Text className="text-gray-600">{item.description}</Text>
                        </View>
                        <Image source={{ uri: item.image }} className="h-16 w-16 rounded-lg" />
                    </View>
                )}
            />

            {/* Add Place Section */}
            <TouchableOpacity className="mt-4 flex-row items-center rounded-lg bg-gray-100 p-3">
                {/* <FontAwesome name="map-marker" size={20} color="gray" /> */}
                <Text className="ml-2 text-gray-600">Add a place</Text>
            </TouchableOpacity>

            {/* Recommended Places */}
            <Text className="mt-6 text-lg font-bold">Recommended places</Text>
            <ScrollView horizontal className="mt-2">
                {recommendedPlaces.map((place) => (
                    <TouchableOpacity key={place.id} className="mr-4">
                        <Image source={{ uri: place.image }} className="h-24 w-24 rounded-lg" />
                        <Text className="mt-1 text-center text-gray-600">{place.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Floating Action Button */}
            <View className="absolute bottom-10 right-4 space-y-3">
                {/* <TouchableOpacity className="rounded-full bg-purple-500 p-4">
                    <Feather name="edit-3" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity className="rounded-full bg-black p-4">
                    <MaterialIcons name="map" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity className="rounded-full bg-gray-800 p-4">
                    <Feather name="plus" size={24} color="white" />
                </TouchableOpacity> */}
            </View>
        </View>
    );
}
