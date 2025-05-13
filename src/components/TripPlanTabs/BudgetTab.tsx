import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';
import Iconify from 'react-native-iconify';
import * as Progress from 'react-native-progress';

import { useDeleteTripExpense, useTripBudgetDetails, useTripExpenses } from '@/src/hooks/use-trip';
import { formatAmount } from '@/src/utils/AmountUtil';
import { currencies } from '@/src/utils/constants';

import { AddExpenseSheet } from './AddExpenseSheet';
import { ExpenseCard } from './ExpenseCard';
import { SetBudgetSheet } from './SetBudgetSheet';
import ExpenseSummarySheet from './TripExpenseSummarySheet';

const sortTypeList = [
    { heading: 'Date (newest first)', sortBy: 'date', sortOrder: 'desc' },
    { heading: 'Date (oldest first)', sortBy: 'date', sortOrder: 'asc' },
    { heading: 'Amount (highest first)', sortBy: 'expense', sortOrder: 'desc' },
    { heading: 'Amount (lowest first)', sortBy: 'expense', sortOrder: 'asc' },
    { heading: 'Category', sortBy: 'tripExpenseType', sortOrder: 'asc' }
];

export default function BudgetTab({
    trip,
    openSheet,
    closeSheet,
    setBottomSheetContent,
    setSnapPoints
}: {
    trip: any;
    openSheet: () => void;
    closeSheet: () => void;
    setBottomSheetContent: (content: React.ReactNode) => void;
    setSnapPoints: (points: string[]) => void;
}) {
    const { t } = useTranslation();

    const [sortType, setSortType] = useState(sortTypeList[0]);
    const { isLoading: isLoadingTripBudget, tripBudget } = useTripBudgetDetails(trip.id);
    const { isLoading: isLoadingTripExpenses, tripExpenses } = useTripExpenses(
        trip.id,
        sortType?.sortBy || 'date',
        sortType?.sortOrder || 'desc'
    );
    const { isPending: isPendingDeleteTripExpense, deleteTripExpense } = useDeleteTripExpense();

    if (isLoadingTripBudget || isLoadingTripExpenses) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#60ABEF" />
            </View>
        );
    }

    return (
        <View className="relative flex-1">
            {/* Budget Section */}
            <View className="items-center bg-[#094477] p-4">
                <Text className="text-3xl font-bold text-white">
                    {tripBudget.currency}
                    {formatAmount(tripBudget.totalExpense)}
                </Text>
                <Progress.Bar
                    progress={tripBudget.totalExpense / tripBudget.budget}
                    width={200}
                    color="#5854d6"
                    unfilledColor="#fff"
                    borderColor="#fffff"
                />
                <TouchableOpacity
                    className="mt-1 flex-row items-center space-x-1"
                    onPress={() => {
                        setBottomSheetContent(
                            <SetBudgetSheet
                                tripId={trip.id}
                                initialBudget={tripBudget.budget}
                                currency={tripBudget.currency}
                                closeSheet={closeSheet}
                                setSnapPoints={setSnapPoints}
                            />
                        );
                        openSheet();
                        setSnapPoints(['40%']);
                    }}
                >
                    <Text className="text-xs text-white">
                        {t('Budget')}: {tripBudget.currency}
                        {formatAmount(tripBudget.budget)}
                    </Text>
                    <Iconify icon="mdi:pencil" className="text-white" size={12} />
                </TouchableOpacity>
                {/* Buttons */}
                <View className="mt-4 flex-row justify-around space-x-1">
                    <TouchableOpacity className="flex-row items-center rounded-full border-2 border-white p-2">
                        <Icon name="person-add-alt" type="material-icons" color="white" size={16} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex-row items-center rounded-full border-2 border-white p-2"
                        onPress={() => {
                            setBottomSheetContent(
                                <ExpenseSummarySheet tripId={trip.id} setSnapPoints={setSnapPoints} />
                            );
                            openSheet();
                            setSnapPoints(['80%']);
                        }}
                    >
                        <Icon name="coins" type="font-awesome-5" color="white" size={14} />
                        <Text className="ml-2 font-bold text-white">{t('Group balances')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center rounded-full border-2 border-white p-2">
                        <Icon type="font-awesome-5" name="chart-bar" color="white" size={16} />
                        <Text className="ml-2 font-bold text-white">{t('View breakdown')}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Expenses List */}
            <View className="flex-1 rounded-t-3xl bg-white p-4">
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-bold">{t('Expenses')}</Text>
                    <TouchableOpacity
                        className="flex-row items-center"
                        onPress={() => {
                            setBottomSheetContent(
                                <View className="bg-white p-4">
                                    {sortTypeList.map((type, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            className="mt-2 w-full flex-row items-center justify-between p-2"
                                            onPress={() => {
                                                setSortType(type);
                                                closeSheet();
                                            }}
                                        >
                                            <Text className="text-sm text-gray-700">{t(type.heading)}</Text>
                                            {sortType?.sortBy === type.sortBy &&
                                                sortType.sortOrder === type.sortOrder && (
                                                    <Icon name="check" color="#60ABEF" />
                                                )}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            );
                            openSheet();
                            setSnapPoints(['40%']);
                        }}
                    >
                        <Text className="text-xs font-extrabold text-black">{t('Sort')}: </Text>
                        <Text className="text-xs text-gray-500">{t(sortType?.heading || '')} </Text>
                        <Text className="text-sm font-extrabold text-black">▾</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView className="mt-3" contentContainerStyle={{ paddingBottom: 200 }}>
                    {tripExpenses.map((expense: any) => (
                        <Swipeable
                            renderRightActions={() => (
                                <TouchableOpacity
                                    className="ml-4 w-20 items-center justify-center bg-red-500"
                                    onPress={() => deleteTripExpense({ expenseId: expense.id, tripId: trip.id })}
                                    disabled={isPendingDeleteTripExpense}
                                >
                                    <Text className="font-bold text-white">{t('Delete')}</Text>
                                </TouchableOpacity>
                            )}
                            key={expense.id}
                        >
                            <TouchableOpacity
                                key={expense.id}
                                onPress={() => {
                                    setBottomSheetContent(
                                        <AddExpenseSheet
                                            tripId={trip.id}
                                            currency={tripBudget.currency}
                                            currencyCode={
                                                currencies.find((currency) => currency.symbol === tripBudget.currency)
                                                    ?.code || ''
                                            }
                                            participants={trip.participants}
                                            closeSheet={closeSheet}
                                            expenseId={expense.id}
                                        />
                                    );
                                    openSheet();
                                    setSnapPoints(['80%']);
                                }}
                            >
                                <ExpenseCard
                                    expense={expense}
                                    openSheet={openSheet}
                                    setBottomSheetContent={setBottomSheetContent}
                                    setSnapPoints={setSnapPoints}
                                />
                            </TouchableOpacity>
                        </Swipeable>
                    ))}
                </ScrollView>
            </View>

            {/* Add Expense Button */}
            <View className="absolute bottom-7 flex w-full items-center justify-center">
                <TouchableOpacity
                    className="rounded-full bg-[#60ABEF] px-4 py-2 shadow-lg"
                    onPress={() => {
                        setBottomSheetContent(
                            <AddExpenseSheet
                                isCreateNewExpense
                                tripId={trip.id}
                                currency={tripBudget.currency}
                                currencyCode={
                                    currencies.find((currency) => currency.symbol === tripBudget.currency)?.code || ''
                                }
                                participants={trip.participants}
                                closeSheet={closeSheet}
                            />
                        );
                        openSheet();
                        setSnapPoints(['80%']);
                    }}
                >
                    <Text className="text-sm font-bold text-white">+ {t('Add expense')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
