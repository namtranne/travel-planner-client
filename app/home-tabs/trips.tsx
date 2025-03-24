import { Tab, TabView } from '@rneui/themed';
import { useRouter } from 'expo-router';
import moment from 'moment';
import { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@/src/components/ui/HeaderComponent';
import { useMyTrips } from '@/src/hooks/use-trip';

const Trips = () => {
    const router = useRouter();
    const { data, isLoading } = useMyTrips();
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (isLoading)
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Loading...</Text>
            </View>
        );

    // Get current date
    const today = moment();

    // Categorize trips
    const pastTrips = data.filter((trip: any) => moment(trip.endDate).isBefore(today));
    const upcomingTrips = data.filter((trip: any) => moment(trip.startDate).isAfter(today));
    const activeTrips = data.filter(
        (trip: any) => moment(trip.startDate).isSameOrBefore(today) && moment(trip.endDate).isSameOrAfter(today)
    );

    // Colors for selected and unselected tabs
    const activeColor = '#007AFF'; // Selected tab color (iOS blue)
    const inactiveColor = '#A0A0A0'; // Gray for non-selected tabs

    // Function to render trip card
    const renderTripCard = ({ item }: any) => (
        <TouchableOpacity
            className="m-2 rounded-lg bg-white shadow-md"
            onPress={() => router.navigate(`/trip-plan/${item.id}`)}
        >
            {item.image && <Image source={{ uri: item.image }} className="h-40 w-full rounded-t-lg" />}
            <View className="p-4">
                <Text className="font-inter text-lg font-bold">{item.title}</Text>
                <Text className="font-inter text-gray-500">
                    {moment(item.startDate).format('MMM DD, YYYY')} - {moment(item.endDate).format('MMM DD, YYYY')}
                </Text>
                <Text className="font-inter text-gray-600">{item.location}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <HeaderComponent title="Your Trips" hasBackButton={false} />

            {/* Top Tabs with Dynamic Styles */}
            <Tab
                value={selectedIndex}
                onChange={setSelectedIndex}
                indicatorStyle={{ backgroundColor: activeColor, height: 3 }}
            >
                <Tab.Item
                    title="Upcoming"
                    titleStyle={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: selectedIndex === 0 ? activeColor : inactiveColor,
                        fontFamily: 'Inter'
                    }}
                />
                <Tab.Item
                    title="Active"
                    titleStyle={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: selectedIndex === 1 ? activeColor : inactiveColor,
                        fontFamily: 'Inter'
                    }}
                />
                <Tab.Item
                    title="Past"
                    titleStyle={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: selectedIndex === 2 ? activeColor : inactiveColor,
                        fontFamily: 'Inter'
                    }}
                />
            </Tab>

            {/* Tab Views */}
            <TabView value={selectedIndex} onChange={setSelectedIndex} animationType="spring">
                {/* Upcoming Trips */}
                <TabView.Item style={{ width: '100%', flex: 1 }}>
                    <FlatList
                        data={upcomingTrips}
                        renderItem={renderTripCard}
                        keyExtractor={(item) => item.id.toString()}
                        ListEmptyComponent={
                            <Text className="mt-10 text-center font-inter text-gray-500">No upcoming trips</Text>
                        }
                    />
                </TabView.Item>

                {/* Active Trips */}
                <TabView.Item style={{ width: '100%', flex: 1 }}>
                    <FlatList
                        data={activeTrips}
                        renderItem={renderTripCard}
                        keyExtractor={(item) => item.id.toString()}
                        ListEmptyComponent={
                            <Text className="mt-10 text-center font-inter text-gray-500">No active trips</Text>
                        }
                    />
                </TabView.Item>

                {/* Past Trips */}
                <TabView.Item style={{ width: '100%', flex: 1 }}>
                    <FlatList
                        data={pastTrips}
                        renderItem={renderTripCard}
                        keyExtractor={(item) => item.id.toString()}
                        ListEmptyComponent={
                            <Text className="mt-10 text-center font-inter text-gray-500">No past trips</Text>
                        }
                    />
                </TabView.Item>
            </TabView>
        </SafeAreaView>
    );
};

export default Trips;
