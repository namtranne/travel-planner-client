import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
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

    return (
        <View className="flex-1 py-4 pt-0">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4 bg-white px-2 py-4">
                <View className="mr-6 rounded-full bg-black p-2">
                    <Iconify icon="mdi:calendar-edit" color="white" width="24" height="24" />
                </View>
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
        </View>
    );
}
