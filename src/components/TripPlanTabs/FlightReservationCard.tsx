import dayjs from 'dayjs';
import * as Clipboard from 'expo-clipboard';
import { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';
import Toast from 'react-native-toast-message';

import { useCreateTripFlight, useUpdateTripFlight } from '@/src/hooks/use-trip';
import { formatFlightTime } from '@/src/utils/DateTimeUtil';

const FlightReservationCard = ({
    isCreateManually = false,
    openSelectDateView,
    dateStates,
    setSelectedDateType,
    isCreateClicked,
    setIsCreateClicked,
    tripId,
    currencySymbol,
    openChangeCurrencyView,
    flightReservationDetails,
    handleDeleteFlightReservation
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
    flightReservationDetails?: any;
    handleDeleteFlightReservation?: () => void;
}) => {
    const [open, setOpen] = useState(isCreateManually);
    const [flightReservationInfo, setFlightReservationInfo] = useState({
        flightNumber: '',
        flightBrand: '',
        departurePlace: '',
        departureDate: dateStates ? dateStates.startDate : new Date(),
        arrivalPlace: '',
        arrivalDate: dateStates ? dateStates.endDate : new Date(),
        currency: currencySymbol || '$',
        price: 0,
        displayPrice: '',
        confirmationCode: ''
    });
    const { createTripFlight } = useCreateTripFlight();
    const { isPending: isPendingUpdateTripFlight, updateTripFlight } = useUpdateTripFlight();

    useEffect(() => {
        if (flightReservationDetails) {
            setFlightReservationInfo((prevState) => ({
                ...prevState,
                flightNumber: flightReservationDetails.flightNumber || prevState.flightNumber,
                flightBrand: flightReservationDetails.flightBrand || prevState.flightBrand,
                departurePlace: flightReservationDetails.departurePlace || prevState.departurePlace,
                departureDate: flightReservationDetails.departureDate
                    ? new Date(flightReservationDetails.departureDate)
                    : prevState.departureDate,
                arrivalPlace: flightReservationDetails.arrivalPlace || prevState.arrivalPlace,
                arrivalDate: flightReservationDetails.arrivalDate
                    ? new Date(flightReservationDetails.arrivalDate)
                    : prevState.arrivalDate,
                price: flightReservationDetails.price || prevState.price,
                displayPrice: flightReservationDetails.price
                    ? flightReservationDetails.price.toLocaleString('en-US', { maximumFractionDigits: 2 })
                    : prevState.displayPrice,
                currency: flightReservationDetails.currency || prevState.currency,
                confirmationCode: flightReservationDetails.confirmationCode || prevState.confirmationCode
            }));
        }
    }, [flightReservationDetails]);

    useEffect(() => {
        setFlightReservationInfo((prevState) => ({
            ...prevState,
            departureDate: dateStates ? dateStates.startDate : prevState.departureDate,
            arrivalDate: dateStates ? dateStates.endDate : prevState.arrivalDate
        }));
    }, [dateStates]);

    useEffect(() => {
        setFlightReservationInfo((prevState) => ({
            ...prevState,
            currency: currencySymbol || prevState.currency
        }));
    }, [currencySymbol]);

    useEffect(() => {
        if (isCreateClicked) {
            createTripFlight(
                {
                    tripId,
                    createTripFlightReq: {
                        flightNumber: flightReservationInfo.flightNumber || undefined,
                        flightBrand: flightReservationInfo.flightBrand || undefined,
                        departurePlace: flightReservationInfo.departurePlace,
                        departureDate: dayjs(flightReservationInfo.departureDate).format('YYYY-MM-DDTHH:mm:ssZ'),
                        arrivalPlace: flightReservationInfo.arrivalPlace,
                        arrivalDate: dayjs(flightReservationInfo.arrivalDate).format('YYYY-MM-DDTHH:mm:ssZ'),
                        price: flightReservationInfo.price || undefined,
                        currency: flightReservationInfo.currency || undefined,
                        confirmationCode: flightReservationInfo.confirmationCode || undefined
                    }
                },
                {
                    onSuccess: () => {
                        if (setIsCreateClicked) setIsCreateClicked(false);
                        setFlightReservationInfo({
                            flightNumber: '',
                            flightBrand: '',
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
                            text1: 'Flight Reservation Created',
                            text2: 'The flight reservation was added to your overview 🎉',
                            position: 'top'
                        });
                    }
                }
            );
        }
    }, [isCreateClicked, setIsCreateClicked, createTripFlight, flightReservationInfo, tripId]);

    const handlePriceChange = (text: string) => {
        const cleanedText = text.replace(/[^0-9.,]/g, '');
        setFlightReservationInfo((prevState) => ({
            ...prevState,
            displayPrice: cleanedText
        }));

        const parsedValue = parseFloat(cleanedText.replace(/,/g, '.')).toFixed(2);
        setFlightReservationInfo((prevState) => ({
            ...prevState,
            price: Number.isNaN(Number(parsedValue)) ? 0 : Number(parsedValue)
        }));
    };

    return open ? (
        <TouchableOpacity
            className="my-2 w-full space-y-3 rounded-xl border border-gray-200 bg-gray-100 p-4"
            onPress={() => {
                if (isCreateManually) return;
                updateTripFlight(
                    {
                        tripId,
                        flightId: flightReservationDetails?.id,
                        updateTripFlightReq: {
                            flightNumber: flightReservationInfo.flightNumber || undefined,
                            flightBrand: flightReservationInfo.flightBrand || undefined,
                            departurePlace: flightReservationInfo.departurePlace,
                            departureDate: dayjs(flightReservationInfo.departureDate).format('YYYY-MM-DDTHH:mm:ssZ'),
                            arrivalPlace: flightReservationInfo.arrivalPlace,
                            arrivalDate: dayjs(flightReservationInfo.arrivalDate).format('YYYY-MM-DDTHH:mm:ssZ'),
                            price: flightReservationInfo.price || undefined,
                            currency: flightReservationInfo.currency || undefined,
                            confirmationCode: flightReservationInfo.confirmationCode || undefined
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
            disabled={isPendingUpdateTripFlight}
        >
            {/* FLIGHT */}
            <View>
                <View className="mt-1 flex-row justify-between space-x-2">
                    <View className="flex-1">
                        <Text className="text-xs font-semibold text-gray-500">FLIGHT NUMBER</Text>
                        <TextInput
                            className="rounded-md bg-gray-200 px-3 py-1 text-black"
                            value={flightReservationInfo.flightNumber}
                            onChangeText={(text) => {
                                setFlightReservationInfo((prevState) => ({
                                    ...prevState,
                                    flightNumber: text
                                }));
                            }}
                        />
                    </View>
                    <View className="flex-1">
                        <Text className="text-xs font-semibold text-gray-500">BRAND</Text>
                        <TextInput
                            className="rounded-md bg-gray-200 px-3 py-1 text-black"
                            value={flightReservationInfo.flightBrand}
                            onChangeText={(text) => {
                                setFlightReservationInfo((prevState) => ({
                                    ...prevState,
                                    flightBrand: text
                                }));
                            }}
                        />
                    </View>
                </View>
            </View>
            {/* DEPART */}
            <View>
                <Text className="text-xs font-semibold text-gray-500">DEPART</Text>
                <View className="mt-1 flex-row items-center space-x-2">
                    <TextInput
                        className="rounded-md bg-gray-200 px-3 py-1 text-black"
                        value={dayjs(flightReservationInfo.departureDate).format('MM/DD/YYYY hh:mm A')}
                        onFocus={() => {
                            if (openSelectDateView) openSelectDateView();
                            if (setSelectedDateType) setSelectedDateType('startDate');
                        }}
                    />
                    <TextInput
                        className="flex-1 rounded-md bg-gray-200 px-3 py-1 text-black"
                        placeholder="Departure Place"
                        placeholderTextColor="#999"
                        value={flightReservationInfo.departurePlace}
                        onChangeText={(text) => {
                            setFlightReservationInfo((prevState) => ({
                                ...prevState,
                                departurePlace: text
                            }));
                        }}
                    />
                </View>
            </View>

            {/* ARRIVE */}
            <View>
                <Text className="text-xs font-semibold text-gray-500">ARRIVE</Text>
                <View className="mt-1 flex-row justify-between space-x-2">
                    <TextInput
                        className="rounded-md bg-gray-200 px-3 py-1 text-black"
                        value={dayjs(flightReservationInfo.arrivalDate).format('MM/DD/YYYY hh:mm A')}
                        onFocus={() => {
                            if (openSelectDateView) openSelectDateView();
                            if (setSelectedDateType) setSelectedDateType('endDate');
                        }}
                    />
                    <TextInput
                        className="flex-1 rounded-md bg-gray-200 px-3 py-1 text-black"
                        placeholder="Arrival Place"
                        placeholderTextColor="#999"
                        value={flightReservationInfo.arrivalPlace}
                        onChangeText={(text) => {
                            setFlightReservationInfo((prevState) => ({
                                ...prevState,
                                arrivalPlace: text
                            }));
                        }}
                    />
                </View>
            </View>
            <View className="my-2 border-t border-gray-200" />
            {/* CONFIRMATION & COST */}
            <View className="flex-row space-x-4">
                <View className="flex-1">
                    <Text className="text-xs font-semibold text-gray-500">CONFIRMATION #</Text>
                    <TextInput
                        className="mt-1 rounded-md bg-gray-200 px-3 py-1 text-black"
                        value={flightReservationInfo.confirmationCode}
                        onChangeText={(text) => {
                            setFlightReservationInfo((prevState) => ({
                                ...prevState,
                                confirmationCode: text
                            }));
                        }}
                    />
                </View>
                <View className="flex-1">
                    <Text className="text-xs font-semibold text-gray-500">COST</Text>
                    <View className="mt-1 flex-row items-center space-x-2 rounded-md bg-gray-200 px-3 py-1">
                        <TouchableOpacity onPress={openChangeCurrencyView}>
                            <Text className="text-xs text-gray-500">{flightReservationInfo.currency} ▾</Text>
                        </TouchableOpacity>
                        <TextInput
                            className="text-xs text-gray-500"
                            placeholder="0.00"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            returnKeyType="done"
                            value={flightReservationInfo.displayPrice}
                            onChangeText={handlePriceChange}
                        />
                    </View>
                </View>
            </View>
            {/* FOOTER ICONS */}
            {!isCreateManually && (
                <View className="flex-row items-center justify-end space-x-2 pt-2">
                    <TouchableOpacity onPress={handleDeleteFlightReservation}>
                        <Iconify icon="mdi:trash-can" size={22} className="text-gray-500" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Iconify icon="mdi:dots-grid" size={22} className="text-gray-500" />
                    </TouchableOpacity>
                </View>
            )}
        </TouchableOpacity>
    ) : (
        <TouchableOpacity
            className="my-2 w-full space-y-3 rounded-xl border border-gray-200 bg-gray-100 p-4"
            onPress={() => {
                if (isCreateManually) return;
                setOpen(true);
            }}
        >
            {/* Route & Time */}
            <View className="flex-row items-center space-x-2">
                <Text className="text-base font-bold text-black">{flightReservationInfo.departurePlace}</Text>
                <Iconify icon="mdi:arrow-right" size={24} className="text-gray-500" />
                <Text className="text-base font-bold text-black">{flightReservationInfo.arrivalPlace}</Text>
            </View>
            <Text className="text-base text-black">
                {formatFlightTime(flightReservationInfo.departureDate, flightReservationInfo.arrivalDate)}
            </Text>
            <Text className="text-xs font-semibold text-gray-600">
                {flightReservationInfo.flightNumber} - {flightReservationInfo.flightBrand}
            </Text>
            <View className="my-2 border-t border-gray-400" />
            {/* Confirmation + Price */}
            <View className="flex-row items-center justify-between">
                {flightReservationInfo.confirmationCode && (
                    <View>
                        <Text className="text-xs font-bold text-gray-400">CONFIRMATION #</Text>
                        <View className="mt-1 flex-row items-center space-x-2">
                            <Text className="text-base font-semibold text-gray-600">
                                {flightReservationInfo.confirmationCode}
                            </Text>
                            <TouchableOpacity
                                onPress={async () => {
                                    await Clipboard.setStringAsync(flightReservationInfo.confirmationCode || '');
                                    Alert.alert('Copied to clipboard!');
                                }}
                            >
                                <Iconify icon="mdi:content-copy" size={18} className="text-gray-500" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {flightReservationInfo.displayPrice && (
                    <View className="rounded-full bg-gray-300 p-2">
                        <Text className="text-sm font-semibold text-gray-700">
                            {flightReservationInfo.currency} {flightReservationInfo.displayPrice}
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default FlightReservationCard;
