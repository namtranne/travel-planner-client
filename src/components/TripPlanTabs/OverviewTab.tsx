import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import Iconify from 'react-native-iconify';

import { useCreateTripOverviewSection } from '@/src/hooks/use-trip';
import { SectionType } from '@/src/services/types';

import Button from '../ui/CommonButton';
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
    const { isPending, createTripOverviewSection } = useCreateTripOverviewSection();
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className="py-4">
                {trip.tripOverview.sections.map((section: any, index: number) => (
                    <TripOverviewSection
                        tripId={trip.id}
                        sectionId={section.id}
                        key={index}
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
                        <Iconify icon="ic:baseline-plus" color="white" />
                    </Button>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
