import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Iconify from 'react-native-iconify';

import { currencies } from '@/src/utils/constants';

export const ChangeCurrency = ({
    currencySymbol,
    handleBack,
    handleSetSnapPoints,
    setCurrencySymbol
}: {
    currencySymbol: string;
    handleBack: () => void;
    handleSetSnapPoints?: () => void;
    setCurrencySymbol: (symbol: string) => void;
}) => {
    const [searchText, setSearchText] = React.useState('');
    const [selectedCurrency, setSelectedCurrency] = React.useState(currencySymbol || '$');

    return (
        <View className="bg-white p-4">
            {/* Header */}
            <View className="relative flex-row items-center justify-center">
                <TouchableOpacity onPress={handleBack} className="absolute left-4">
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
                                setSelectedCurrency(currency.symbol);
                                setCurrencySymbol(currency.symbol);
                                if (handleSetSnapPoints) handleSetSnapPoints();
                                handleBack();
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
                                {selectedCurrency === currency.symbol && <Icon name="check" color="#60ABEF" />}
                            </View>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </View>
    );
};
