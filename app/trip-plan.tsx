import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import moment from 'moment';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Iconify from 'react-native-iconify';

import DateRangePicker from '@/src/components/Planning/DateRangePicker/src/DateRangePicker';
import BudgetTab from '@/src/components/TripPlanTabs/BudgetTab';
import ExploreTab from '@/src/components/TripPlanTabs/ExploreTab';
import ItineraryTab from '@/src/components/TripPlanTabs/ItineraryTab';
import OverviewTab from '@/src/components/TripPlanTabs/OverviewTab';
import BackButton from '@/src/components/ui/BackButton';
import Button from '@/src/components/ui/CommonButton';
import { useTripDetails, useUpdateTrip } from '@/src/hooks/use-trip';
import { convertDateFormat } from '@/src/utils/DateUtil';

const TripPlanTabs = ['Overview', 'Itinerary', 'Explore', 'Budget'];
const TabComponents: { [key: string]: React.ComponentType<any> } = {
    Overview: OverviewTab,
    Itinerary: ItineraryTab,
    Explore: ExploreTab,
    Budget: BudgetTab
};
export default function TripScreen() {
    const [selectedTab, setSelectedTab] = useState(TripPlanTabs[0] || 'Overview');
    const TabContent = TabComponents[selectedTab] || OverviewTab;
    const [tripState, setTripState] = useState({
        title: '',
        startDate: '',
        endDate: ''
    });
    const [onEnteringDate, setOnEnteringDate] = useState(false);
    const { isLoading, trip } = useTripDetails(1);
    const { isPending, updateTrip } = useUpdateTrip();
    const tripTitleRef = useRef<TextInput>(null);

    // Bottom Sheet Management
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [bottomSheetContent, setBottomSheetContent] = useState<React.ReactNode>(null);
    const openSheet = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);
    const closeSheet = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    useEffect(() => {
        bottomSheetRef.current?.close();
    }, []);

    useEffect(() => {
        if (trip) {
            setTripState({
                title: trip.title,
                startDate: convertDateFormat(trip.startDate),
                endDate: convertDateFormat(trip.endDate)
            });
        }
    }, [trip]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#60ABEF" />
            </View>
        );
    }

    const options = [
        {
            icon: 'mdi:pencil',
            label: 'Edit title',
            action: () => {
                tripTitleRef.current?.focus();
                closeSheet();
            }
        },
        { icon: 'weui:share-outlined', label: 'Share', action: () => {} },
        { icon: 'mdi:trash-can', label: 'Delete this trip', action: () => {} }
    ];

    return (
        <GestureHandlerRootView
            style={{
                flex: 1
            }}
        >
            <TouchableWithoutFeedback onPress={closeSheet}>
                <View style={{ flex: 1 }}>
                    <View className="flex-1 bg-gray-100">
                        {/* Fixed Header & Tabs */}
                        <SafeAreaView className="bg-blue-400">
                            <View className="rounded-b-3xl bg-blue-400">
                                <BackButton color="white" />
                                <View className="px-6">
                                    <TextInput
                                        ref={tripTitleRef}
                                        className="mt-2 text-2xl font-bold text-white"
                                        value={tripState.title}
                                        onChangeText={(text) => {
                                            if (!isPending) setTripState((prev) => ({ ...prev, title: text }));
                                        }}
                                        onBlur={() =>
                                            updateTrip({ tripId: 1, updateTripReq: { title: tripState.title } })
                                        }
                                    />
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center gap-2">
                                            <TouchableOpacity
                                                className="flex-row items-center text-center font-inter text-xs"
                                                onPress={() => setOnEnteringDate(true)}
                                            >
                                                <Iconify icon="solar:calendar-linear" size={16} color="white" />
                                                <Text className="ml-2 text-xs text-white">
                                                    {tripState.startDate} - {tripState.endDate}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View className="flex-row items-center justify-center gap-2">
                                            <View className="-ml-2 flex-row items-center justify-center">
                                                {[...Array(3)].map((_, index) => (
                                                    <Image
                                                        key={index}
                                                        source={{
                                                            uri: 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg'
                                                        }}
                                                        className="h-7 w-7 rounded-full border-2 border-white"
                                                        style={{ marginLeft: -36 / 3 }}
                                                    />
                                                ))}
                                                <View
                                                    className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e3f2fd]"
                                                    style={{ marginLeft: -36 / 3 }}
                                                >
                                                    <Text className="text-xs font-bold text-[#60ABEF]">+2</Text>
                                                </View>
                                            </View>
                                            <Button
                                                text="Share"
                                                onPress={() => {}}
                                                additionalStyle="bg-black px-3 py-1 ml-2"
                                            />
                                            <TouchableOpacity
                                                className="ml-2"
                                                onPress={() => {
                                                    setBottomSheetContent(
                                                        <View className="rounded-t-3xl bg-white p-4">
                                                            <Text className="text-center text-base font-bold">
                                                                Trip settings
                                                            </Text>
                                                            {options.map(({ icon, label, action }, index) => (
                                                                <TouchableOpacity
                                                                    key={index}
                                                                    className="flex-row items-center gap-2 p-3"
                                                                    onPress={() => action()}
                                                                >
                                                                    <Iconify icon={icon} size={20} color="black" />
                                                                    <Text className="text-base">{label}</Text>
                                                                </TouchableOpacity>
                                                            ))}
                                                        </View>
                                                    );
                                                    openSheet();
                                                }}
                                            >
                                                <Iconify icon="bi:three-dots" size={18} color="#eae9e9" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View className="mt-4 flex-row justify-between">
                                {TripPlanTabs.map((tab, index) => {
                                    const isActive = selectedTab === tab;
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => setSelectedTab(tab)}
                                            className={`flex-1 items-center py-3 ${
                                                isActive ? 'bg-white' : 'bg-transparent'
                                            } rounded-t-xl`}
                                        >
                                            <Text
                                                className={`font-semibold ${isActive ? 'text-[#60ABEF]' : 'text-white'}`}
                                            >
                                                {tab}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </SafeAreaView>

                        {/* Tab content */}
                        <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
                            <TabContent
                                openSheet={openSheet}
                                closeSheet={closeSheet}
                                setBottomSheetContent={setBottomSheetContent}
                            />
                        </ScrollView>

                        <DateRangePicker
                            displayedDate={moment(tripState.startDate)}
                            startDate={moment(tripState.startDate)}
                            endDate={moment(tripState.endDate)}
                            onChange={(data: any) => {}}
                            open={onEnteringDate}
                            setOpen={setOnEnteringDate}
                            range
                        />
                    </View>
                    <BottomSheet
                        ref={bottomSheetRef}
                        index={-1}
                        snapPoints={['40%']}
                        enablePanDownToClose
                        onChange={handleSheetChanges}
                        backgroundStyle={{
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            borderWidth: 1,
                            borderColor: '#e8e7e7'
                        }}
                    >
                        <BottomSheetView>{bottomSheetContent}</BottomSheetView>
                    </BottomSheet>
                </View>
            </TouchableWithoutFeedback>
        </GestureHandlerRootView>
    );
}
