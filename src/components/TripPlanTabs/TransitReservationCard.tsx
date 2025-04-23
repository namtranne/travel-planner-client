import dayjs from 'dayjs';
import * as Clipboard from 'expo-clipboard';
import { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';
import Toast from 'react-native-toast-message';

import { useCreateTripTransit, useUpdateTripTransit } from '@/src/hooks/use-trip';
import type { TransitType } from '@/src/services/types';
import { formatTransitTime } from '@/src/utils/DateTimeUtil';

export default function TransitReservationCard({
    isCreateManually = false,
    openSelectDateView,
    dateStates,
    setSelectedDateType,
    isCreateClicked,
    setIsCreateClicked,
    tripId,
    transitType,
    currencySymbol,
    openChangeCurrencyView,
    transitReservationDetails,
    handleDeleteTransitReservation
}: {
    isCreateManually?: boolean;
    openSelectDateView?: () => void;
    dateStates?: any;
    setSelectedDateType?: React.Dispatch<React.SetStateAction<string>>;
    isCreateClicked?: boolean;
    setIsCreateClicked?: React.Dispatch<React.SetStateAction<boolean>>;
    tripId: number;
    transitType: TransitType;
    currencySymbol?: string;
    openChangeCurrencyView?: () => void;
    transitReservationDetails?: any;
    handleDeleteTransitReservation?: () => void;
}) {
    const [open, setOpen] = useState(isCreateManually);
    const [transitReservationInfo, setTransitReservationInfo] = useState({
        departurePlace: '',
        departureDate: dateStates ? dateStates.startDate : new Date(),
        arrivalPlace: '',
        arrivalDate: dateStates ? dateStates.endDate : new Date(),
        currency: currencySymbol || '$',
        price: 0,
        displayPrice: '',
        confirmationCode: ''
    });
    const { createTripTransit } = useCreateTripTransit();
    const { isPending: isPendingUpdateTripTransit, updateTripTransit } = useUpdateTripTransit();

    useEffect(() => {
        if (transitReservationDetails) {
            setTransitReservationInfo((prevState) => ({
                ...prevState,
                departurePlace: transitReservationDetails.departurePlace || prevState.departurePlace,
                departureDate: transitReservationDetails.departureDate
                    ? new Date(transitReservationDetails.departureDate)
                    : prevState.departureDate,
                arrivalPlace: transitReservationDetails.arrivalPlace || prevState.arrivalPlace,
                arrivalDate: transitReservationDetails.arrivalDate
                    ? new Date(transitReservationDetails.arrivalDate)
                    : prevState.arrivalDate,
                currency: transitReservationDetails.currency || prevState.currency,
                price: transitReservationDetails.price || prevState.price,
                displayPrice: transitReservationDetails.displayPrice
                    ? transitReservationDetails.price.toLocaleString('en-US', { maximumFractionDigits: 2 })
                    : prevState.displayPrice,
                confirmationCode: transitReservationDetails.confirmationCode || prevState.confirmationCode
            }));
        }
    }, [transitReservationDetails]);

    useEffect(() => {
        setTransitReservationInfo((prevState) => ({
            ...prevState,
            departureDate: dateStates ? dateStates.startDate : prevState.departureDate,
            arrivalDate: dateStates ? dateStates.endDate : prevState.arrivalDate
        }));
    }, [dateStates]);

    useEffect(() => {
        setTransitReservationInfo((prevState) => ({
            ...prevState,
            currency: currencySymbol || prevState.currency
        }));
    }, [currencySymbol]);

    useEffect(() => {
        if (isCreateClicked) {
            createTripTransit(
                {
                    tripId,
                    createTripTransitReq: {
                        departurePlace: transitReservationInfo.departurePlace,
                        departureDate: dayjs(transitReservationInfo.departureDate).format('YYYY-MM-DDTHH:mm:ssZ'),
                        arrivalPlace: transitReservationInfo.arrivalPlace,
                        arrivalDate: dayjs(transitReservationInfo.arrivalDate).format('YYYY-MM-DDTHH:mm:ssZ'),
                        currency: transitReservationInfo.currency || undefined,
                        price: transitReservationInfo.price || undefined,
                        confirmationCode: transitReservationInfo.confirmationCode || undefined,
                        transitType
                    }
                },
                {
                    onSuccess: () => {
                        if (setIsCreateClicked) setIsCreateClicked(false);
                        setTransitReservationInfo({
                            departurePlace: '',
                            departureDate: new Date(),
                            arrivalPlace: '',
                            arrivalDate: new Date(),
                            currency: '$',
                            price: 0,
                            displayPrice: '',
                            confirmationCode: ''
                        });
                        Toast.show({
                            type: 'success',
                            text1: 'Transit Reservation Created',
                            text2: 'The transit reservation was added to your overview 🎉',
                            position: 'top'
                        });
                    }
                }
            );
        }
    }, [isCreateClicked, createTripTransit, setIsCreateClicked, transitReservationInfo, tripId, transitType]);

    const handlePriceChange = (text: string) => {
        const cleanedText = text.replace(/[^0-9.,]/g, '');
        setTransitReservationInfo((prevState) => ({
            ...prevState,
            displayPrice: cleanedText
        }));

        const parsedValue = parseFloat(cleanedText.replace(/,/g, '.')).toFixed(2);
        setTransitReservationInfo((prevState) => ({
            ...prevState,
            price: Number.isNaN(Number(parsedValue)) ? 0 : Number(parsedValue)
        }));
    };

    return open ? (
        <TouchableOpacity
            className="w-full rounded-xl border border-gray-200 bg-gray-100 p-4"
            onPress={() => {
                if (isCreateManually) return;
                updateTripTransit(
                    {
                        tripId,
                        transitId: transitReservationDetails?.id,
                        updateTripTransitReq: {
                            departurePlace: transitReservationInfo.departurePlace,
                            departureDate: dayjs(transitReservationInfo.departureDate).format('YYYY-MM-DDTHH:mm:ssZ'),
                            arrivalPlace: transitReservationInfo.arrivalPlace,
                            arrivalDate: dayjs(transitReservationInfo.arrivalDate).format('YYYY-MM-DDTHH:mm:ssZ'),
                            currency: transitReservationInfo.currency || undefined,
                            price: transitReservationInfo.price || undefined,
                            confirmationCode: transitReservationInfo.confirmationCode || undefined,
                            transitType
                        }
                    },
                    {
                        onSuccess: () => {
                            // Toast.show({
                            //     type: 'success',
                            //     text1: 'Transit Reservation Updated',
                            //     text2: 'The transit reservation was updated successfully 🎉',
                            //     position: 'top'
                            // });
                            setOpen(false);
                        }
                    }
                );
                setOpen(false);
            }}
            disabled={isPendingUpdateTripTransit}
        >
            {/* DEPART */}
            <Text className="mb-1 text-xs font-bold uppercase text-gray-500">Depart</Text>
            <View className="flex-row items-center justify-between space-x-2">
                <TextInput
                    className="flex-1 rounded-md bg-gray-200 px-3 py-1 text-black"
                    value={transitReservationInfo.departurePlace}
                    onChangeText={(text) =>
                        setTransitReservationInfo({ ...transitReservationInfo, departurePlace: text })
                    }
                    placeholder="Departure Location"
                />
                <TextInput
                    className="flex-1 rounded-md bg-gray-200 px-3 py-1 text-black"
                    value={dayjs(transitReservationInfo.departureDate).format('MM/DD/YYYY hh:mm A')}
                    onFocus={() => {
                        if (openSelectDateView) openSelectDateView();
                        if (setSelectedDateType) setSelectedDateType('startDate');
                    }}
                />
            </View>
            {/* ARRIVE */}
            <Text className="mb-1 mt-4 text-xs font-bold uppercase text-gray-500">Arrive</Text>
            <View className="flex-row items-center justify-between space-x-2">
                <TextInput
                    className="flex-1 rounded-md bg-gray-200 px-3 py-1 text-black"
                    value={transitReservationInfo.arrivalPlace}
                    onChangeText={(text) =>
                        setTransitReservationInfo({ ...transitReservationInfo, arrivalPlace: text })
                    }
                    placeholder="Destination Location"
                />
                <TextInput
                    className="flex-1 rounded-md bg-gray-200 px-3 py-1 text-black"
                    value={dayjs(transitReservationInfo.arrivalDate).format('MM/DD/YYYY hh:mm A')}
                    onFocus={() => {
                        if (openSelectDateView) openSelectDateView();
                        if (setSelectedDateType) setSelectedDateType('endDate');
                    }}
                />
            </View>
            {/* CONFIRMATION + COST */}
            <View className="mt-4 flex-row justify-between">
                <View className="flex-1">
                    <Text className="mb-1 text-xs uppercase text-gray-500">Confirmation #</Text>
                    <TextInput
                        className="rounded-md bg-gray-200 px-3 py-1 text-black"
                        value={transitReservationInfo.confirmationCode}
                        onChangeText={(text) =>
                            setTransitReservationInfo({ ...transitReservationInfo, confirmationCode: text })
                        }
                    />
                </View>
                <View className="flex-1">
                    <Text className="text-xs font-semibold text-gray-500">COST</Text>
                    <View className="mt-1 flex-row items-center space-x-2 rounded-md bg-gray-200 px-3 py-1">
                        <TouchableOpacity onPress={openChangeCurrencyView}>
                            <Text className="text-xs text-gray-500">{transitReservationInfo.currency} ▾</Text>
                        </TouchableOpacity>
                        <TextInput
                            className="text-xs text-gray-500"
                            placeholder="0.00"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            returnKeyType="done"
                            value={transitReservationInfo.displayPrice}
                            onChangeText={handlePriceChange}
                        />
                    </View>
                </View>
            </View>
            {/* ACTION BUTTONS */}
            {!isCreateManually && (
                <View className="mt-4 flex-row items-center justify-between">
                    <View className="flex-row space-x-2">
                        <Iconify icon="mdi:map" width={24} height={24} />
                        <Iconify icon="material-symbols:directions" width={24} height={24} />
                    </View>
                    <View className="flex-row space-x-2">
                        <TouchableOpacity onPress={handleDeleteTransitReservation}>
                            <Iconify icon="mdi:trash-can" size={22} className="text-gray-500" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Iconify icon="mdi:dots-grid" size={22} className="text-gray-500" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    ) : (
        <TouchableOpacity
            className="w-full rounded-xl border border-gray-200 bg-gray-100 p-4"
            onPress={() => setOpen(true)}
        >
            <View className="flex-row flex-wrap items-center justify-between">
                <View className="flex-1 flex-row">
                    <Text className="text-sm font-bold">
                        {transitReservationInfo.departurePlace}{' '}
                        <TouchableOpacity
                            onPress={async () => {
                                await Clipboard.setStringAsync(transitReservationInfo.departurePlace);
                                Alert.alert('Copied to clipboard!');
                            }}
                        >
                            <Iconify icon="mdi:content-copy" size={14} className="text-gray-500" />
                        </TouchableOpacity>
                    </Text>
                </View>
                <View className="flex-1 items-center">
                    <Iconify icon="mdi:arrow-right" size={24} className="text-gray-500" />
                </View>
                <View className="flex-1">
                    <Text className="text-sm font-bold">
                        {transitReservationInfo.arrivalPlace}{' '}
                        <TouchableOpacity
                            onPress={async () => {
                                await Clipboard.setStringAsync(transitReservationInfo.arrivalPlace);
                                Alert.alert('Copied to clipboard!');
                            }}
                        >
                            <Iconify icon="mdi:content-copy" size={14} className="text-gray-500" />
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
            <View className="mt-3">
                <Text className="text-sm font-semibold text-gray-800">
                    {formatTransitTime(transitReservationInfo.departureDate, transitReservationInfo.arrivalDate)}
                </Text>
                <Text className="mt-1 text-[10px] font-bold text-gray-500">ADD TRAIN CARRIER</Text>
            </View>
        </TouchableOpacity>
    );
}
