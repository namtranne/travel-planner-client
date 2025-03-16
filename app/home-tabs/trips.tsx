import { useRouter } from 'expo-router';
import moment from 'moment';
import { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import { useMyTrips } from '@/src/hooks/use-trip';

const Trips = () => {
    const router = useRouter();
    const [trips, setTrips] = useState([]);
    const { data, isLoading, error } = useMyTrips();
    console.log(data);

    // Get current date
    const today = moment();

    // Categorize trips
    const pastTrips = trips.filter((trip) => moment(trip.endDate).isBefore(today));
    const upcomingTrips = trips.filter((trip) => moment(trip.startDate).isAfter(today));
    const activeTrips = trips.filter(
        (trip) => moment(trip.startDate).isSameOrBefore(today) && moment(trip.endDate).isSameOrAfter(today)
    );

    // Function to render trip card
    const renderTripCard = ({ item }) => (
        <TouchableOpacity className="m-2 rounded-lg bg-white shadow-md" onPress={() => router.push(`/trip/${item.id}`)}>
            {/* Trip Image */}
            {item.image && <Image source={{ uri: item.image }} className="h-40 w-full rounded-t-lg" />}
            {/* Trip Info */}
            <View className="p-4">
                <Text className="text-lg font-bold">{item.title}</Text>
                <Text className="text-gray-500">
                    {moment(item.startDate).format('MMM DD, YYYY')} - {moment(item.endDate).format('MMM DD, YYYY')}
                </Text>
                <Text className="text-gray-600">{item.location}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-gray-100 p-4">
            {/* Active Trips */}
            {activeTrips.length > 0 && (
                <View className="mb-6">
                    <Text className="mb-2 text-xl font-bold">🌍 Currently Active</Text>
                    <FlatList
                        data={activeTrips}
                        renderItem={renderTripCard}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )}

            {/* Upcoming Trips */}
            {upcomingTrips.length > 0 && (
                <View className="mb-6">
                    <Text className="mb-2 text-xl font-bold">📅 Upcoming Trips</Text>
                    <FlatList
                        data={upcomingTrips}
                        renderItem={renderTripCard}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )}

            {/* Past Trips */}
            {pastTrips.length > 0 && (
                <View className="mb-6">
                    <Text className="mb-2 text-xl font-bold">🕰️ Past Trips</Text>
                    <FlatList
                        data={pastTrips}
                        renderItem={renderTripCard}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )}
        </View>
    );
};

export default Trips;
