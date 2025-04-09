import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { router, useLocalSearchParams } from 'expo-router';
import moment from 'moment';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Iconify from 'react-native-iconify';

import DateRangePicker from '@/src/components/Planning/DateRangePicker/src/DateRangePicker';
import BudgetTab from '@/src/components/TripPlanTabs/BudgetTab';
import ExploreTab from '@/src/components/TripPlanTabs/ExploreTab';
import { InviteTripmatesSheet } from '@/src/components/TripPlanTabs/InviteTripmatesSheet';
import ItineraryTab from '@/src/components/TripPlanTabs/ItineraryTab';
import OverviewTab from '@/src/components/TripPlanTabs/OverviewTab';
import { TripCollaboratorsSheet } from '@/src/components/TripPlanTabs/TripCollaboratorsSheet';
import BackButton from '@/src/components/ui/BackButton';
import Button from '@/src/components/ui/CommonButton';
import { useUser } from '@/src/hooks/use-authenticate';
import { useDeleteTrip, useLeaveTrip, useTripDetails, useUpdateTrip } from '@/src/hooks/use-trip';

const TripPlanTabs = ['Overview', 'Itinerary', 'Explore', 'Budget'];
interface TabContentProps {
    trip: any;
    openSheet: () => void;
    closeSheet: () => void;
    setBottomSheetContent: (content: React.ReactNode) => void;
    setSnapPoints: (points: string[]) => void;
    setOnEnteringDate?: (value: boolean) => void;
}

const TabComponents: { [key: string]: React.ComponentType<TabContentProps> } = {
    Overview: OverviewTab,
    Itinerary: ItineraryTab,
    Explore: ExploreTab,
    Budget: BudgetTab
};

interface Participant {
    user: {
        avatarUrl?: string;
        name: string;
    };
}

export default function TripScreen() {
    const [selectedTab, setSelectedTab] = useState(TripPlanTabs[0] || 'Overview');
    const { id: tripId } = useLocalSearchParams<{ id: string }>();
    const TabContent = TabComponents[selectedTab] || OverviewTab;
    const [tripState, setTripState] = useState({
        title: '',
        startDate: moment(),
        endDate: moment()
    });
    const [onEnteringDate, setOnEnteringDate] = useState(false);
    const [displayParticipants, setDisplayParticipants] = useState<Participant[]>([]);
    const [extraParticipants, setExtraParticipants] = useState(0);
    const tripTitleRef = useRef<TextInput>(null);

    const { isLoading: isLoadingUser, user } = useUser();
    const { isLoading: isLoadingTripDetails, trip } = useTripDetails(Number(tripId));
    const { isPending: isPendingUpdateTrip, updateTrip } = useUpdateTrip();
    const { isPending: isPendingDeleteTrip, deleteTrip } = useDeleteTrip();
    const { isPending: isPendingLeaveTrip, leaveTrip } = useLeaveTrip();

    // Bottom Sheet Management
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [bottomSheetContent, setBottomSheetContent] = useState<React.ReactNode>(null);
    const [snapPoints, setSnapPoints] = useState(['40%']);
    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                opacity={0.8}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                pressBehavior="close"
            />
        ),
        []
    );
    const openSheet = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);
    const closeSheet = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);
    const handleSheetChanges = useCallback(() => {}, []);

    useEffect(() => {
        if (trip) {
            setTripState({
                title: trip.title,
                startDate: moment(trip.startDate),
                endDate: moment(trip.endDate)
            });
            setDisplayParticipants(trip.participants.slice(0, 3));
            setExtraParticipants(trip.participants.length - 3);
        }
    }, [trip]);

    const handleDateChange = (data: any) => {
        if (data.startDate && data.endDate) {
            setTripState((prev) => ({
                ...prev,
                startDate: data.startDate,
                endDate: data.endDate
            }));
        } else if (data.startDate) {
            setTripState((prev) => ({
                ...prev,
                startDate: data.startDate
            }));
        } else if (data.endDate) {
            setTripState((prev) => ({
                ...prev,
                endDate: data.endDate
            }));
        }
    };

    const options = useMemo(
        () => [
            {
                icon: 'mdi:pencil',
                label: 'Edit title',
                action: () => {
                    tripTitleRef.current?.focus();
                    closeSheet();
                }
            },
            { icon: 'weui:share-outlined', label: 'Share', action: () => {} },
            {
                icon: 'mdi:trash-can',
                label: trip && user && user.id === trip.owner.id ? 'Delete this trip' : 'Leave this trip',
                action: () => {
                    if (trip && user && user.id === trip.owner.id) deleteTrip({ tripId: Number(tripId) });
                    else if (trip && user && user.id !== trip.owner.id)
                        Alert.alert('Leave trip', `Are you sure you want to leave this trip ?`, [
                            {
                                text: 'Cancel',
                                style: 'cancel'
                            },
                            {
                                text: 'Yes',
                                onPress: () => {
                                    leaveTrip(
                                        { tripId: Number(tripId) },
                                        {
                                            onSuccess: () => {
                                                closeSheet();
                                                router.navigate('../home-tabs/trips');
                                            }
                                        }
                                    );
                                }
                            }
                        ]);
                }
            }
        ],
        [closeSheet, deleteTrip, trip, user, tripId, leaveTrip]
    );

    if (isLoadingTripDetails || isLoadingUser) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#60ABEF" />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <GestureHandlerRootView style={{ flex: 1 }}>
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
                                                if (!isPendingUpdateTrip && !isPendingDeleteTrip && !isPendingLeaveTrip)
                                                    setTripState((prev) => ({ ...prev, title: text }));
                                            }}
                                            onBlur={() =>
                                                updateTrip({
                                                    tripId: Number(tripId),
                                                    updateTripReq: { title: tripState.title }
                                                })
                                            }
                                            multiline
                                        />
                                        <View className="mt-2 flex-row items-center justify-between">
                                            <View className="flex-row items-center gap-2">
                                                <TouchableOpacity
                                                    className="flex-row items-center text-center font-inter text-xs"
                                                    onPress={() => setOnEnteringDate(true)}
                                                >
                                                    <Iconify icon="solar:calendar-linear" size={16} color="white" />
                                                    <Text className="ml-2 text-xs text-white">
                                                        {tripState.startDate.format('DD MMM')} -{' '}
                                                        {tripState.endDate.format('DD MMM')}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View className="flex-row items-center justify-center space-x-2">
                                                <TouchableOpacity
                                                    className="-ml-2 flex-row items-center justify-center"
                                                    onPress={() => {
                                                        setBottomSheetContent(
                                                            <TripCollaboratorsSheet
                                                                tripId={trip.id}
                                                                ownerId={trip.owner.id}
                                                                openInviteTripmatesSheet={() => {
                                                                    setBottomSheetContent(
                                                                        <InviteTripmatesSheet
                                                                            tripId={trip.id}
                                                                            joinedParticipants={trip.participants}
                                                                        />
                                                                    );
                                                                    openSheet();
                                                                    setSnapPoints(['70%']);
                                                                }}
                                                            />
                                                        );
                                                        openSheet();
                                                        setSnapPoints(['50%']);
                                                    }}
                                                >
                                                    {displayParticipants.map((participant, index) => (
                                                        <Avatar
                                                            key={index}
                                                            rounded
                                                            size={30}
                                                            source={
                                                                participant.user.avatarUrl
                                                                    ? { uri: participant.user.avatarUrl }
                                                                    : undefined
                                                            }
                                                            title={
                                                                (participant.user.name?.[0]?.toUpperCase() ?? '') ||
                                                                undefined
                                                            }
                                                            titleStyle={{ fontSize: 12 }}
                                                            containerStyle={{
                                                                borderWidth: 2,
                                                                borderColor: 'white',
                                                                backgroundColor: 'gray',
                                                                marginLeft: index !== 0 ? -8 : 0
                                                            }}
                                                        />
                                                    ))}
                                                    {extraParticipants > 0 && (
                                                        <Avatar
                                                            rounded
                                                            size={30}
                                                            title={`+${extraParticipants}`}
                                                            titleStyle={{ fontSize: 12 }}
                                                            containerStyle={{
                                                                marginLeft: -8,
                                                                borderWidth: 2,
                                                                borderColor: 'white',
                                                                backgroundColor: 'gray'
                                                            }}
                                                        />
                                                    )}
                                                </TouchableOpacity>
                                                <Button
                                                    text="Share"
                                                    onPress={() => {
                                                        setBottomSheetContent(
                                                            <InviteTripmatesSheet
                                                                tripId={trip.id}
                                                                joinedParticipants={trip.participants}
                                                            />
                                                        );
                                                        openSheet();
                                                        setSnapPoints(['70%']);
                                                    }}
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
                                                                        <Iconify
                                                                            icon={icon}
                                                                            size={20}
                                                                            color="black"
                                                                            className="text-black"
                                                                        />
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
                            <View className="flex-1 bg-gray-100">
                                <TabContent
                                    trip={trip}
                                    openSheet={openSheet}
                                    closeSheet={closeSheet}
                                    setBottomSheetContent={setBottomSheetContent}
                                    setSnapPoints={setSnapPoints}
                                    setOnEnteringDate={setOnEnteringDate}
                                />
                            </View>

                            <DateRangePicker
                                displayedDate={tripState.startDate}
                                startDate={tripState.startDate}
                                endDate={tripState.endDate}
                                onChange={handleDateChange}
                                open={onEnteringDate}
                                setOpen={setOnEnteringDate}
                                handleClose={() => {
                                    updateTrip({
                                        tripId: Number(tripId),
                                        updateTripReq: {
                                            startDate: tripState.startDate.format('YYYY-MM-DD'),
                                            endDate: tripState.endDate.format('YYYY-MM-DD')
                                        }
                                    });
                                }}
                                range
                            />
                        </View>
                    </View>
                    <BottomSheet
                        ref={bottomSheetRef}
                        index={-1}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                        backgroundStyle={{
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            borderWidth: 1,
                            borderColor: '#d1d0d0'
                        }}
                        backdropComponent={renderBackdrop}
                    >
                        <BottomSheetView>{bottomSheetContent}</BottomSheetView>
                    </BottomSheet>
                </GestureHandlerRootView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
