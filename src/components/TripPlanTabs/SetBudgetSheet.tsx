import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Iconify from 'react-native-iconify';

const currencies = [
    { name: 'US Dollar', code: 'USD' },
    { name: 'United Arab Emirates Dirham', code: 'AED' },
    { name: 'Afghan Afghani', code: 'AFN' },
    { name: 'Albanian Lek', code: 'ALL' },
    { name: 'Armenian Dram', code: 'AMD' },
    { name: 'NL Antillean Guilder', code: 'ANG' },
    { name: 'Angolan Kwanza', code: 'AOA' },
    { name: 'Argentine Peso', code: 'ARS' }
    // Add more currencies as needed
];

const ChangeCurrency = ({ setView }: { setView: (view: string) => void }) => {
    const [searchText, setSearchText] = React.useState('');
    const [selectedCurrency, setSelectedCurrency] = React.useState('USD');

    return (
        <View className="bg-white p-4">
            {/* Header */}
            <View className="flex-row items-center justify-between">
                <TouchableOpacity onPress={() => setView('budget')}>
                    <Text className="text-base text-black">←</Text>
                </TouchableOpacity>
                <Text className="text-center text-base font-bold">Set Budget</Text>
                <View />
            </View>

            {/* Search Bar */}
            <View className="mt-4 flex-row items-center rounded-lg bg-gray-100 px-4">
                <TextInput
                    placeholder="Search by name or address"
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
            <ScrollView className="mt-2">
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
                            onPress={() => setSelectedCurrency(currency.code)}
                        >
                            <View className="flex-row justify-between">
                                <View>
                                    <Text className="text-sm">{currency.name}</Text>
                                    <Text className="text-xs text-gray-500">{currency.code}</Text>
                                </View>
                                {selectedCurrency === currency.code && <Icon name="check" color="#60ABEF" />}
                            </View>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </View>
    );
};

const SetBudget = ({ closeSheet, setView }: { closeSheet: () => void; setView: (view: string) => void }) => {
    return (
        <View className="bg-white p-4">
            <View className="flex-row items-center justify-between">
                <TouchableOpacity onPress={closeSheet}>
                    <Text className="text-sm text-gray-500">Cancel</Text>
                </TouchableOpacity>
                <Text className="text-center text-base font-bold">Set Budget</Text>
                <TouchableOpacity onPress={closeSheet}>
                    <Text className="text-sm text-[#60ABEF]">Save</Text>
                </TouchableOpacity>
            </View>
            <View className="mt-4 flex-row items-center justify-center">
                <TouchableOpacity onPress={() => setView('currency')}>
                    <Text className="text-3xl text-black">$ ▾</Text>
                </TouchableOpacity>
                <TextInput
                    className="p-4 text-3xl"
                    placeholder="0.00"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    returnKeyType="done"
                />
            </View>
        </View>
    );
};

export const SetBudgetSheet = ({
    openSheet,
    closeSheet,
    setBottomSheetContent,
    setSnapPoints
}: {
    openSheet: () => void;
    closeSheet: () => void;
    setBottomSheetContent: (content: React.ReactNode) => void;
    setSnapPoints: (points: string[]) => void;
}) => {
    const [view, setView] = useState('budget'); // 'budget' or 'currency'
    return view === 'currency' ? (
        <ChangeCurrency setView={setView} />
    ) : (
        <SetBudget closeSheet={closeSheet} setView={setView} />
    );
};
