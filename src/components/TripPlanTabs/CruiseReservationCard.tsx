import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Iconify } from 'react-native-iconify';
import Toast from 'react-native-toast-message';

import { useCreateTripCruise, useUpdateTripCruise } from '@/src/hooks/use-trip';
import { formatDateToDayMonth } from '@/src/utils/DateTimeUtil';

const CruiseReservationCard = ({
    isCreateManually = false,
    openSelectDateView,
    dateStates,
    setSelectedDateType,
    isCreateClicked,
    setIsCreateClicked,
    tripId,
    currencySymbol,
    openChangeCurrencyView,
    cruiseReservationDetails,
    handleDeleteCruiseReservation
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
    cruiseReservationDetails?: any;
    handleDeleteCruiseReservation?: () => void;
}) => {
    const [open, setOpen] = useState(isCreateManually);
    const [cruiseReservationInfo, setCruiseReservationInfo] = useState({
        shipName: '',
        departurePlace: '',
        departureDate: dateStates ? dateStates.startDate : new Date(),
        arrivalPlace: '',
        arrivalDate: dateStates ? dateStates.endDate : new Date(),
        currency: currencySymbol || '$',
        price: 0,
        displayPrice: '',
        confirmationCode: ''
    });
    const { createTripCruise } = useCreateTripCruise();
    const { isPending: isPendingUpdateTripCruise, updateTripCruise } = useUpdateTripCruise();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (cruiseReservationDetails) {
            setCruiseReservationInfo((prevState) => ({
                ...prevState,
                shipName: cruiseReservationDetails.shipName || prevState.shipName,
                departurePlace: cruiseReservationDetails.departurePlace || prevState.departurePlace,
                departureDate: cruiseReservationDetails.departureDate
                    ? new Date(cruiseReservationDetails.departureDate)
                    : prevState.departureDate,
                arrivalPlace: cruiseReservationDetails.arrivalPlace || prevState.arrivalPlace,
                arrivalDate: cruiseReservationDetails.arrivalDate
                    ? new Date(cruiseReservationDetails.arrivalDate)
                    : prevState.arrivalDate,
                currency: cruiseReservationDetails.currency || prevState.currency,
                price: cruiseReservationDetails.price || prevState.price,
                displayPrice: cruiseReservationDetails.displayPrice || prevState.displayPrice,
                confirmationCode: cruiseReservationDetails.confirmationCode || prevState.confirmationCode
            }));
        }
    }, [cruiseReservationDetails]);

    useEffect(() => {
        setCruiseReservationInfo((prevState) => ({
            ...prevState,
            departureDate: dateStates ? dateStates.startDate : prevState.departureDate,
            arrivalDate: dateStates ? dateStates.endDate : prevState.arrivalDate
        }));
    }, [dateStates]);

    useEffect(() => {
        setCruiseReservationInfo((prevState) => ({
            ...prevState,
            currency: currencySymbol || prevState.currency
        }));
    }, [currencySymbol]);

    useEffect(() => {
        if (isCreateClicked && errorMessage === '') {
            createTripCruise(
                {
                    tripId,
                    createTripCruiseReq: {
                        shipName: cruiseReservationInfo.shipName || undefined,
                        departurePlace: cruiseReservationInfo.departurePlace,
                        departureDate: dayjs(cruiseReservationInfo.departureDate).format('YYYY-MM-DDTHH:mm:ssZ'),
                        arrivalPlace: cruiseReservationInfo.arrivalPlace,
                        arrivalDate: dayjs(cruiseReservationInfo.arrivalDate).format('YYYY-MM-DDTHH:mm:ssZ'),
                        currency: cruiseReservationInfo.currency || undefined,
                        price: cruiseReservationInfo.price || undefined,
                        confirmationCode: cruiseReservationInfo.confirmationCode || undefined
                    }
                },
                {
                    onSuccess: () => {
                        if (setIsCreateClicked) setIsCreateClicked(false);
                        setCruiseReservationInfo({
                            shipName: '',
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
                            text1: 'Cruise Reservation Created',
                            text2: 'The cruise reservation was added to your overview 🎉',
                            position: 'top'
                        });
                    }
                }
            );
        }
    }, [
        isCreateClicked,
        setIsCreateClicked,
        createTripCruise,
        cruiseReservationInfo,
        tripId,
        dateStates,
        errorMessage
    ]);

    const handlePriceChange = (text: string) => {
        setCruiseReservationInfo((prevState) => ({
            ...prevState,
            displayPrice: text
        }));
        const delimiterCount = (text.match(/[.,]/g) || []).length;
        if (delimiterCount > 1) {
            setErrorMessage('Please enter a valid amount');
            return;
        }

        const parsedValue = parseFloat(text.replace(/,/g, '.'));
        setCruiseReservationInfo((prevState) => ({
            ...prevState,
            price: Number.isNaN(Number(parsedValue)) ? 0 : Number(parsedValue)
        }));
    };

    return open ? (
        <TouchableOpacity
            className="w-full space-y-3 rounded-xl border border-gray-200 bg-gray-100 p-4"
            onPress={() => {
                if (!isCreateManually || errorMessage !== '') return;
                updateTripCruise(
                    {
                        tripId,
                        cruiseId: cruiseReservationDetails?.id,
                        updateTripCruiseReq: {
                            shipName: cruiseReservationInfo.shipName || undefined,
                            departurePlace: cruiseReservationInfo.departurePlace,
                            departureDate: dayjs(cruiseReservationInfo.departureDate).format('YYYY-MM-DDTHH:mm:ssZ'),
                            arrivalPlace: cruiseReservationInfo.arrivalPlace,
                            arrivalDate: dayjs(cruiseReservationInfo.arrivalDate).format('YYYY-MM-DDTHH:mm:ssZ'),
                            currency: cruiseReservationInfo.currency || undefined,
                            price: cruiseReservationInfo.price || undefined,
                            confirmationCode: cruiseReservationInfo.confirmationCode || undefined
                        }
                    },
                    {
                        onSuccess: () => {
                            // Toast.show({
                            //     type: 'success',
                            //     text1: 'Cruise Reservation Updated',
                            //     text2: 'The cruise reservation was updated successfully 🎉',
                            //     position: 'top'
                            // });
                            setOpen(false);
                        }
                    }
                );
            }}
            disabled={isPendingUpdateTripCruise}
        >
            <View>
                <Text className="text-xs font-semibold text-gray-500">SHIP NAME</Text>
                <TextInput
                    className="rounded-md bg-gray-200 px-3 py-1 text-black"
                    value={cruiseReservationInfo.shipName}
                    onChangeText={(text) => setCruiseReservationInfo((prevState) => ({ ...prevState, shipName: text }))}
                />
            </View>
            {/* DEPART */}
            <View>
                <Text className="text-xs font-semibold text-gray-500">DEPART</Text>
                <View className="mt-1 flex-row items-center space-x-2">
                    <TextInput
                        className="rounded-md bg-gray-200 px-3 py-1 text-black"
                        value={dayjs(cruiseReservationInfo.departureDate).format('MM/DD/YYYY hh:mm A')}
                        onFocus={() => {
                            if (openSelectDateView) openSelectDateView();
                            if (setSelectedDateType) setSelectedDateType('startDate');
                        }}
                    />
                    <TextInput
                        className="flex-1 rounded-md bg-gray-200 px-3 py-1 text-black"
                        value={cruiseReservationInfo.departurePlace}
                        onChangeText={(text) =>
                            setCruiseReservationInfo((prevState) => ({ ...prevState, departurePlace: text }))
                        }
                        placeholder="Departure or Port"
                    />
                </View>
            </View>
            {/* ARRIVE */}
            <View>
                <Text className="text-xs font-semibold text-gray-500">ARRIVE</Text>
                <View className="mt-1 flex-row items-center space-x-2">
                    <TextInput
                        className="rounded-md bg-gray-200 px-3 py-1 text-black"
                        value={dayjs(cruiseReservationInfo.arrivalDate).format('MM/DD/YYYY hh:mm A')}
                        onFocus={() => {
                            if (openSelectDateView) openSelectDateView();
                            if (setSelectedDateType) setSelectedDateType('endDate');
                        }}
                    />
                    <TextInput
                        className="flex-1 rounded-md bg-gray-200 px-3 py-1 text-black"
                        value={cruiseReservationInfo.arrivalPlace}
                        onChangeText={(text) =>
                            setCruiseReservationInfo((prevState) => ({ ...prevState, arrivalPlace: text }))
                        }
                        placeholder="Destination or Port"
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
                        value={cruiseReservationInfo.confirmationCode}
                        onChangeText={(text) =>
                            setCruiseReservationInfo((prevState) => ({ ...prevState, confirmationCode: text }))
                        }
                    />
                </View>
                <View className="flex-1">
                    <Text className="text-xs font-semibold text-gray-500">COST</Text>
                    <View className="mt-1 flex-row items-center space-x-2 rounded-md bg-gray-200 px-3 py-1">
                        <TouchableOpacity onPress={openChangeCurrencyView}>
                            <Text className="text-xs text-gray-500">{cruiseReservationInfo.currency} ▾</Text>
                        </TouchableOpacity>
                        <TextInput
                            className="text-xs text-gray-500"
                            placeholder="0.00"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            returnKeyType="done"
                            value={cruiseReservationInfo.displayPrice}
                            onChangeText={handlePriceChange}
                        />
                    </View>
                    {errorMessage !== '' && <Text className="mt-1 text-xs text-red-500">{errorMessage}</Text>}
                </View>
            </View>

            {/* FOOTER ICONS */}
            {!isCreateManually && (
                <View className="flex-row items-center justify-end space-x-2 pt-2">
                    <TouchableOpacity onPress={handleDeleteCruiseReservation}>
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
            className="w-full space-y-3 rounded-xl border border-gray-200 bg-gray-100 p-4"
            onPress={() => {
                if (!isCreateManually) return;
                setOpen(true);
            }}
        >
            {/* Route Info */}
            <Text className="text-base font-bold text-black">{cruiseReservationInfo.shipName}</Text>
            <View className="flex-row items-center space-x-2">
                <Text className="text-sm text-black">Depart: {cruiseReservationInfo.departurePlace}</Text>
                <Text className="text-base font-bold">•</Text>
                <Text className="text-sm text-black">{formatDateToDayMonth(cruiseReservationInfo.departureDate)}</Text>
                <Text className="text-base font-bold">•</Text>
                <Text className="text-sm text-gray-500">Add time</Text>
            </View>
            <View className="flex-row flex-wrap items-center space-x-2">
                <Text className="text-sm text-black">Arrive: {cruiseReservationInfo.departurePlace}</Text>
                <Text className="text-base font-bold">•</Text>
                <Text className="text-sm text-black">{formatDateToDayMonth(cruiseReservationInfo.arrivalDate)}</Text>
                <Text className="text-base font-bold">•</Text>
                <Text className="text-sm text-gray-500">Add time</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CruiseReservationCard;
