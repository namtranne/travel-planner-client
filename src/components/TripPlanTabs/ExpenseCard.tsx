import type React from 'react';
import { useCallback } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import Iconify from 'react-native-iconify';

import { formatAmount } from '@/src/utils/AmountUtil';
import { capitalizeFirstLetter } from '@/src/utils/CommonUtil';
import { convertDateFormat } from '@/src/utils/DateTimeUtil';

const expenseIcons: Record<string, string> = {
    TRANSPORTATION: 'mdi:bus',
    LODGING: 'mdi:bed',
    FOOD_AND_DRINK: 'mdi:food',
    SIGHTSEEING: 'mdi:binoculars',
    ACTIVITIES: 'mdi:run',
    SHOPPING: 'mdi:shopping',
    GROCERIES: 'mdi:cart',
    OTHER: 'mdi:help-circle-outline'
};

type TripExpense = {
    id: number;
    details: string;
    tripExpenseType: string;
    tripExpenseSplitType: string;
    expense: number;
    date?: string;
    tripExpenseIndividuals: any[];
    payer: any;
};

export const ExpenseCard = ({
    expense,
    openSheet,
    setBottomSheetContent,
    setSnapPoints,
    currency
}: {
    expense: TripExpense;
    openSheet: () => void;
    setBottomSheetContent: (content: React.ReactNode) => void;
    setSnapPoints: (points: string[]) => void;
    currency: string;
}) => {
    const maxAvatars = 3;
    const displayExpenseIndividuals = expense.tripExpenseIndividuals.slice(0, maxAvatars);
    const extraIndividuals = displayExpenseIndividuals.length - maxAvatars;
    const isDisplayAvatar: boolean =
        expense.tripExpenseSplitType === 'INDIVIDUALS' || expense.tripExpenseSplitType === 'EVERYONE';

    const getExpenseIcon = useCallback((type: string) => expenseIcons[type] || 'mdi:help-circle-outline', []); // Fallback icon
    return (
        <View className="flex-row items-center justify-between space-x-2 border-b border-gray-200 py-3">
            <View className="flex-[4] flex-row items-center">
                <View className="rounded-full bg-gray-300 p-2">
                    <Iconify icon={getExpenseIcon(expense.tripExpenseType)} className="text-gray-500" size={16} />
                </View>
                <View className="ml-3">
                    <Text className="text-base font-bold">{expense.details}</Text>
                    <View className="flex-row items-center">
                        {expense.date && (
                            <Text className="text-sm text-gray-500">{convertDateFormat(expense.date)} • </Text>
                        )}
                        <Text className="text-sm text-gray-500">
                            {capitalizeFirstLetter(expense.tripExpenseType.split('_')[0] || '')}
                        </Text>
                    </View>
                </View>
            </View>
            <View className="flex-[2] items-end">
                <Text className="text-base font-bold">
                    {currency}
                    {formatAmount(expense.expense)}
                </Text>
                <TouchableOpacity
                    className="flex-row items-center justify-end"
                    onPress={() => {
                        setBottomSheetContent(
                            <View className="bg-white p-4">
                                <Text className="text-center text-base font-bold">Expense split with</Text>
                                <ScrollView>
                                    {displayExpenseIndividuals.map((expenseIndividual, index) => (
                                        <View key={index} className="mt-2 flex-row items-center">
                                            <Avatar
                                                rounded
                                                size={40}
                                                source={
                                                    expenseIndividual.individual.avatarUrl
                                                        ? { uri: expenseIndividual.individual.avatarUrl }
                                                        : undefined
                                                }
                                                title={expenseIndividual.individual.name[0].toUpperCase() || undefined}
                                                titleStyle={{ fontSize: 12 }}
                                                containerStyle={{
                                                    borderWidth: 2,
                                                    borderColor: 'white',
                                                    backgroundColor: 'gray'
                                                }}
                                            />
                                            <Text className="ml-2 text-base font-semibold">
                                                {expenseIndividual.individual.name}
                                            </Text>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        );
                        openSheet();
                        setSnapPoints(['40%']);
                    }}
                >
                    {isDisplayAvatar &&
                        displayExpenseIndividuals.map((expenseIndividual, index) => (
                            <Avatar
                                key={index}
                                rounded
                                size={30}
                                source={
                                    expenseIndividual.individual.avatarUrl
                                        ? { uri: expenseIndividual.individual.avatarUrl }
                                        : undefined
                                }
                                title={expenseIndividual.individual.name[0].toUpperCase() || undefined}
                                titleStyle={{ fontSize: 12 }}
                                containerStyle={{
                                    borderWidth: 2,
                                    borderColor: 'white',
                                    backgroundColor: 'gray',
                                    marginLeft: index !== 0 ? -8 : 0
                                }}
                            />
                        ))}
                    {isDisplayAvatar && extraIndividuals > 0 && (
                        <Avatar
                            rounded
                            size={30}
                            title={`+${extraIndividuals}`}
                            titleStyle={{ fontSize: 12 }}
                            containerStyle={{
                                marginLeft: -8,
                                borderWidth: 2,
                                borderColor: 'white',
                                backgroundColor: 'gray'
                            }}
                        />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};
