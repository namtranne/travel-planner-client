import { useTranslation } from 'react-i18next';
import { Keyboard, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Iconify from 'react-native-iconify';

import { useCreateTripOverviewSection } from '@/src/hooks/use-trip';
import { SectionType } from '@/src/services/types';

import Button from '../ui/CommonButton';
import { AddReservationSheet } from './AddReservationSheet';
import TripOverviewSection from './TripOverviewSection';

export default function OverviewTab({
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
    const { t } = useTranslation();
    const { isPending, createTripOverviewSection } = useCreateTripOverviewSection();
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className="py-4">
                <View className="mb-4 border-y border-gray-200 bg-white p-4 shadow-sm">
                    <Text className="mb-2 text-lg font-bold">{t('Reservations and attachments')}</Text>
                    <ScrollView className="flex-row space-x-6" horizontal showsHorizontalScrollIndicator>
                        {[
                            {
                                name: t('Flight'),
                                icon: 'mdi:airplane',
                                handlePress: () => {
                                    setBottomSheetContent(
                                        <AddReservationSheet reservationType="Flight" tripId={trip.id} />
                                    );
                                    openSheet();
                                    setSnapPoints(['70%']);
                                }
                            },
                            {
                                name: t('Cruise'),
                                icon: 'mdi:ship-wheel',
                                handlePress: () => {
                                    setBottomSheetContent(
                                        <AddReservationSheet reservationType="Cruise" tripId={trip.id} />
                                    );
                                    openSheet();
                                    setSnapPoints(['70%']);
                                }
                            },
                            {
                                name: t('Bus'),
                                icon: 'mdi:bus',
                                handlePress: () => {
                                    setBottomSheetContent(
                                        <AddReservationSheet reservationType="Bus" tripId={trip.id} />
                                    );
                                    openSheet();
                                    setSnapPoints(['70%']);
                                }
                            },
                            {
                                name: t('Ferry'),
                                icon: 'mdi:ferry',
                                handlePress: () => {
                                    setBottomSheetContent(
                                        <AddReservationSheet reservationType="Ferry" tripId={trip.id} />
                                    );
                                    openSheet();
                                    setSnapPoints(['70%']);
                                }
                            },
                            {
                                name: t('Train'),
                                icon: 'mdi:train',
                                handlePress: () => {
                                    setBottomSheetContent(
                                        <AddReservationSheet reservationType="Train" tripId={trip.id} />
                                    );
                                    openSheet();
                                    setSnapPoints(['70%']);
                                }
                            },
                            {
                                name: t('Lodging'),
                                icon: 'mdi:bed',
                                handlePress: () => {
                                    setBottomSheetContent(
                                        <AddReservationSheet reservationType="Lodging" tripId={trip.id} />
                                    );
                                    openSheet();
                                    setSnapPoints(['70%']);
                                }
                            },
                            { name: t('Restaurant'), icon: 'mdi:silverware-fork-knife' },
                            { name: t('Attachment'), icon: 'mdi:paperclip' }
                        ].map((item, index) => (
                            <TouchableOpacity key={index} className="flex items-center" onPress={item.handlePress}>
                                <Iconify
                                    icon={item.icon}
                                    size={24}
                                    color="black"
                                    className="font-extrabold text-black"
                                />
                                <Text className="mt-1 text-[10px]">{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 200 }} keyboardShouldPersistTaps="handled">
                    {trip.tripOverview.sections.map((section: any) => (
                        <TripOverviewSection
                            tripId={trip.id}
                            sectionId={section.id}
                            key={section.id}
                            titleSection={section.title}
                            openSheet={openSheet}
                            closeSheet={closeSheet}
                            setBottomSheetContent={setBottomSheetContent}
                            setSnapPoints={setSnapPoints}
                        />
                    ))}
                    <View className="px-4">
                        <Button
                            text={t('New section')}
                            onPress={() =>
                                createTripOverviewSection({
                                    tripId: trip.id,
                                    createTripOverviewSectionReq: {
                                        title: 'Add a title',
                                        sectionType: SectionType.COMMON
                                    }
                                })
                            }
                            additionalStyle="flex-row text-base bg-[#60ABEF] w-[150px] rounded-2xl"
                            isPending={isPending}
                        >
                            <Iconify className="text-white" icon="ic:baseline-plus" color="white" />
                        </Button>
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}
