import { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

import ItineraryCard from './ItineraryCard';

export default function ItineraryScreen({
    trip,
    openSheet,
    closeSheet,
    setBottomSheetContent,
    setSnapPoints
}: {
    trip: any;
    openSheet: () => void;
    closeSheet: () => void;
    setBottomSheetContent: (content: React.ReactNode) => void;
    setSnapPoints: (points: string[]) => void;
}) {
    const [selectedDayId, setSelectedDayId] = useState(trip?.tripItinerary?.days[0].id);
    const [modalVisible, setModalVisible] = useState(false);

    const handleAIFill = () => {
        // Here you'd call your AI itinerary fill logic
        console.log('AI itinerary filling triggered');
        setModalVisible(false);
    };

    return (
        <View className="flex-1">
            {/* Itinerary tabs */}
            <View className="bg-white px-2 py-4">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="fixed ">
                    <View className="mr-2 rounded-full bg-black p-2">
                        <Iconify className="text-white" icon="mdi:calendar-edit" width="24" height="24" />
                    </View>
                    <TouchableOpacity
                        className="mr-2 rounded-full bg-[#ffaaec] p-2"
                        onPress={() => setModalVisible(true)}
                    >
                        <Iconify className="text-white" icon="mdi:magic" width="24" height="24" />
                    </TouchableOpacity>
                    {trip?.tripItinerary?.days.map((day: any) => (
                        <TouchableOpacity
                            key={day.id}
                            className={`mx-2 rounded-lg px-4 py-2 ${selectedDayId === day.id ? 'bg-gray-400' : 'bg-gray-100'}`}
                            onPress={() => setSelectedDayId(day.id)}
                        >
                            <Text
                                className={`font-semibold ${selectedDayId === day.id ? 'text-black' : 'text-gray-500'}`}
                            >
                                {day.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Itinerary cards */}
            <ScrollView>
                {trip?.tripItinerary?.days.map((day: any) => (
                    <ItineraryCard
                        key={day.id}
                        tripId={trip.id}
                        dayId={day.id}
                        subHeading={day.subHeading}
                        openSheet={openSheet}
                        closeSheet={closeSheet}
                        setBottomSheetContent={setBottomSheetContent}
                        setSnapPoints={setSnapPoints}
                    />
                ))}
            </ScrollView>

            {/* Confirmation Modal */}
            <Modal
                animationType="fade"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 items-center justify-center bg-black/50">
                    <View className="w-11/12 rounded-xl bg-white p-6">
                        <Text className="mb-4 text-lg font-semibold text-gray-800">Fill itinerary with AI?</Text>
                        <Text className="mb-6 text-gray-600">
                            This will automatically populate your itinerary for all days using AI. Do you want to
                            continue?
                        </Text>
                        <View className="flex-row justify-end space-x-3">
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text className="text-gray-500">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleAIFill}>
                                <Text className="font-semibold text-[#ffaaec]">Yes, do it</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
