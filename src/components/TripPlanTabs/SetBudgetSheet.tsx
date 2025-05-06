import { useState } from 'react';
import { Alert, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useUpdateTripBudget } from '@/src/hooks/use-trip';

import { ChangeCurrency } from './ChangeCurrency';

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
    const [budget, setBudget] = useState<number | undefined>(initialBudget);
    const [displayBudget, setDisplayBudget] = useState(initialBudget ? initialBudget.toLocaleString('en-US') : '');
    const [errorMessage, setErrorMessage] = useState('');

    const handleBudgetChange = (text: string) => {
        setDisplayBudget(text);
        const delimiterCount = (text.match(/[.,]/g) || []).length;
        if (delimiterCount > 1) {
            setErrorMessage('Please enter a valid amount');
            setBudget(undefined);
            return;
        }

        setErrorMessage('');
        const parsedValue = parseFloat(text.replace(/,/g, '.'));
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
                        if (budget) {
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
                        }
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
            <View className="mt-1 flex-row items-center justify-center">
                {errorMessage !== '' && <Text className="text-xs text-red-500">{errorMessage}</Text>}
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
        <ChangeCurrency
            currencySymbol={currencySymbol}
            handleBack={() => setView('budget')}
            handleSetSnapPoints={() => setSnapPoints(['40%'])}
            setCurrencySymbol={setCurrencySymbol}
        />
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
