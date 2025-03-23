import { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

import ItineraryCard from './ItineraryCard';

const days = [
    { label: 'Tue', date: '3/4' },
    { label: 'Wed', date: '3/5' },
    { label: 'Thu', date: '3/6' },
    { label: 'Fri', date: '3/7' },
    { label: 'Sat', date: '3/8' }
];

export default function ItineraryScreen() {
    const [selected, setSelected] = useState(days[0]?.date || '');
    const [modalVisible, setModalVisible] = useState(false);

    const handleAIFill = () => {
        // Here you'd call your AI itinerary fill logic
        console.log('AI itinerary filling triggered');
        setModalVisible(false);
    };

    return (
        <View className="flex-1 py-4 pt-0">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4 bg-white px-2 py-4">
                <View className="mr-2 rounded-full bg-black p-2">
                    <Iconify icon="mdi:calendar-edit" color="white" width="24" height="24" />
                </View>
                <TouchableOpacity className="mr-2 rounded-full bg-[#ffaaec] p-2" onPress={() => setModalVisible(true)}>
                    <Iconify icon="mdi:magic" color="white" width="24" height="24" />
                </TouchableOpacity>
                {days.map((day) => (
                    <TouchableOpacity
                        key={day.date}
                        className={`mx-2 rounded-lg px-4 py-2 ${selected === day.date ? 'bg-gray-400' : 'bg-gray-100'}`}
                        onPress={() => setSelected(day.date)}
                    >
                        <Text className={`font-semibold ${selected === day.date ? 'text-black' : 'text-gray-500'}`}>
                            {day.label} {day.date}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ItineraryCard />

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
