import dayjs from 'dayjs';
import * as Clipboard from 'expo-clipboard';
import { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Iconify } from 'react-native-iconify';
import Toast from 'react-native-toast-message';

import { useCreateTripLodging, useUpdateTripLodging } from '@/src/hooks/use-trip';
import { formatLodgingTime } from '@/src/utils/DateTimeUtil';

const LodgingReservationCard = ({
    isCreateManually = false,
    openSelectDateView,
    dateStates,
    setSelectedDateType,
    isCreateClicked,
    setIsCreateClicked,
    tripId,
    currencySymbol,
    openChangeCurrencyView,
    lodgingReservationDetails,
    handleDeleteLodgingReservation
}: {
    isCreateManually?: boolean;
    openSelectDateView?: () => void;
    dateStates?: any;
    setSelectedDateType?: React.Dispatch<React.SetStateAction<string>>;
    isCreateClicked?: boolean;
    setIsCreateClicked?: React.Dispatch<React.SetStateAction<boolean>>;
    tripId: number;
    currencySymbol?: string;
    openChangeCurrencyView?: () => void;
    lodgingReservationDetails?: any;
    handleDeleteLodgingReservation?: () => void;
}) => {
    const [open, setOpen] = useState(isCreateManually);
    const [lodgingReservationInfo, setLodgingReservationInfo] = useState({
        lodgingName: '',
        checkInDate: dateStates ? dateStates.startDate : new Date(),
        checkOutDate: dateStates ? dateStates.endDate : new Date(),
        currency: currencySymbol || '$',
        price: 0,
        displayPrice: '',
        confirmationCode: ''
    });
    const { createTripLodging } = useCreateTripLodging();
    const { isPending: isPendingUpdateTripLodging, updateTripLodging } = useUpdateTripLodging();

    useEffect(() => {
        if (lodgingReservationDetails) {
            setLodgingReservationInfo((prevState) => ({
                ...prevState,
                lodgingName: lodgingReservationDetails.lodgingName || prevState.lodgingName,
                checkInDate: lodgingReservationDetails.checkInDate
                    ? new Date(lodgingReservationDetails.checkInDate)
                    : prevState.checkInDate,
                checkOutDate: lodgingReservationDetails.checkOutDate
                    ? new Date(lodgingReservationDetails.checkOutDate)
                    : prevState.checkOutDate,
                currency: lodgingReservationDetails.currency || prevState.currency,
                price: lodgingReservationDetails.price || prevState.price,
                displayPrice: lodgingReservationDetails.displayPrice || prevState.displayPrice,
                confirmationCode: lodgingReservationDetails.confirmationCode || prevState.confirmationCode
            }));
        }
    }, [lodgingReservationDetails]);

    useEffect(() => {
        setLodgingReservationInfo((prevState) => ({
            ...prevState,
            departureDate: dateStates ? dateStates.startDate : prevState.checkInDate,
            arrivalDate: dateStates ? dateStates.endDate : prevState.checkOutDate
        }));
    }, [dateStates]);

    useEffect(() => {
        setLodgingReservationInfo((prevState) => ({
            ...prevState,
            currency: currencySymbol || prevState.currency
        }));
    }, [currencySymbol]);

    useEffect(() => {
        if (isCreateClicked) {
            createTripLodging(
                {
                    tripId,
                    createTripLodgingReq: {
                        lodgingName: lodgingReservationInfo.lodgingName,
                        checkInDate: dayjs(lodgingReservationInfo.checkInDate).format('YYYY-MM-DDTHH:mm:ssZ'),
                        checkOutDate: dayjs(lodgingReservationInfo.checkOutDate).format('YYYY-MM-DDTHH:mm:ssZ'),
                        currency: lodgingReservationInfo.currency || undefined,
                        price: lodgingReservationInfo.price || undefined,
                        confirmationCode: lodgingReservationInfo.confirmationCode || undefined
                    }
                },
                {
                    onSuccess: () => {
                        if (setIsCreateClicked) setIsCreateClicked(false);
                        setLodgingReservationInfo({
                            lodgingName: '',
                            checkInDate: new Date(),
                            checkOutDate: new Date(),
                            currency: '$',
                            price: 0,
                            displayPrice: '',
                            confirmationCode: ''
                        });
                        Toast.show({
                            type: 'success',
                            text1: 'Lodging Reservation Created',
                            text2: 'The lodging reservation was added to your overview 🎉',
                            position: 'top'
                        });
                    }
                }
            );
        }
    }, [isCreateClicked, lodgingReservationInfo, createTripLodging, setIsCreateClicked, tripId]);

    const handlePriceChange = (text: string) => {
        const cleanedText = text.replace(/[^0-9.,]/g, '');
        setLodgingReservationInfo((prevState) => ({
            ...prevState,
            displayPrice: cleanedText
        }));

        const parsedValue = parseFloat(cleanedText.replace(/,/g, '.')).toFixed(2);
        setLodgingReservationInfo((prevState) => ({
            ...prevState,
            price: Number.isNaN(Number(parsedValue)) ? 0 : Number(parsedValue)
        }));
    };

    return open ? (
        <TouchableOpacity
            className="w-full space-y-4 rounded-2xl border border-gray-200 bg-gray-100 p-4"
            onPress={() => {
                if (!isCreateManually) return;
                updateTripLodging(
                    {
                        tripId,
                        lodgingId: lodgingReservationDetails.id,
                        updateTripLodgingReq: {
                            lodgingName: lodgingReservationInfo.lodgingName,
                            checkInDate: dayjs(lodgingReservationInfo.checkInDate).format('YYYY-MM-DDTHH:mm:ssZ'),
                            checkOutDate: dayjs(lodgingReservationInfo.checkOutDate).format('YYYY-MM-DDTHH:mm:ssZ'),
                            currency: lodgingReservationInfo.currency || undefined,
                            price: lodgingReservationInfo.price || undefined,
                            confirmationCode: lodgingReservationInfo.confirmationCode || undefined
                        }
                    },
                    {
                        onSuccess: () => {
                            // Toast.show({
                            //     type: 'success',
                            //     text1: 'Flight Reservation Updated',
                            //     text2: 'The flight reservation was updated successfully 🎉',
                            //     position: 'top'
                            // });
                            setOpen(false);
                        }
                    }
                );
            }}
            disabled={isPendingUpdateTripLodging}
        >
            {/* Title */}
            <View>
                <Text className="text-xs font-bold uppercase text-gray-500">Hotel or Lodging Address</Text>
                <TextInput
                    className="mt-1 rounded-md bg-gray-200 px-3 py-1 text-black"
                    value={lodgingReservationInfo.lodgingName}
                    onChangeText={(text) =>
                        setLodgingReservationInfo((prevState) => ({ ...prevState, lodgingName: text }))
                    }
                />
            </View>

            {/* Check-In & Check-Out */}
            <View className="flex-row justify-between space-x-4">
                <View className="flex-1">
                    <Text className="text-xs font-bold uppercase text-gray-500">Check-in</Text>
                    <TextInput
                        className="mt-1 rounded-md bg-gray-200 px-3 py-1 text-black"
                        value={dayjs(lodgingReservationInfo.checkInDate).format('MM/DD/YYYY hh:mm A')}
                        onFocus={() => {
                            if (openSelectDateView) openSelectDateView();
                            if (setSelectedDateType) setSelectedDateType('startDate');
                        }}
                    />
                </View>
                <View className="flex-1">
                    <Text className="text-xs font-bold uppercase text-gray-500">Check-out</Text>
                    <TextInput
                        className="mt-1 rounded-md bg-gray-200 px-3 py-1 text-black"
                        value={dayjs(lodgingReservationInfo.checkOutDate).format('MM/DD/YYYY hh:mm A')}
                        onFocus={() => {
                            if (openSelectDateView) openSelectDateView();
                            if (setSelectedDateType) setSelectedDateType('endDate');
                        }}
                    />
                </View>
            </View>

            {/* Divider */}
            <View className="my-2 border-t border-gray-200" />

            {/* Confirmation # and Cost */}
            <View className="flex-row justify-between space-x-4">
                <View className="flex-1">
                    <Text className="text-xs font-bold uppercase text-gray-500">Confirmation #</Text>
                    <TextInput
                        className="mt-1 rounded-md bg-gray-200 px-3 py-1 text-black"
                        value={lodgingReservationInfo.confirmationCode}
                        onChangeText={(text) =>
                            setLodgingReservationInfo((prevState) => ({ ...prevState, confirmationCode: text }))
                        }
                    />
                </View>
                <View className="flex-1">
                    <Text className="text-xs font-semibold text-gray-500">COST</Text>
                    <View className="mt-1 flex-row items-center space-x-2 rounded-md bg-gray-200 px-3 py-1">
                        <TouchableOpacity onPress={openChangeCurrencyView}>
                            <Text className="text-xs text-gray-500">{lodgingReservationInfo.currency} ▾</Text>
                        </TouchableOpacity>
                        <TextInput
                            className="text-xs text-gray-500"
                            placeholder="0.00"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            returnKeyType="done"
                            value={lodgingReservationInfo.displayPrice}
                            onChangeText={handlePriceChange}
                        />
                    </View>
                </View>
            </View>

            {/* Action Icons */}
            {!isCreateManually && (
                <View className="flex-row items-center justify-between">
                    <View className="flex-row space-x-3">
                        <TouchableOpacity className="rounded-full border border-gray-200 bg-white p-2">
                            <Iconify icon="mdi:map" size={20} className="text-gray-700" />
                        </TouchableOpacity>
                        <TouchableOpacity className="rounded-full border border-gray-200 bg-white p-2">
                            <Iconify icon="material-symbols:directions" size={20} className="text-gray-700" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row space-x-2">
                        <TouchableOpacity
                            className="rounded-full border border-gray-200 bg-white p-2"
                            onPress={handleDeleteLodgingReservation}
                        >
                            <Iconify icon="mdi:trash-can" size={20} className="text-gray-700" />
                        </TouchableOpacity>
                        <TouchableOpacity className="rounded-full border border-gray-200 bg-white p-2">
                            <Iconify icon="mdi:dots-grid" size={20} className="text-gray-700" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    ) : (
        <TouchableOpacity
            className="w-full space-y-4 rounded-2xl border border-gray-200 bg-gray-100 p-5"
            onPress={() => setOpen(true)}
        >
            {/* Title + Address */}
            <View>
                <Text className="text-lg font-bold text-black">{lodgingReservationInfo.lodgingName}</Text>
                <View className="mt-1 flex-row items-center">
                    <Text className="text-sm text-gray-500">201 W 79th St, New York, NY 10024</Text>
                    <TouchableOpacity onPress={() => {}}>
                        <Iconify icon="mdi:content-copy" size={16} className="ml-1 text-gray-400" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Stay Dates */}
            <Text className="text-sm text-black">
                {formatLodgingTime(lodgingReservationInfo.checkInDate, lodgingReservationInfo.checkOutDate)}
            </Text>

            {/* Divider */}
            <View className="border-t border-gray-200" />

            {/* Confirmation + Cost */}
            <View className="flex-row items-center justify-between">
                <View>
                    <Text className="text-xs font-bold text-gray-400">CONFIRMATION #</Text>
                    <View className="mt-1 flex-row items-center">
                        <Text className="text-base font-semibold text-gray-600">
                            {lodgingReservationInfo.confirmationCode}
                        </Text>
                        <TouchableOpacity
                            onPress={async () => {
                                await Clipboard.setStringAsync(lodgingReservationInfo.confirmationCode || '');
                                Alert.alert('Copied to clipboard!');
                            }}
                        >
                            <Iconify icon="mdi:content-copy" size={16} className="ml-1 text-gray-400" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="rounded-full bg-gray-300 p-2">
                    <Text className="text-sm font-semibold text-gray-700">
                        {lodgingReservationInfo.currency} {lodgingReservationInfo.displayPrice}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default LodgingReservationCard;
