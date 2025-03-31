import React, { useState } from 'react';
import { Alert, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Iconify from 'react-native-iconify';

import { useUpdateTripBudget } from '@/src/hooks/use-trip';

const currencies = [
    { name: 'US Dollar', code: 'USD', symbol: '$', icon: 'openmoji:flag-us-outlying-islands' },
    { name: 'Euro', code: 'EUR', symbol: '€', icon: 'openmoji:flag-european-union' },
    { name: 'British Pound', code: 'GBP', symbol: '£', icon: 'openmoji:flag-british-indian-ocean-territory' },
    { name: 'Japanese Yen', code: 'JPY', symbol: '¥', icon: 'openmoji:flag-japan' },
    { name: 'Australian Dollar', code: 'AUD', symbol: 'A$', icon: 'openmoji:flag-australia' },
    { name: 'Canadian Dollar', code: 'CAD', symbol: 'C$', icon: 'openmoji:flag-canada' },
    { name: 'Swiss Franc', code: 'CHF', symbol: 'CHF', icon: 'emojione-v1:flag-for-switzerland' },
    { name: 'Chinese Yuan', code: 'CNY', symbol: '¥', icon: 'openmoji:flag-china' },
    { name: 'Hong Kong Dollar', code: 'HKD', symbol: 'HK$', icon: 'openmoji:flag-hong-kong-sar-china' },
    { name: 'Singapore Dollar', code: 'SGD', symbol: 'S$', icon: 'openmoji:flag-singapore' },
    { name: 'South Korean Won', code: 'KRW', symbol: '₩', icon: 'openmoji:flag-south-korea' },
    { name: 'New Zealand Dollar', code: 'NZD', symbol: 'NZ$', icon: 'openmoji:flag-new-zealand' },
    { name: 'Mexican Peso', code: 'MXN', symbol: 'Mex$', icon: 'openmoji:flag-mexico' },
    { name: 'Indian Rupee', code: 'INR', symbol: '₹', icon: 'openmoji:flag-india' },
    { name: 'Brazilian Real', code: 'BRL', symbol: 'R$', icon: 'openmoji:flag-brazil' },
    { name: 'South African Rand', code: 'ZAR', symbol: 'R', icon: 'openmoji:flag-south-africa' },
    { name: 'Russian Ruble', code: 'RUB', symbol: '₽', icon: 'openmoji:flag-russia' },
    { name: 'Turkish Lira', code: 'TRY', symbol: '₺', icon: 'openmoji:flag-turkey' },
    { name: 'United Arab Emirates Dirham', code: 'AED', symbol: 'د.إ', icon: 'openmoji:flag-united-arab-emirates' },
    { name: 'Thai Baht', code: 'THB', symbol: '฿', icon: 'openmoji:flag-thailand' },
    { name: 'Indonesian Rupiah', code: 'IDR', symbol: 'Rp', icon: 'openmoji:flag-indonesia' },
    { name: 'Philippine Peso', code: 'PHP', symbol: '₱', icon: 'openmoji:flag-philippines' },
    { name: 'Vietnamese Dong', code: 'VND', symbol: '₫', icon: 'openmoji:flag-vietnam' },
    { name: 'Saudi Riyal', code: 'SAR', symbol: '﷼', icon: 'openmoji:flag-saudi-arabia' },
    { name: 'Malaysian Ringgit', code: 'MYR', symbol: 'RM', icon: 'openmoji:flag-malaysia' },
    { name: 'Colombian Peso', code: 'COP', symbol: 'COL$', icon: 'openmoji:flag-colombia' },
    { name: 'Chilean Peso', code: 'CLP', symbol: 'CLP$', icon: 'openmoji:flag-chile' },
    { name: 'Egyptian Pound', code: 'EGP', symbol: 'E£', icon: 'openmoji:flag-egypt' },
    { name: 'Nigerian Naira', code: 'NGN', symbol: '₦', icon: 'openmoji:flag-nigeria' },
    { name: 'Argentine Peso', code: 'ARS', symbol: 'ARS$', icon: 'openmoji:flag-argentina' }
];

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
            <View className="flex-row items-center justify-between">
                <TouchableOpacity
                    onPress={() => {
                        setSnapPoints(['40%']);
                        setView('budget');
                    }}
                >
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

    const handleTextChange = (text: string) => {
        const cleanedText = text.replace(/[^0-9.,]/g, '');
        setDisplayBudget(cleanedText);

        const parsedValue = parseFloat(cleanedText.replace(/,/g, '.')).toFixed(2);
        setBudget(isNaN(Number(parsedValue)) ? 0 : Number(parsedValue));
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
                    onChangeText={handleTextChange}
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
