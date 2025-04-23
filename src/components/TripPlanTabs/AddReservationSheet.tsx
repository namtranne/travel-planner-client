import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import * as Clipboard from 'expo-clipboard';
import type React from 'react';
import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';
import Toast from 'react-native-toast-message';
import type { DateType } from 'react-native-ui-datepicker';
import DateTimePicker from 'react-native-ui-datepicker';

import {
    useVerifyCruiseEmailForwarded,
    useVerifyFlightEmailForwarded,
    useVerifyLodgingEmailForwarded,
    useVerifyTransitEmailForwarded
} from '@/src/hooks/use-trip';
import { TransitType } from '@/src/services/types';

import { ChangeCurrency } from './ChangeCurrency';
import CruiseReservationCard from './CruiseReservationCard';
import FlightReservationCard from './FlightReservationCard';
import LodgingReservationCard from './LodgingReservationCard';
import TransitReservationCard from './TransitReservationCard';

export enum AddReservationSheetView {
    AddReservation,
    ForwardYourConfirmation,
    CreateReservationManually,
    SelectDate,
    ChangeCurrencyView
}

const ChangeCurrencyView = ({
    currencySymbol,
    handleBack,
    setCurrencySymbol
}: {
    currencySymbol: string;
    handleBack: () => void;
    setCurrencySymbol: (symbol: string) => void;
}) => {
    return (
        <ChangeCurrency currencySymbol={currencySymbol} handleBack={handleBack} setCurrencySymbol={setCurrencySymbol} />
    );
};

const SelectDate = ({
    setCurrentView,
    dateStates,
    dateType,
    setDateStates
}: {
    setCurrentView: React.Dispatch<React.SetStateAction<AddReservationSheetView>>;
    dateStates: any;
    dateType: string;
    setDateStates: React.Dispatch<React.SetStateAction<any>>;
}) => {
    const [selectedDate, setSelectedDate] = useState<Date>(dateStates[dateType]);

    const handleTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
        if (selectedTime) {
            const updatedDate = selectedDate;
            updatedDate.setHours(selectedTime.getHours());
            updatedDate.setMinutes(selectedTime.getMinutes());
            setSelectedDate(updatedDate);

            setDateStates({
                ...dateStates,
                [dateType]: updatedDate
            });
        }
    };

    const handleDateChange = (params: { date: DateType }) => {
        const date = params.date as Date | undefined;
        if (date) {
            // Keep the original time (hour, minute) from `selectedDate`
            const updatedDate = new Date(date);
            updatedDate.setHours(selectedDate.getHours());
            updatedDate.setMinutes(selectedDate.getMinutes());

            setSelectedDate(updatedDate);
            setDateStates({
                ...dateStates,
                [dateType]: updatedDate
            });
        }
    };

    return (
        <View className="bg-white px-4">
            {/* Header */}
            <View className="relative flex-row items-center justify-center">
                <TouchableOpacity
                    onPress={() => setCurrentView(AddReservationSheetView.CreateReservationManually)}
                    className="absolute left-4"
                >
                    <Text className="text-base text-black">←</Text>
                </TouchableOpacity>
                <Text className="text-center text-base font-bold">Select date time</Text>
            </View>
            {/* Options List */}
            <ScrollView className="mt-2">
                <View className="items-center">
                    <DateTimePicker
                        mode="single"
                        date={selectedDate}
                        onChange={handleDateChange}
                        styles={{
                            today: { borderColor: '#60ABEF', borderWidth: 1, borderRadius: 50 },
                            selected: { backgroundColor: '#60ABEF', borderRadius: 50 },
                            selected_label: { color: 'white' }
                        }}
                    />
                    <RNDateTimePicker
                        value={new Date(dateStates[dateType])}
                        mode="time"
                        display="spinner"
                        onChange={handleTimeChange}
                        is24Hour
                        style={{ alignSelf: 'center' }}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const CreateReservationManually = ({
    reservationType,
    setCurrentView,
    dateStates,
    setSelectedDateType,
    tripId,
    currencySymbol,
    isHided
}: {
    reservationType: string;
    setCurrentView: React.Dispatch<React.SetStateAction<AddReservationSheetView>>;
    setSelectedDateType: React.Dispatch<React.SetStateAction<string>>;
    dateStates: any;
    tripId: number;
    currencySymbol: string;
    isHided: boolean;
}) => {
    const [isCreateClicked, setIsCreateClicked] = useState(false);

    const openSelectDateView = () => {
        setCurrentView(AddReservationSheetView.SelectDate);
    };
    const openChangeCurrencyView = () => {
        setCurrentView(AddReservationSheetView.ChangeCurrencyView);
    };

    const renderReservationCard = () => {
        switch (reservationType) {
            case 'Flight':
                return (
                    <FlightReservationCard
                        isCreateManually
                        dateStates={dateStates}
                        openSelectDateView={openSelectDateView}
                        currencySymbol={currencySymbol}
                        openChangeCurrencyView={openChangeCurrencyView}
                        setSelectedDateType={setSelectedDateType}
                        isCreateClicked={isCreateClicked}
                        setIsCreateClicked={setIsCreateClicked}
                        tripId={tripId}
                    />
                );
            case 'Cruise':
                return (
                    <CruiseReservationCard
                        isCreateManually
                        dateStates={dateStates}
                        openSelectDateView={openSelectDateView}
                        currencySymbol={currencySymbol}
                        openChangeCurrencyView={openChangeCurrencyView}
                        setSelectedDateType={setSelectedDateType}
                        isCreateClicked={isCreateClicked}
                        setIsCreateClicked={setIsCreateClicked}
                        tripId={tripId}
                    />
                );
            case 'Lodging':
                return (
                    <LodgingReservationCard
                        isCreateManually
                        dateStates={dateStates}
                        openSelectDateView={openSelectDateView}
                        currencySymbol={currencySymbol}
                        openChangeCurrencyView={openChangeCurrencyView}
                        setSelectedDateType={setSelectedDateType}
                        isCreateClicked={isCreateClicked}
                        setIsCreateClicked={setIsCreateClicked}
                        tripId={tripId}
                    />
                );
            case 'Train':
                return (
                    <TransitReservationCard
                        isCreateManually
                        dateStates={dateStates}
                        openSelectDateView={openSelectDateView}
                        currencySymbol={currencySymbol}
                        openChangeCurrencyView={openChangeCurrencyView}
                        setSelectedDateType={setSelectedDateType}
                        isCreateClicked={isCreateClicked}
                        setIsCreateClicked={setIsCreateClicked}
                        tripId={tripId}
                        transitType={TransitType.TRAIN}
                    />
                );
            case 'Ferry':
                return (
                    <TransitReservationCard
                        isCreateManually
                        dateStates={dateStates}
                        openSelectDateView={openSelectDateView}
                        currencySymbol={currencySymbol}
                        openChangeCurrencyView={openChangeCurrencyView}
                        setSelectedDateType={setSelectedDateType}
                        isCreateClicked={isCreateClicked}
                        setIsCreateClicked={setIsCreateClicked}
                        tripId={tripId}
                        transitType={TransitType.FERRY}
                    />
                );
            case 'Bus':
                return (
                    <TransitReservationCard
                        isCreateManually
                        dateStates={dateStates}
                        openSelectDateView={openSelectDateView}
                        currencySymbol={currencySymbol}
                        openChangeCurrencyView={openChangeCurrencyView}
                        setSelectedDateType={setSelectedDateType}
                        isCreateClicked={isCreateClicked}
                        setIsCreateClicked={setIsCreateClicked}
                        tripId={tripId}
                        transitType={TransitType.BUS}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <View className="bg-white px-4" style={{ display: isHided ? 'none' : 'flex' }}>
            <View className="relative flex-row items-center justify-center">
                <TouchableOpacity
                    onPress={() => setCurrentView(AddReservationSheetView.AddReservation)}
                    className="absolute left-4"
                >
                    <Text className="text-base text-black">←</Text>
                </TouchableOpacity>
                <Text className="text-center text-base font-bold">Add reservation</Text>
                <TouchableOpacity className="absolute right-2" onPress={() => setIsCreateClicked(true)}>
                    <Text className="text-[#60ABEF]">Create</Text>
                </TouchableOpacity>
            </View>
            <View className="mt-4 flex-row justify-center">{renderReservationCard()}</View>
        </View>
    );
};

const ForwardYourConfirmation = ({
    setCurrentView,
    reservationType,
    tripId
}: {
    setCurrentView: React.Dispatch<React.SetStateAction<AddReservationSheetView>>;
    reservationType: string;
    tripId: number;
}) => {
    const { isPending: isPendingVerifyFlightEmailForwarded, verifyFlightEmailForwarded } =
        useVerifyFlightEmailForwarded();
    const { isPending: isPendingVerifyCruiseEmailForwarded, verifyCruiseEmailForwarded } =
        useVerifyCruiseEmailForwarded();
    const { isPending: isPendingVerifyLodgingEmailForwarded, verifyLodgingEmailForwarded } =
        useVerifyLodgingEmailForwarded();
    const { isPending: isPendingVerifyTransitEmailForwarded, verifyTransitEmailForwarded } =
        useVerifyTransitEmailForwarded();

    const handleVerifyEmailForwarded = async () => {
        switch (reservationType) {
            case 'Flight':
                verifyFlightEmailForwarded(
                    { tripId },
                    {
                        onSuccess: () =>
                            Toast.show({
                                type: 'success',
                                text1: 'Flight Reservation Imported',
                                text2: 'The flight reservation was verified and added to your overview 🎉',
                                position: 'top'
                            })
                    }
                );
                break;
            case 'Cruise':
                verifyCruiseEmailForwarded({ tripId });
                break;
            case 'Lodging':
                verifyLodgingEmailForwarded({ tripId });
                break;
            case 'Train':
            case 'Ferry':
            case 'Bus':
                verifyTransitEmailForwarded({
                    tripId,
                    transitType: reservationType.toLocaleUpperCase() as TransitType
                });
                break;
            default:
                break;
        }
    };

    return (
        <View className="bg-white px-4">
            <View className="relative flex-row items-center justify-center">
                <TouchableOpacity
                    onPress={() => setCurrentView(AddReservationSheetView.AddReservation)}
                    className="absolute left-4"
                >
                    <Text className="text-base text-black">←</Text>
                </TouchableOpacity>
                <Text className="text-center text-base font-bold">Forward your confirmation</Text>
                <View />
            </View>
            <Text className="mt-2 text-center text-sm text-gray-600">
                Forward your confirmation to the email below and click the button to allow us to check for new emails
                (within <Text className="font-extrabold">5 minutes</Text> after forwarding)
                {'\n'}We will automatically import your reservation details to your plan.
            </Text>
            <View className="mt-6 flex-row items-center rounded-lg border border-gray-300 px-4 py-3">
                <Text className="flex-1 text-base text-black">ez.trippin.apcs21@gmail.com</Text>
                <TouchableOpacity
                    className="rounded-full bg-[#60ABEF] px-4 py-1"
                    onPress={async () => {
                        await Clipboard.setStringAsync('ez.trippin.apcs21@gmail.com');
                        Alert.alert('Copied to clipboard!');
                    }}
                >
                    <Text className="font-semibold text-white">Copy</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                className="mt-6 rounded-full bg-[#d8e4f0] py-3"
                onPress={handleVerifyEmailForwarded}
                disabled={
                    isPendingVerifyFlightEmailForwarded ||
                    isPendingVerifyCruiseEmailForwarded ||
                    isPendingVerifyLodgingEmailForwarded ||
                    isPendingVerifyTransitEmailForwarded
                }
            >
                <Text className="text-center font-semibold text-[#60ABEF]">Check for new emails</Text>
                {(isPendingVerifyFlightEmailForwarded ||
                    isPendingVerifyCruiseEmailForwarded ||
                    isPendingVerifyLodgingEmailForwarded ||
                    isPendingVerifyTransitEmailForwarded) && <ActivityIndicator size="small" color="#60ABEF" />}
            </TouchableOpacity>
        </View>
    );
};

const AddReservation = ({
    setCurrentView,
    reservationType
}: {
    setCurrentView: React.Dispatch<React.SetStateAction<AddReservationSheetView>>;
    reservationType: string;
}) => {
    return (
        <View className="bg-white px-4">
            <View className="items-center justify-between">
                <Text className="mb-2 text-base font-bold">Add {reservationType}</Text>
                <Text className="text-center text-[14px] text-gray-500">
                    Import your reservation details to your plan by forwarding your email. Or create it manually.
                </Text>
            </View>
            <TouchableOpacity
                className="mt-4 flex-row items-center justify-between rounded-full bg-gray-100 p-3"
                onPress={() => setCurrentView(AddReservationSheetView.ForwardYourConfirmation)}
            >
                <Iconify icon="material-symbols:mail-outline" size={20} className="text-gray-500" />
                <Text className="text-base font-bold text-gray-600">Forward email</Text>
                <View />
            </TouchableOpacity>
            <View className="my-2 flex-row items-center justify-between">
                <View className="mx-2 h-px flex-1 bg-gray-300" />
                <Text className="text-sm text-gray-500">Or</Text>
                <View className="mx-2 h-px flex-1 bg-gray-300" />
            </View>
            <TouchableOpacity
                className="flex-row items-center justify-between rounded-full bg-gray-100 p-3"
                onPress={() => setCurrentView(AddReservationSheetView.CreateReservationManually)}
            >
                <Iconify icon="ic:baseline-plus" size={20} className="text-gray-500" />
                <Text className="text-base font-bold text-gray-600">Create manually</Text>
                <View />
            </TouchableOpacity>
        </View>
    );
};

export const AddReservationSheet = ({ reservationType, tripId }: { reservationType: string; tripId: number }) => {
    const [currentView, setCurrentView] = useState<AddReservationSheetView>(AddReservationSheetView.AddReservation);
    const [dateStates, setDateStates] = useState({
        startDate: new Date(),
        endDate: new Date()
    });
    const [currencySymbol, setCurrencySymbol] = useState<string>('$');
    const [selectedDateType, setSelectedDateType] = useState<string>('startDate');

    const renderContent = () => {
        switch (currentView) {
            case AddReservationSheetView.ForwardYourConfirmation:
                return (
                    <ForwardYourConfirmation
                        setCurrentView={setCurrentView}
                        reservationType={reservationType}
                        tripId={tripId}
                    />
                );
            case AddReservationSheetView.AddReservation:
                return <AddReservation setCurrentView={setCurrentView} reservationType={reservationType} />;
            case AddReservationSheetView.CreateReservationManually:
            case AddReservationSheetView.SelectDate:
            case AddReservationSheetView.ChangeCurrencyView:
                return (
                    <>
                        <CreateReservationManually
                            setCurrentView={setCurrentView}
                            reservationType={reservationType}
                            dateStates={dateStates}
                            currencySymbol={currencySymbol}
                            setSelectedDateType={setSelectedDateType}
                            tripId={tripId}
                            isHided={currentView !== AddReservationSheetView.CreateReservationManually}
                        />
                        {currentView === AddReservationSheetView.SelectDate && (
                            <SelectDate
                                setCurrentView={setCurrentView}
                                dateStates={dateStates}
                                dateType={selectedDateType}
                                setDateStates={setDateStates}
                            />
                        )}
                        {currentView === AddReservationSheetView.ChangeCurrencyView && (
                            <ChangeCurrencyView
                                currencySymbol={currencySymbol}
                                setCurrencySymbol={setCurrencySymbol}
                                handleBack={() => setCurrentView(AddReservationSheetView.CreateReservationManually)}
                            />
                        )}
                    </>
                );
            default:
                return null;
        }
    };
    return <>{renderContent()}</>;
};
