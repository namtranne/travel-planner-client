import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';
import Toast from 'react-native-toast-message';

import { useGetTripDebtSettlements, useGroupTripDebts, useMyTripDebts, useSettleTripDebt } from '@/src/hooks/use-trip';
import { getDaysAgo } from '@/src/utils/DateTimeUtil';

enum TripExpenseSummaryScreen {
    EXPENSE_SUMMARY = 'EXPENSE_SUMMARY',
    TRANSACTION_HISTORY = 'TRANSACTION_HISTORY',
    SETTLE_UP = 'SETTLE_UP',
    ENTER_AMOUNT = 'ENTER_AMOUNT'
}

enum ExpenseSummaryTab {
    YOUR_SUMMARY = 'YOUR_SUMMARY',
    GROUP_OVERVIEW = 'GROUP_OVERVIEW'
}

function EnterAmount({
    tripId,
    setCurrentScreen,
    settleUpDetails,
    setSnapPoints,
    setSettleUpDetails
}: {
    tripId: number;
    setCurrentScreen: React.Dispatch<React.SetStateAction<TripExpenseSummaryScreen>>;
    settleUpDetails: any;
    setSnapPoints: (points: string[]) => void;
    setSettleUpDetails: React.Dispatch<React.SetStateAction<any>>;
}) {
    const { t } = useTranslation();
    const [displayAmount, setDisplayAmount] = useState('');
    const [amount, setAmount] = useState<number | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState('');
    const { isPending: isPendingSettleTripDebt, settleTripDebt } = useSettleTripDebt();

    const handleAmountChange = (text: string) => {
        if (settleUpDetails.isFullyPaid) setSettleUpDetails((prev: any) => ({ ...prev, isFullyPaid: false }));
        setDisplayAmount(text);

        const delimiterCount = (text.match(/[.,]/g) || []).length;
        if (delimiterCount > 1) {
            setErrorMessage(t('Please enter a valid amount'));
            setAmount(undefined);
            return;
        }

        setErrorMessage('');
        const parsedValue = parseFloat(text.replace(/,/g, '.'));
        setAmount(Number.isNaN(parsedValue) ? 0 : Number(parsedValue));
    };

    return (
        <View className="relative h-full bg-white">
            <View className="relative flex-row items-center justify-center">
                <TouchableOpacity
                    onPress={() => {
                        setCurrentScreen(TripExpenseSummaryScreen.EXPENSE_SUMMARY);
                        setSnapPoints(['70%']);
                    }}
                    className="absolute left-4"
                >
                    <Text className="text-base text-black">←</Text>
                </TouchableOpacity>
                <Text className="text-center text-base font-bold">{t('Record a payment')}</Text>
                <View />
            </View>
            <View className="mt-4 space-y-6 px-4">
                <View className="border-b border-gray-200 py-2">
                    <View className="flex-row items-center">
                        <Text className="mr-2 text-xl font-semibold">{settleUpDetails.currency}</Text>
                        <TextInput
                            className="text-xl font-semibold"
                            placeholder="0.00"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            returnKeyType="done"
                            value={displayAmount}
                            onChangeText={handleAmountChange}
                        />
                    </View>
                    {errorMessage !== '' && <Text className="mt-1 text-xs text-red-500">{errorMessage}</Text>}
                    <View className="mt-2 flex-row items-center space-x-4">
                        <TouchableOpacity
                            onPress={() => {
                                setSettleUpDetails((prev: any) => ({ ...prev, isFullyPaid: false }));
                                setAmount(undefined);
                                setDisplayAmount('');
                            }}
                            className="mb-4 flex-row items-center"
                        >
                            <View
                                className={`mr-2 h-4 w-4 rounded-full border-2 ${
                                    !settleUpDetails.isFullyPaid ? 'border-[#60ABEF]' : 'border-gray-400'
                                } items-center justify-center`}
                            >
                                {!settleUpDetails.isFullyPaid && <View className="h-2 w-2 rounded-full bg-[#60ABEF]" />}
                            </View>
                            <Text className="text-[14px] text-gray-500">{t('Partial paid')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setSettleUpDetails((prev: any) => ({ ...prev, isFullyPaid: true }));
                                setAmount(settleUpDetails.fullAmount);
                                setDisplayAmount(settleUpDetails.fullAmount.toFixed(2).toString());
                            }}
                            className="mb-4 flex-row items-center"
                        >
                            <View
                                className={`mr-2 h-4 w-4 rounded-full border-2 ${
                                    settleUpDetails.isFullyPaid ? 'border-[#60ABEF]' : 'border-gray-400'
                                } items-center justify-center`}
                            >
                                {settleUpDetails.isFullyPaid && <View className="h-2 w-2 rounded-full bg-[#60ABEF]" />}
                            </View>
                            <Text className="text-[14px] text-gray-500">{t('Fully paid')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="flex-row items-center justify-between border-b border-gray-200 py-2">
                    <Text className="text-base font-bold">
                        {t('From')}: <Text className="font-normal">{settleUpDetails.fromUserName}</Text>
                    </Text>
                </View>
                <View className="flex-row items-center justify-between border-b border-gray-200 py-2">
                    <Text className="text-base font-bold">
                        {t('To')}: <Text className="font-normal">{settleUpDetails.toUserName}</Text>
                    </Text>
                </View>
            </View>
            <View className="absolute inset-x-0 bottom-0 items-center justify-center space-x-2 bg-white px-4 pb-4 pt-2 shadow-lg">
                <TouchableOpacity
                    className="items-center rounded-full bg-[#60ABEF] p-4"
                    onPress={() => {
                        if (!settleUpDetails.isFullyPaid && (amount === undefined || amount <= 0 || errorMessage)) {
                            Toast.show({
                                type: 'error',
                                text1: t('Please enter a valid amount'),
                                text2Style: { flexWrap: 'wrap' },
                                position: 'top'
                            });
                            return;
                        }
                        settleTripDebt(
                            {
                                tripId,
                                settleTripDebtReq: {
                                    tripDebtId: settleUpDetails.tripDebtId,
                                    isFullyPaid: settleUpDetails.isFullyPaid,
                                    amount: amount || 0
                                }
                            },
                            {
                                onSuccess: () => {
                                    Toast.show({
                                        type: 'success',
                                        text1: 'Payment saved',
                                        position: 'top'
                                    });
                                    setCurrentScreen(TripExpenseSummaryScreen.EXPENSE_SUMMARY);
                                    setSnapPoints(['70%']);
                                }
                            }
                        );
                    }}
                    disabled={isPendingSettleTripDebt}
                >
                    <Text className="font-semibold text-white">{t('Mark as paid')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function SettleUp({
    tripId,
    setCurrentScreen,
    setSnapPoints,
    setSettleUpDetails
}: {
    tripId: number;
    setCurrentScreen: React.Dispatch<React.SetStateAction<TripExpenseSummaryScreen>>;
    setSnapPoints: (points: string[]) => void;
    setSettleUpDetails: React.Dispatch<React.SetStateAction<any>>;
}) {
    const { t } = useTranslation();
    const { isLoading: isLoadingMyDebts, tripDebts: myDebts } = useMyTripDebts(tripId);
    if (isLoadingMyDebts) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View className="relative h-full bg-white">
            <View className="relative flex-row items-center justify-center">
                <TouchableOpacity
                    onPress={() => setCurrentScreen(TripExpenseSummaryScreen.EXPENSE_SUMMARY)}
                    className="absolute left-4"
                >
                    <Text className="text-base text-black">←</Text>
                </TouchableOpacity>
                <Text className="text-center text-base font-bold">{t('Record a payment')}</Text>
                <View />
            </View>
            <ScrollView className="mt-4 px-4 pb-48">
                {myDebts.map((debt: any) => (
                    <TouchableOpacity
                        key={debt.id}
                        onPress={() => {
                            setSettleUpDetails({
                                tripDebtId: debt.id,
                                isFullyPaid: false,
                                fullAmount: Math.abs(debt.amount),
                                currency: debt.currency,
                                fromUserName: debt.amount > 0 ? debt.user.name : t('You'),
                                toUserName: debt.amount > 0 ? t('You') : debt.user.name
                            });
                            setCurrentScreen(TripExpenseSummaryScreen.ENTER_AMOUNT);
                            setSnapPoints(['30%']);
                        }}
                        className="mb-4 flex-row items-center"
                    >
                        <View className="mr-3 h-5 w-5 items-center justify-center rounded-full border-2 border-gray-400" />
                        <Text className="text-base text-gray-500">
                            {debt.amount > 0
                                ? `${debt.user.name} ${t('paid')} ${t('you')}`
                                : `${t('You')} ${t('paid')} ${debt.user.name}`}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View className="absolute inset-x-0 bottom-2 items-center justify-center space-x-2 bg-white px-4 pb-4 pt-2 shadow-lg">
                <TouchableOpacity className="items-center rounded-full bg-[#60ABEF] p-4">
                    <Text className="font-semibold text-white">{t('Mark as paid')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function TransactionHistory({
    tripId,
    setCurrentScreen
}: {
    tripId: number;
    setCurrentScreen: React.Dispatch<React.SetStateAction<TripExpenseSummaryScreen>>;
}) {
    const { isLoading: isLoadingDebtSettlements, tripDebtSettlements } = useGetTripDebtSettlements(tripId);
    if (isLoadingDebtSettlements) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View className="bg-white px-4">
            <View className="relative flex-row items-center justify-center">
                <TouchableOpacity
                    onPress={() => setCurrentScreen(TripExpenseSummaryScreen.EXPENSE_SUMMARY)}
                    className="absolute left-4"
                >
                    <Text className="text-base text-black">←</Text>
                </TouchableOpacity>
                <Text className="text-center text-base font-bold">Settled balances</Text>
                <View />
            </View>
            <ScrollView className="py-6">
                {tripDebtSettlements.map((settlement: any) => (
                    <View className="flex-row items-start border-b border-gray-200 px-2 py-3" key={settlement.id}>
                        <Image
                            source={{ uri: settlement.fromUser.avatarUrl || '' }}
                            className="mr-3 h-8 w-8 rounded-full bg-gray-200"
                        />
                        <View className="flex-1">
                            <Text className="text-[12px] font-medium text-black">
                                {settlement.fromUser.name} paid {settlement.toUser.name}{' '}
                                {settlement.tripBudget.currency}
                                {settlement.amountPaid}
                            </Text>
                            <Text className="mt-1 text-[12px] text-gray-500">{getDaysAgo(settlement.updatedAt)}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

function ExpenseSummary({
    tripId,
    setCurrentScreen
}: {
    tripId: number;
    setCurrentScreen: React.Dispatch<React.SetStateAction<TripExpenseSummaryScreen>>;
}) {
    const { t } = useTranslation();
    const [selectedTab, setSelectedTab] = useState<ExpenseSummaryTab>(ExpenseSummaryTab.YOUR_SUMMARY);
    const [groupOverviewExpanded, setGroupOverviewExpanded] = useState<boolean[]>([]);

    const { isLoading: isLoadingMyDebts, tripDebts: myDebts } = useMyTripDebts(tripId);
    const { isLoading: isLoadingGroupDebts, tripDebts: groupDebts } = useGroupTripDebts(tripId);

    useEffect(() => {
        if (groupDebts && groupDebts.length > 0) {
            setGroupOverviewExpanded(new Array(groupDebts.length).fill(false));
        }
    }, [groupDebts]);

    const renderTabContent = useCallback(() => {
        switch (selectedTab) {
            case ExpenseSummaryTab.YOUR_SUMMARY:
                return (
                    <ScrollView className="mt-4 px-4 pb-48">
                        {myDebts.length === 0 && (
                            <Text className="text-center text-gray-500">You have no debts for this trip</Text>
                        )}
                        {myDebts.map((debt: any) => (
                            <View key={debt.id} className="mb-6 flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    <Image
                                        source={{ uri: debt.user.avatarUrl }}
                                        className="mr-4 h-8 w-8 rounded-full bg-gray-200"
                                    />
                                    <Text className="text-[14px]">
                                        {debt.amount < 0 ? (
                                            <>
                                                {t('You')} {t('owe')}{' '}
                                                <Text className="font-semibold">{debt.user.name}</Text>
                                            </>
                                        ) : (
                                            <>
                                                <Text className="font-semibold">{debt.user.name}</Text> {t('owes')}{' '}
                                                {t('you')}
                                            </>
                                        )}
                                    </Text>
                                </View>
                                <Text
                                    className={`text-[14px] font-semibold ${debt.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}
                                >
                                    {debt.amount >= 0
                                        ? `+${debt.currency}${debt.amount.toFixed(2)}`
                                        : `-${debt.currency}${Math.abs(debt.amount).toFixed(2)}`}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                );
            case ExpenseSummaryTab.GROUP_OVERVIEW:
                return (
                    <ScrollView className="mt-4 px-4 pb-48">
                        {groupDebts.map((debt: any, index: number) => (
                            <View key={index} className="mb-6 flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    <Image
                                        source={{ uri: debt.user.avatarUrl }}
                                        className="mr-4 h-8 w-8 rounded-full bg-gray-200"
                                    />
                                    <View>
                                        <Text className="text-base">{debt.user.name} </Text>
                                        {groupOverviewExpanded[index] && (
                                            <>
                                                {debt.owes.length > 0 && (
                                                    <Text className="text-[12px] text-gray-500">
                                                        {t('Get')} {t('money')}:{' '}
                                                        {debt.owes.map((item: any) => item.name).join(', ')}
                                                    </Text>
                                                )}
                                                {debt.owedBy.length > 0 && (
                                                    <Text className="text-[12px] text-gray-500">
                                                        {t('Owes')} {t('money')}:{' '}
                                                        {debt.owedBy.map((item: any) => item.name).join(', ')}
                                                    </Text>
                                                )}
                                            </>
                                        )}
                                    </View>
                                </View>
                                <TouchableOpacity
                                    className="flex-row items-center space-x-2"
                                    onPress={() =>
                                        setGroupOverviewExpanded((prev) => {
                                            const newState = [...prev];
                                            newState[index] = !newState[index];
                                            return newState;
                                        })
                                    }
                                >
                                    <Text
                                        className={`text-[14px] font-semibold ${debt.totalAmount >= 0 ? 'text-green-500' : 'text-red-500'}`}
                                    >
                                        {debt.totalAmount >= 0
                                            ? `+${debt.currency}${debt.totalAmount.toFixed(2)}`
                                            : `-${debt.currency}${Math.abs(debt.totalAmount).toFixed(2)}`}
                                    </Text>
                                    {groupOverviewExpanded[index] ? (
                                        <Iconify icon="mdi:chevron-up" size={16} className="text-gray-400" />
                                    ) : (
                                        <Iconify icon="mdi:chevron-down" size={16} className="text-gray-400" />
                                    )}
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                );
            default:
                return null;
        }
    }, [selectedTab, myDebts, groupDebts, groupOverviewExpanded, t]);

    if (isLoadingMyDebts || isLoadingGroupDebts) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View className="relative h-full bg-white">
            {/* Header */}
            <View className="px-4 py-2 shadow">
                <Text className="text-center font-inter text-base font-bold">{t('Expense Summary')}</Text>
            </View>
            {/* Tabs */}
            <View className="mt-2 flex-row px-4">
                <TouchableOpacity
                    className={`flex-1 items-center border-b-2 pb-2 ${selectedTab === ExpenseSummaryTab.YOUR_SUMMARY ? 'border-[#60ABEF]' : 'border-transparent'}`}
                    onPress={() => setSelectedTab(ExpenseSummaryTab.YOUR_SUMMARY)}
                >
                    <Text
                        className={`font-semibold ${selectedTab === ExpenseSummaryTab.YOUR_SUMMARY ? 'text-[#60ABEF]' : 'text-gray-400'}`}
                    >
                        {t('Your summary')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`flex-1 items-center border-b-2 pb-2 ${selectedTab === ExpenseSummaryTab.GROUP_OVERVIEW ? 'border-[#60ABEF]' : 'border-transparent'}`}
                    onPress={() => setSelectedTab(ExpenseSummaryTab.GROUP_OVERVIEW)}
                >
                    <Text
                        className={`font-semibold ${selectedTab === ExpenseSummaryTab.GROUP_OVERVIEW ? 'text-[#60ABEF]' : 'text-gray-400'}`}
                    >
                        {t('Group overview')}
                    </Text>
                </TouchableOpacity>
            </View>
            {/* Debts List */}
            {renderTabContent()}
            {/* Sticky Footer */}
            <View className="absolute inset-x-0 bottom-2 flex-row items-center justify-between space-x-2 bg-white px-4 pb-4 pt-2 shadow-lg">
                <TouchableOpacity
                    className="flex-1 flex-row items-center justify-center space-x-1 rounded-full border border-gray-300 p-3"
                    onPress={() => setCurrentScreen(TripExpenseSummaryScreen.TRANSACTION_HISTORY)}
                >
                    <Iconify icon="hugeicons:transaction" size={16} />
                    <Text>{t('Transaction history')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-1 items-center rounded-full bg-[#60ABEF] p-3"
                    onPress={() => setCurrentScreen(TripExpenseSummaryScreen.SETTLE_UP)}
                >
                    <Text className="font-semibold text-white">{t('Settle up')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function ExpenseSummarySheet({
    tripId,
    setSnapPoints
}: {
    tripId: number;
    setSnapPoints: (points: string[]) => void;
}) {
    const [currentScreen, setCurrentScreen] = useState<TripExpenseSummaryScreen>(
        TripExpenseSummaryScreen.EXPENSE_SUMMARY
    );
    const [settleUpDetails, setSettleUpDetails] = useState({
        isFullyPaid: false,
        fullAmount: 0,
        currency: '$',
        tripDebtId: null,
        fromUserName: '',
        toUserName: ''
    });

    const renderScreen = useCallback(() => {
        switch (currentScreen) {
            case TripExpenseSummaryScreen.EXPENSE_SUMMARY:
                return <ExpenseSummary tripId={tripId} setCurrentScreen={setCurrentScreen} />;
            case TripExpenseSummaryScreen.TRANSACTION_HISTORY:
                return <TransactionHistory tripId={tripId} setCurrentScreen={setCurrentScreen} />;
            case TripExpenseSummaryScreen.SETTLE_UP:
                return (
                    <SettleUp
                        tripId={tripId}
                        setCurrentScreen={setCurrentScreen}
                        setSnapPoints={setSnapPoints}
                        setSettleUpDetails={setSettleUpDetails}
                    />
                );
            case TripExpenseSummaryScreen.ENTER_AMOUNT:
                return (
                    <EnterAmount
                        tripId={tripId}
                        setCurrentScreen={setCurrentScreen}
                        settleUpDetails={settleUpDetails}
                        setSettleUpDetails={setSettleUpDetails}
                        setSnapPoints={setSnapPoints}
                    />
                );
            default:
                return null;
        }
    }, [currentScreen, setSnapPoints, tripId, settleUpDetails, setSettleUpDetails]);

    return <>{renderScreen()}</>;
}
