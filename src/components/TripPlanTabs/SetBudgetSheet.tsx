import React, { useState } from 'react';
import { Alert, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Iconify from 'react-native-iconify';

import { useUpdateTripBudget } from '@/src/hooks/use-trip';
import { currencies } from '@/src/utils/constants';

const ChangeCurrency = ({
    setView,
    setSnapPoints,
    setCurrencySymbol
}: {
    setView: (view: string) => void;
    setSnapPoints: (points: string[]) => void;
    setCurrencySymbol: (symbol: string) => void;
}) => {
    const [searchText, setSearchText] = React.useState('');
    const [selectedCurrency, setSelectedCurrency] = React.useState('USD');

    return (
        <View className="bg-white p-4">
            {/* Header */}
            <View className="relative flex-row items-center justify-center">
                <TouchableOpacity onPress={() => setView('budget')} className="absolute left-4">
                    <Text className="text-base text-black">←</Text>
                </TouchableOpacity>
                <Text className="text-center text-base font-bold">Change currency</Text>
                <View />
            </View>

            {/* Search Bar */}
            <View className="mt-4 flex-row items-center rounded-lg bg-gray-100 px-4">
                <TextInput
                    placeholder="Search currency"
                    className="flex-1 py-4 text-xs text-gray-600"
                    value={searchText}
                    onChangeText={setSearchText}
                />
                {searchText.length > 0 ? (
                    <TouchableOpacity
                        className="h-6 w-6 items-center justify-center rounded-full bg-gray-300"
                        onPress={() => {
                            setSearchText('');
                        }}
                    >
                        <Iconify icon="mdi:close" width={18} height={18} color="#555" />
                    </TouchableOpacity>
                ) : null}
            </View>

            {/* Currency List */}
            <ScrollView className="mt-2 max-h-[500px]">
                {currencies
                    .filter(
                        (currency) =>
                            currency.name.toLowerCase().includes(searchText.toLowerCase()) ||
                            currency.code.toLowerCase().includes(searchText.toLowerCase())
                    )
                    .map((currency) => (
                        <TouchableOpacity
                            key={currency.code}
                            className="py-4"
                            onPress={() => {
                                setSelectedCurrency(currency.code);
                                setCurrencySymbol(currency.symbol);
                                setSnapPoints(['40%']);
                                setView('budget');
                            }}
                        >
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center justify-start space-x-4">
                                    <Iconify icon={currency.icon} width={24} height={24} />
                                    <View>
                                        <Text className="text-sm">{currency.name}</Text>
                                        <Text className="text-xs text-gray-500">{currency.code}</Text>
                                    </View>
                                </View>
                                {selectedCurrency === currency.code && <Icon name="check" color="#60ABEF" />}
                            </View>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </View>
    );
};

const SetBudget = ({
    tripId,
    initialBudget,
    closeSheet,
    setView,
    currencySymbol,
    setSnapPoints
}: {
    tripId: number;
    initialBudget: number;
    closeSheet: () => void;
    setView: (view: string) => void;
    currencySymbol: string;
    setSnapPoints: (points: string[]) => void;
}) => {
    const { isPending: isPendingUpdateTripBudget, updateTripBudget } = useUpdateTripBudget();
    const [budget, setBudget] = useState(initialBudget);
    const [displayBudget, setDisplayBudget] = useState(
        initialBudget ? initialBudget.toLocaleString('en-US', { maximumFractionDigits: 2 }) : ''
    );

    const handleBudgetChange = (text: string) => {
        const cleanedText = text.replace(/[^0-9.,]/g, '');
        setDisplayBudget(cleanedText);

        const parsedValue = parseFloat(cleanedText.replace(/,/g, '.')).toFixed(2);
        setBudget(Number.isNaN(Number(parsedValue)) ? 0 : Number(parsedValue));
    };

    return (
        <View className="bg-white p-4">
            <View className="flex-row items-center justify-between">
                <TouchableOpacity onPress={closeSheet}>
                    <Text className="text-sm text-gray-500">Cancel</Text>
                </TouchableOpacity>
                <Text className="text-center text-base font-bold">Set Budget</Text>
                <TouchableOpacity
                    onPress={() => {
                        updateTripBudget(
                            { tripId, updateTripBudgetReq: { budget, currency: currencySymbol } },
                            {
                                onSuccess: () => {
                                    Keyboard.dismiss();
                                    Alert.alert('New budget set !');
                                },
                                onError: (error: { message: string }) => {
                                    Alert.alert('Set Budget Failed', error.message, [
                                        {
                                            text: 'Try Again',
                                            onPress: () => console.log('User retries change budget')
                                        },
                                        { text: 'Cancel', style: 'cancel' }
                                    ]);
                                }
                            }
                        );
                        closeSheet();
                    }}
                    disabled={isPendingUpdateTripBudget}
                >
                    <Text className="text-sm text-[#60ABEF]">Save</Text>
                </TouchableOpacity>
            </View>
            <View className="mt-4 flex-row items-center justify-center">
                <TouchableOpacity
                    onPress={() => {
                        setSnapPoints(['70%']);
                        setView('currency');
                    }}
                >
                    <Text className="text-3xl text-black">{currencySymbol} ▾</Text>
                </TouchableOpacity>
                <TextInput
                    className="p-4 text-3xl"
                    placeholder="0.00"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    returnKeyType="done"
                    value={displayBudget}
                    onChangeText={handleBudgetChange}
                />
            </View>
        </View>
    );
};

export const SetBudgetSheet = ({
    tripId,
    initialBudget,
    currency,
    closeSheet,
    setSnapPoints
}: {
    tripId: number;
    initialBudget: number;
    currency: string;
    closeSheet: () => void;
    setSnapPoints: (points: string[]) => void;
}) => {
    const [view, setView] = useState('budget'); // 'budget' or 'currency'
    const [currencySymbol, setCurrencySymbol] = useState(currency);

    return view === 'currency' ? (
        <ChangeCurrency setView={setView} setSnapPoints={setSnapPoints} setCurrencySymbol={setCurrencySymbol} />
    ) : (
        <SetBudget
            tripId={tripId}
            initialBudget={initialBudget}
            closeSheet={closeSheet}
            setView={setView}
            setSnapPoints={setSnapPoints}
            currencySymbol={currencySymbol}
        />
    );
};
