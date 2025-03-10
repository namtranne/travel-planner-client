import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import TripOverviewSection from './TripOverviewSection';

export default function OverviewTab({
    openSheet,
    closeSheet,
    setBottomSheetContent
}: {
    openSheet: () => void;
    closeSheet: () => void;
    setBottomSheetContent: (content: React.ReactNode) => void;
}) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className="py-4">
                <TripOverviewSection
                    titleSection="Notes"
                    openSheet={openSheet}
                    closeSheet={closeSheet}
                    setBottomSheetContent={setBottomSheetContent}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}
