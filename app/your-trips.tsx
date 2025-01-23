/* eslint-disable import/no-extraneous-dependencies */
import type React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import tw from 'tailwind-react-native-classnames';

interface TripItem {
    id: string;
    title: string;
    date: string;
    location: string;
    image: string;
}

const trips: TripItem[] = [
    {
        id: '1',
        title: 'Summer trip',
        date: '12 Jan - 20 Jan',
        location: 'Da Lat city',
        image: 'https://picsum.photos/100/100?random=1'
    },
    {
        id: '2',
        title: 'Healing trip',
        date: '12 Jan - 20 Jan',
        location: 'Da Lat city',
        image: 'https://picsum.photos/100/100?random=2'
    },
    {
        id: '3',
        title: 'Summer trip',
        date: '12 Jan - 20 Jan',
        location: 'Da Lat city',
        image: 'https://picsum.photos/100/100?random=3'
    }
];

const YourTripsScreen: React.FC = () => {
    const renderItem = ({ item }: { item: TripItem }) => (
        <TouchableOpacity className="m-2 flex-row rounded-lg bg-white p-2 shadow-md">
            <Image source={{ uri: item.image }} className="h-16 w-16 rounded-lg" resizeMode="cover" />
            <View className="ml-4 flex-1">
                <Text className="text-lg font-bold">{item.title}</Text>
                <Text className="text-sm text-gray-500">{item.date}</Text>
                <Text className="text-sm text-gray-400">{item.location}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-gray-100">
            <View className="flex-row items-center justify-between bg-white p-4">
                <TouchableOpacity className="h-8 w-8 items-center justify-center">
                    <Icon name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-lg font-bold">Your trips</Text>
                <View className="flex-row space-x-4">
                    <TouchableOpacity className="h-8 w-8 items-center justify-center">
                        <Icon name="add" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity className="h-8 w-8 items-center justify-center">
                        <Icon name="filter" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={trips}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={tw`p-4`}
            />

            <TouchableOpacity className="absolute inset-x-4 bottom-4 rounded-lg bg-blue-500 py-4">
                <Text className="text-center font-bold text-white">New trip</Text>
            </TouchableOpacity>
        </View>
    );
};

export default YourTripsScreen;
