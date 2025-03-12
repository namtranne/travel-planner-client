import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import TripOverviewSection from './TripOverviewSection';

export default function OverviewTab({
    trip,
    openSheet,
    closeSheet,
    setBottomSheetContent
}: {
    trip: any;
    openSheet: () => void;
    closeSheet: () => void;
    setBottomSheetContent: (content: React.ReactNode) => void;
}) {
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
                    />
                ))}
            </View>
        </TouchableWithoutFeedback>
    );
}
