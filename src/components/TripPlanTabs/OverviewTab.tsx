import { Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Iconify from 'react-native-iconify';

import { useCreateTripOverviewSection } from '@/src/hooks/use-trip';
import { SectionType } from '@/src/services/types';

import Button from '../ui/CommonButton';
import TripOverviewSection from './TripOverviewSection';

const reservationData = [
    { name: 'Flight', icon: 'mdi:airplane' },
    { name: 'Lodging', icon: 'mdi:bed' },
    { name: 'Rental car', icon: 'mdi:car' },
    { name: 'Restaurant', icon: 'mdi:silverware-fork-knife' },
    { name: 'Attachment', icon: 'mdi:paperclip' },
    { name: 'Other', icon: 'mdi:dots-horizontal' }
];

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
    const { isPending, createTripOverviewSection } = useCreateTripOverviewSection();
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className="py-4">
                <View className="mb-4 border-y border-gray-200 bg-white p-4 shadow-sm">
                    <Text className="mb-2 text-lg font-bold">Reservations and attachments</Text>
                    <View className="flex-row flex-wrap justify-between">
                        {reservationData.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                className="flex items-center"
                                onPress={() => {
                                    setBottomSheetContent(
                                        <View className="bg-white p-4">
                                            <Text className="text-center text-base font-bold">
                                                Reservations and attachments
                                            </Text>
                                            {reservationData
                                                .concat([
                                                    { name: 'Train', icon: 'mdi:train' },
                                                    { name: 'Bus', icon: 'mdi:bus' },
                                                    { name: 'Ferry', icon: 'mdi:ferry' },
                                                    { name: 'Cruise', icon: 'mdi:ship-wheel' }
                                                ])
                                                .map((innerItem, innerIndex) => (
                                                    <TouchableOpacity
                                                        key={innerIndex}
                                                        className="flex-row items-center py-2"
                                                    >
                                                        <Iconify
                                                            icon={innerItem.icon}
                                                            className="mr-4 text-xl text-black"
                                                            color="black"
                                                        />
                                                        <Text className="flex-1 text-sm">{innerItem.name}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                        </View>
                                    );
                                    openSheet();
                                }}
                            >
                                <Iconify
                                    icon={item.icon}
                                    size={24}
                                    color="black"
                                    className="font-extrabold text-black"
                                />
                                <Text className="mt-1 text-[10px]">{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
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
                        text="New section"
                        onPress={() =>
                            createTripOverviewSection({
                                tripId: trip.id,
                                createTripOverviewSectionReq: { title: 'Add a title', sectionType: SectionType.COMMON }
                            })
                        }
                        additionalStyle="flex-row text-base bg-[#60ABEF] w-[150px] rounded-2xl"
                        isPending={isPending}
                    >
                        <Iconify className="text-white" icon="ic:baseline-plus" color="white" />
                    </Button>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
