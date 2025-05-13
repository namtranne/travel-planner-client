import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

import { useAutofillTripItinerary } from '@/src/hooks/use-trip';
import { convertDateStringFormat } from '@/src/utils/DateTimeUtil';

import ItineraryCard from './ItineraryCard';

export default function ItineraryScreen({
    trip,
    openSheet,
    closeSheet,
    setBottomSheetContent,
    setSnapPoints,
    setOnEnteringDate
}: {
    trip: any;
    openSheet: () => void;
    closeSheet: () => void;
    setBottomSheetContent: (content: React.ReactNode) => void;
    setSnapPoints: (points: string[]) => void;
    setOnEnteringDate?: (value: boolean) => void;
}) {
    const { t } = useTranslation();
    const [selectedDayId, setSelectedDayId] = useState(trip?.tripItinerary?.days[0].id);
    const [modalVisible, setModalVisible] = useState(false);

    const { isPending: isPendingAutofillTripItinerary, autofillTripItinerary } = useAutofillTripItinerary();

    const handleAutoFill = () => {
        autofillTripItinerary({
            tripId: trip.id,
            autofillItineraryReq: {
                startDate: convertDateStringFormat(trip.startDate) || '',
                endDate: convertDateStringFormat(trip.endDate) || ''
            }
        });
        setModalVisible(false);
    };

    if (isPendingAutofillTripItinerary) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#60ABEF" />
            </View>
        );
    }

    return (
        <View className="flex-1">
            {/* Itinerary tabs */}
            <View className="bg-white px-2 py-4">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="fixed ">
                    <TouchableOpacity
                        className="mr-2 rounded-full bg-black p-2"
                        onPress={() => setOnEnteringDate && setOnEnteringDate(true)}
                    >
                        <Iconify className="text-white" icon="mdi:calendar-edit" width="24" height="24" />
                    </TouchableOpacity>
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
                        dayTitle={day.title}
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
                        <Text className="mb-4 text-lg font-semibold text-gray-800">{t('Fill itinerary with AI?')}</Text>
                        <Text className="mb-6 text-gray-600">
                            {t(
                                'This will automatically populate your itinerary for all days using AI. Do you want to continue?'
                            )}
                        </Text>
                        <View className="flex-row justify-end space-x-3">
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                disabled={isPendingAutofillTripItinerary}
                            >
                                <Text className="text-gray-500">{t('Cancel')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleAutoFill} disabled={isPendingAutofillTripItinerary}>
                                <Text className="font-semibold text-[#ffaaec]">{t('Yes, do it')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
