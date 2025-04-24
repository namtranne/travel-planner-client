import { CheckBox, Icon } from '@rneui/base';
import dayjs from 'dayjs';
import * as ImagePicker from 'expo-image-picker';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import Iconify from 'react-native-iconify';
import Toast from 'react-native-toast-message';
import type { DateType } from 'react-native-ui-datepicker';
import DateTimePicker from 'react-native-ui-datepicker';

import { useUser } from '@/src/hooks/use-authenticate';
import {
    useCreateTripExpense,
    useCreateTripExpenseFromInvoice,
    useDeleteTripExpense,
    useTripExpenseDetails,
    useUpdateTripExpense
} from '@/src/hooks/use-trip';
import { TripExpenseSplitType, TripExpenseType } from '@/src/services/types';
import { convertDateStringFormat } from '@/src/utils/DateTimeUtil';

export enum AddExpenseSheetView {
    ADD_EXPENSE,
    EXPENSE_CATEGORY,
    PAID_BY,
    SPLIT_BETWEEN,
    SELECT_DATE
}

const categories = [
    { name: TripExpenseType.TRANSPORTATION, icon: 'mdi:bus', displayName: 'Transportation' },
    { name: TripExpenseType.LODGING, icon: 'mdi:bed', displayName: 'Lodging' },
    { name: TripExpenseType.FOOD_AND_DRINK, icon: 'mdi:food', displayName: 'Food & Drink' },
    { name: TripExpenseType.SIGHTSEEING, icon: 'mdi:binoculars', displayName: 'Sightseeing' },
    { name: TripExpenseType.ACTIVITIES, icon: 'mdi:run', displayName: 'Activities' },
    { name: TripExpenseType.SHOPPING, icon: 'mdi:shopping', displayName: 'Shopping' },
    { name: TripExpenseType.GROCERIES, icon: 'mdi:cart', displayName: 'Groceries' },
    { name: TripExpenseType.OTHER, icon: 'mdi:help-circle-outline', displayName: 'Other' },
    { name: '', icon: '', displayName: '' }
];

const ExpenseCategory = ({
    setCurrentView,
    expenseDetails,
    setExpenseDetails
}: {
    setCurrentView: React.Dispatch<React.SetStateAction<AddExpenseSheetView>>;
    expenseDetails: any;
    setExpenseDetails: React.Dispatch<React.SetStateAction<any>>;
}) => {
    return (
        <View className="bg-white px-4">
            {/* Header */}
            <View className="relative flex-row items-center justify-center">
                <TouchableOpacity
                    onPress={() => setCurrentView(AddExpenseSheetView.ADD_EXPENSE)}
                    className="absolute left-4"
                >
                    <Text className="text-base text-black">←</Text>
                </TouchableOpacity>
                <Text className="text-center text-base font-bold">Expense Category</Text>
                <View />
            </View>
            {/* Options */}
            <ScrollView className="py-6">
                {/* Trip Plan Section */}
                <Text className="mb-2 font-bold text-black">Select from your trip plan</Text>
                <View className="space-y-2">
                    {[
                        { name: 'Shanghai', icon: 'mdi:car' },
                        { name: 'Tate Modern', icon: 'mdi:cart' },
                        { name: 'Piaget Boutique Paris', icon: 'mdi:bus' },
                        { name: 'See all', icon: 'mdi:dots-horizontal' }
                    ].map((item, index) => (
                        <View className="flex-row items-center justify-start space-x-2" key={index}>
                            <TouchableOpacity
                                key={index}
                                className="flex-row items-center justify-center rounded-full bg-gray-100 p-3"
                            >
                                <Iconify icon={item.icon} size={20} className="text-gray-500" />
                            </TouchableOpacity>
                            <Text className="text-gray-800">{item.name}</Text>
                        </View>
                    ))}
                </View>
                {/* Category Section */}
                <Text className="mb-2 mt-6 font-bold text-gray-700">Or select from a category</Text>
                <View className="flex-row flex-wrap justify-between gap-2">
                    {categories.map((category, index) =>
                        category.name ? (
                            <TouchableOpacity
                                key={index}
                                className="w-[30%] items-center rounded-lg bg-gray-100 py-3"
                                onPress={() => {
                                    setExpenseDetails({
                                        ...expenseDetails,
                                        category: category.name,
                                        categoryIcon: category.icon,
                                        displayCategory: category.displayName
                                    });
                                    setCurrentView(AddExpenseSheetView.ADD_EXPENSE);
                                }}
                            >
                                <Iconify icon={category.icon} className="mb-1 text-2xl text-gray-500" />
                                <Text className="text-xs text-gray-800">{category.displayName}</Text>
                            </TouchableOpacity>
                        ) : (
                            <View key={index} className="w-[30%]" />
                        )
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const PaidBy = ({
    setCurrentView,
    participants,
    expenseDetails,
    setExpenseDetails
}: {
    setCurrentView: React.Dispatch<React.SetStateAction<AddExpenseSheetView>>;
    participants: any[];
    expenseDetails: any;
    setExpenseDetails: React.Dispatch<React.SetStateAction<any>>;
}) => {
    return (
        <View className="bg-white px-4">
            <View className="relative flex-row items-center justify-center">
                <TouchableOpacity
                    onPress={() => setCurrentView(AddExpenseSheetView.ADD_EXPENSE)}
                    className="absolute left-4"
                >
                    <Text className="text-base text-black">←</Text>
                </TouchableOpacity>
                <Text className="text-center text-base font-bold">Paid by</Text>
                <View />
            </View>
            <ScrollView className="mt-2">
                {participants.map((participant) => (
                    <TouchableOpacity
                        className="mt-2 flex-row items-center justify-between border-b border-gray-200 pb-3"
                        key={participant.user.id}
                        onPress={() => {
                            setExpenseDetails({
                                ...expenseDetails,
                                payerId: participant.user.id,
                                displayPayer:
                                    participant.user.id === expenseDetails.payerId
                                        ? `You (${participant.user.name})`
                                        : participant.user.name
                            });
                            setCurrentView(AddExpenseSheetView.ADD_EXPENSE);
                        }}
                    >
                        <View className="flex-row items-center">
                            <Avatar
                                rounded
                                size={40}
                                source={{ uri: participant.user.avatarUrl }}
                                title={participant.user.name[0].toUpperCase()}
                                titleStyle={{ fontSize: 12 }}
                                containerStyle={{
                                    borderWidth: 2,
                                    borderColor: 'white',
                                    backgroundColor: 'gray'
                                }}
                            />
                            <Text className="ml-2 text-base font-semibold">
                                {participant.user.id === expenseDetails.payerId && 'You ('}
                                {participant.user.name}
                                {participant.user.id === expenseDetails.payerId && ')'}
                            </Text>
                        </View>
                        {participant.user.id === expenseDetails.payerId && <Icon name="check" color="#60ABEF" />}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const splitOptions = [
    { type: TripExpenseSplitType.INDIVIDUALS, label: 'Individuals' },
    { type: TripExpenseSplitType.EVERYONE, label: 'Everyone' },
    { type: TripExpenseSplitType.NONE, label: "Don't split" }
];

const SplitBetween = ({
    setCurrentView,
    expenseDetails,
    setExpenseDetails,
    participants
}: {
    setCurrentView: React.Dispatch<React.SetStateAction<AddExpenseSheetView>>;
    expenseDetails: any;
    setExpenseDetails: React.Dispatch<React.SetStateAction<any>>;
    participants: any[];
}) => {
    return (
        <View className="bg-white px-4">
            {/* Header */}
            <View className="relative flex-row items-center justify-center">
                <TouchableOpacity
                    onPress={() => setCurrentView(AddExpenseSheetView.ADD_EXPENSE)}
                    className="absolute left-4"
                >
                    <Text className="text-base text-black">←</Text>
                </TouchableOpacity>
                <Text className="text-center text-base font-bold">Split between</Text>
            </View>
            {/* Options List */}
            <ScrollView className="mt-2">
                {splitOptions.map(({ type, label }) => (
                    <TouchableOpacity
                        key={type}
                        className="mt-2 w-full flex-row items-center justify-between border-b border-gray-200 p-2 pb-3"
                        onPress={() => {
                            setExpenseDetails({
                                ...expenseDetails,
                                tripExpenseSplitType: type,
                                displayTripExpenseSplitType: label
                            });
                            if (type !== TripExpenseSplitType.INDIVIDUALS) {
                                setCurrentView(AddExpenseSheetView.ADD_EXPENSE);
                            }
                        }}
                    >
                        <Text className="text-sm text-gray-700">{label}</Text>
                        {expenseDetails.tripExpenseSplitType === type && <Icon name="check" color="#60ABEF" />}
                    </TouchableOpacity>
                ))}
                {expenseDetails.tripExpenseSplitType === TripExpenseSplitType.INDIVIDUALS &&
                    participants.map((participant) => (
                        <TouchableOpacity
                            className="mt-2 flex-row items-center justify-between"
                            key={participant.user.id}
                            onPress={() => {
                                setExpenseDetails({
                                    ...expenseDetails,
                                    payerId: participant.user.id,
                                    displayPayer:
                                        participant.user.id === expenseDetails.payerId
                                            ? `You (${participant.user.name})`
                                            : participant.user.name
                                });
                                setCurrentView(AddExpenseSheetView.ADD_EXPENSE);
                            }}
                        >
                            <View className="flex-row items-center">
                                <Avatar
                                    rounded
                                    size={40}
                                    source={{ uri: participant.user.avatarUrl }}
                                    title={participant.user.name[0].toUpperCase()}
                                    titleStyle={{ fontSize: 12 }}
                                    containerStyle={{
                                        borderWidth: 2,
                                        borderColor: 'white',
                                        backgroundColor: 'gray'
                                    }}
                                />
                                <Text className="ml-2 text-base font-semibold">
                                    {participant.user.id === expenseDetails.payerId && 'You ('}
                                    {participant.user.name}
                                    {participant.user.id === expenseDetails.payerId && ')'}
                                </Text>
                            </View>
                            <CheckBox
                                checked={expenseDetails.tripExpenseIndividuals.some(
                                    (individualId: number) => individualId === participant.user.id
                                )}
                                onPress={() => {
                                    const updatedIndividuals = expenseDetails.tripExpenseIndividuals.some(
                                        (individualId: number) => individualId === participant.user.id
                                    )
                                        ? expenseDetails.tripExpenseIndividuals.filter(
                                              (individualId: number) => individualId !== participant.user.id
                                          )
                                        : [...expenseDetails.tripExpenseIndividuals, participant.user.id];

                                    setExpenseDetails({
                                        ...expenseDetails,
                                        tripExpenseIndividuals: updatedIndividuals
                                    });

                                    if (updatedIndividuals.length === participants.length) {
                                        setExpenseDetails({
                                            ...expenseDetails,
                                            tripExpenseSplitType: TripExpenseSplitType.EVERYONE,
                                            displayTripExpenseSplitType: 'Everyone'
                                        });
                                    }
                                }}
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor="#60ABEF"
                                uncheckedColor="#585656"
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                            />
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </View>
    );
};

const SelectDate = ({
    setCurrentView,
    expenseDetails,
    setExpenseDetails
}: {
    setCurrentView: React.Dispatch<React.SetStateAction<AddExpenseSheetView>>;
    expenseDetails: any;
    setExpenseDetails: React.Dispatch<React.SetStateAction<any>>;
}) => {
    const [selected, setSelected] = useState<DateType>(
        expenseDetails.date === 'Optional' ? undefined : new Date(expenseDetails.date)
    );

    return (
        <View className="bg-white px-4">
            {/* Header */}
            <View className="relative flex-row items-center justify-center">
                <TouchableOpacity
                    onPress={() => setCurrentView(AddExpenseSheetView.ADD_EXPENSE)}
                    className="absolute left-4"
                >
                    <Text className="text-base text-black">←</Text>
                </TouchableOpacity>
                <Text className="text-center text-base font-bold">Select date</Text>
            </View>
            {/* Options List */}
            <ScrollView className="mt-2">
                <DateTimePicker
                    mode="single"
                    date={selected}
                    onChange={({ date }) => {
                        setSelected(date);
                        setExpenseDetails({
                            ...expenseDetails,
                            date: date ? dayjs(date).format('YYYY-MM-DD') : 'Optional'
                        });
                        setCurrentView(AddExpenseSheetView.ADD_EXPENSE);
                    }}
                    styles={{
                        today: { borderColor: '#60ABEF', borderWidth: 1, borderRadius: 50 },
                        selected: { backgroundColor: '#60ABEF', borderRadius: 50 },
                        selected_label: { color: 'white' }
                    }}
                />
            </ScrollView>
        </View>
    );
};

const AddExpense = ({
    tripId,
    setCurrentView,
    expenseDetails,
    setExpenseDetails,
    currency,
    currencyCode,
    handleExpense,
    handleDeleteExpense,
    isPending,
    isUpdateView
}: {
    tripId: number;
    setCurrentView: React.Dispatch<React.SetStateAction<AddExpenseSheetView>>;
    expenseDetails: any;
    setExpenseDetails: React.Dispatch<React.SetStateAction<any>>;
    currency: string;
    currencyCode: string;
    handleExpense: () => void;
    handleDeleteExpense: () => void;
    isPending: boolean;
    isUpdateView: boolean;
}) => {
    const [invoice, setInvoice] = useState('');
    const [displayExpense, setDisplayExpense] = useState(
        expenseDetails.expense !== null && expenseDetails.expense !== undefined && expenseDetails.expense !== 0
            ? expenseDetails.expense.toLocaleString('en-US', { maximumFractionDigits: 2 })
            : ''
    );
    const { isPending: isPendingCreateTripExpenseFromInvoice, createTripExpenseFromInvoice } =
        useCreateTripExpenseFromInvoice();

    const handleExpenseChange = (text: string) => {
        const cleanedText = text.replace(/[^0-9.,]/g, '');
        setDisplayExpense(cleanedText);

        const parsedValue = parseFloat(cleanedText.replace(/,/g, '.')).toFixed(2);
        setExpenseDetails({
            ...expenseDetails,
            expense: Number.isNaN(Number(parsedValue)) ? 0 : Number(parsedValue)
        });
    };

    const handleChoosePhoto = async () => {
        Alert.alert('Upload invoice', 'Choose image source', [
            {
                text: 'Take a photo',
                onPress: async () => {
                    const { status } = await ImagePicker.requestCameraPermissionsAsync();
                    if (status !== 'granted') {
                        Alert.alert('Permission Denied', 'Camera access is required to take a photo.');
                        return;
                    }

                    const result = await ImagePicker.launchCameraAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        quality: 0.8
                    });

                    if (!result.canceled) {
                        if (result.assets && result.assets.length > 0) {
                            setInvoice(result?.assets[0]?.uri || '');
                        }
                    }
                }
            },
            {
                text: 'Choose from library',
                onPress: async () => {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (status !== 'granted') {
                        Alert.alert('Permission Denied', 'Gallery access is required to choose a photo.');
                        return;
                    }

                    const result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: false,
                        quality: 1
                    });

                    if (!result.canceled) {
                        setInvoice(result?.assets[0]?.uri || '');
                    }
                }
            },
            { text: 'Cancel', style: 'cancel' }
        ]);
    };

    useEffect(() => {
        if (expenseDetails.expense !== null && expenseDetails.expense !== undefined && expenseDetails.expense === 0) {
            setDisplayExpense(null);
        } else if (expenseDetails.expense !== null && expenseDetails.expense !== undefined) {
            setDisplayExpense(expenseDetails.expense.toLocaleString('en-US', { maximumFractionDigits: 2 }));
        }
    }, [expenseDetails.expense]);

    if (isPendingCreateTripExpenseFromInvoice) {
        return (
            <View className="px-4">
                <ActivityIndicator size="large" color="#60ABEF" />
            </View>
        );
    }

    return (
        <View className="bg-white">
            <View className="px-4">
                {/* Header */}
                <View className="flex-row items-center justify-center">
                    <Text className="text-base font-bold">{isUpdateView ? 'Update expense' : 'Add expense'}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            if (invoice) {
                                createTripExpenseFromInvoice(
                                    {
                                        tripId,
                                        invoice
                                    },
                                    {
                                        onSuccess: () => {
                                            Toast.show({
                                                type: 'success',
                                                text1: 'Expense imported from invoice',
                                                position: 'top'
                                            });
                                            setInvoice('');
                                            setCurrentView(AddExpenseSheetView.ADD_EXPENSE);
                                        }
                                    }
                                );
                            } else {
                                handleExpense();
                            }
                        }}
                        disabled={isPending || isPendingCreateTripExpenseFromInvoice}
                        className="absolute right-2"
                    >
                        <Text className="text-sm text-[#60ABEF]">Done</Text>
                    </TouchableOpacity>
                </View>
                {/* Amount Input */}
                <View className="mt-2 flex-row items-center justify-between border-b border-gray-200 pb-3">
                    <Text className="text-lg font-bold">{currency}</Text>
                    <View className="flex-1 flex-row items-center justify-end">
                        <Text className="mr-2 text-gray-500">{currencyCode}</Text>
                        <TextInput
                            className="text-xl font-semibold"
                            placeholder="0.00"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            returnKeyType="done"
                            value={displayExpense}
                            onChangeText={handleExpenseChange}
                        />
                    </View>
                </View>
                {/* Select Expense type */}
                <TouchableOpacity
                    className="flex-row items-center justify-between border-b border-gray-200 py-4"
                    onPress={() => setCurrentView(AddExpenseSheetView.EXPENSE_CATEGORY)}
                >
                    <Iconify icon={expenseDetails.categoryIcon} className="text-black" size={24} />
                    <Text className={`text-sm text-gray-400 ${expenseDetails.category && 'font-bold text-black'}`}>
                        {expenseDetails.category ? expenseDetails.displayCategory : 'Select item'}
                    </Text>
                </TouchableOpacity>
                {/* Description */}
                {expenseDetails.category && (
                    <View className="flex-row items-center justify-between space-x-2 py-4">
                        <Iconify icon="mdi:note-outline" className="text-black" size={24} />
                        <TextInput
                            className="text-sm"
                            placeholder="Add description"
                            placeholderTextColor="#999"
                            keyboardType="default"
                            multiline
                            numberOfLines={4}
                            style={{ textAlignVertical: 'center' }}
                            value={expenseDetails.description}
                            onChangeText={(text) => setExpenseDetails({ ...expenseDetails, description: text })}
                        />
                    </View>
                )}
            </View>
            <View className="my-2 h-[7px] w-full bg-gray-100" />
            <View className="px-4">
                <TouchableOpacity
                    className="flex-row justify-between border-b border-gray-200 py-4"
                    onPress={() => setCurrentView(AddExpenseSheetView.PAID_BY)}
                >
                    <View className="flex-row items-center space-x-2">
                        <Text className="font-bold">Paid by:</Text>
                        <Text className="text-gray-500">{expenseDetails.displayPayer}</Text>
                    </View>
                    <Iconify icon="mdi:chevron-right" className="text-black" size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-row justify-between border-b border-gray-200 py-4"
                    onPress={() => setCurrentView(AddExpenseSheetView.SPLIT_BETWEEN)}
                >
                    <View className="flex-row items-center space-x-2">
                        <Text className="font-bold">Split:</Text>
                        <Text className="text-gray-500">{expenseDetails.displayTripExpenseSplitType}</Text>
                    </View>
                    <Iconify icon="mdi:chevron-right" className="text-black" size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-row justify-between border-b border-gray-200 py-4"
                    onPress={() => setCurrentView(AddExpenseSheetView.SELECT_DATE)}
                >
                    <View className="flex-row items-center space-x-2">
                        <Text className="font-bold">Date:</Text>
                        <Text className="text-gray-500">{expenseDetails.date}</Text>
                    </View>
                    <Iconify icon="mdi:chevron-right" className="text-black" size={24} />
                </TouchableOpacity>
            </View>
            {isUpdateView ? (
                <View className="flex-row justify-center">
                    <TouchableOpacity
                        className="mt-4 flex-row items-center justify-center rounded-full bg-gray-200 px-3 py-2"
                        onPress={handleDeleteExpense}
                        disabled={isPending}
                    >
                        <Iconify icon="mdi:trash-can" className="text-gray-400" size={14} />
                        <Text className="text-sm font-semibold text-gray-500">Delete</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="flex-row justify-center">
                    <TouchableOpacity
                        className="mt-4 flex-row items-center justify-center rounded-full bg-gray-200 px-3 py-2"
                        onPress={handleChoosePhoto}
                        disabled={isPending}
                    >
                        <Iconify icon="mdi:camera-outline" className="text-gray-400" size={14} />
                        <Text className="ml-1 text-sm font-semibold text-gray-500">Add with your invoice</Text>
                    </TouchableOpacity>
                </View>
            )}
            {invoice !== '' && (
                <View className="mt-4 px-4">
                    <Image
                        source={{ uri: invoice }}
                        style={{ width: '100%', height: 200, borderRadius: 8 }}
                        resizeMode="contain"
                    />
                </View>
            )}
        </View>
    );
};

export const AddExpenseSheet = ({
    tripId,
    currency,
    participants,
    currencyCode,
    closeSheet,
    expenseId
}: {
    tripId: number;
    currency: string;
    participants: any[];
    currencyCode: string;
    closeSheet: () => void;
    expenseId?: number;
}) => {
    const [currentView, setCurrentView] = useState<AddExpenseSheetView>(AddExpenseSheetView.ADD_EXPENSE);
    const [expenseDetails, setExpenseDetails] = useState<{
        expense: number;
        category?: TripExpenseType;
        categoryIcon: string;
        displayCategory: string;
        description: string;
        tripExpenseSplitType: TripExpenseSplitType;
        displayTripExpenseSplitType: string;
        payerId: number;
        displayPayer: string;
        date: string;
        tripExpenseIndividuals: number[];
    }>({
        expense: 0,
        category: undefined,
        categoryIcon: 'mdi:help-circle-outline',
        displayCategory: '',
        description: '',
        tripExpenseSplitType: TripExpenseSplitType.NONE,
        displayTripExpenseSplitType: "Don't split",
        payerId: 0,
        displayPayer: '',
        date: 'Optional',
        tripExpenseIndividuals: []
    });
    const { isLoading: isFetchingUser, user } = useUser();
    const { isPending: isPendingCreateTripExpense, createTripExpense } = useCreateTripExpense();
    const { isPending: isPendingUpdateTripExpense, updateTripExpense } = useUpdateTripExpense();
    const { isPending: isPendingDeleteTripExpense, deleteTripExpense } = useDeleteTripExpense();
    const { isLoading: isFetchingTripExpense, tripExpense } = useTripExpenseDetails(tripId, expenseId || -1);

    useEffect(() => {
        if (user) {
            setExpenseDetails((prevDetails) => ({
                ...prevDetails,
                payerId: user.id,
                displayPayer: `You (${user.name})`
            }));
        }
    }, [user, isFetchingUser]);

    useEffect(() => {
        if (tripExpense && user) {
            setExpenseDetails({
                expense: tripExpense.expense,
                category: tripExpense.tripExpenseType,
                categoryIcon:
                    categories.find((cat) => cat.name.toString() === tripExpense.tripExpenseType)?.icon ||
                    'mdi:help-circle-outline',
                displayCategory:
                    categories.find((cat) => cat.name.toString() === tripExpense.tripExpenseType)?.displayName || '',
                description: tripExpense.details || '',
                tripExpenseSplitType:
                    TripExpenseSplitType[tripExpense.tripExpenseSplitType as keyof typeof TripExpenseSplitType],
                displayTripExpenseSplitType:
                    splitOptions.find((option) => option.type === tripExpense.tripExpenseSplitType)?.label ||
                    "Don't split",
                payerId: tripExpense.payerId,
                displayPayer: user.id === tripExpense.payerId ? `You (${user.name})` : tripExpense.payer.name,
                date: tripExpense.date ? convertDateStringFormat(tripExpense.date) : 'Optional',
                tripExpenseIndividuals: tripExpense.tripExpenseIndividuals.map((ted: any) => ted.individualId) || []
            });
        }
    }, [tripExpense, user, isFetchingUser]);

    const handleExpense = useCallback(() => {
        if (!expenseDetails.expense || expenseDetails.expense <= 0) {
            Alert.alert('Error', 'Enter the amount of this expense');
            return;
        }
        if (!expenseDetails.category) {
            Alert.alert('Error', 'Select an expense category');
            return;
        }

        if (expenseId) {
            updateTripExpense(
                {
                    tripId,
                    expenseId,
                    updateTripExpenseReq: {
                        expense: expenseDetails.expense,
                        tripExpenseSplitType: expenseDetails.tripExpenseSplitType,
                        tripExpenseType: expenseDetails.category,
                        payerId: expenseDetails.payerId,
                        details: expenseDetails.description,
                        date: expenseDetails.date === 'Optional' ? undefined : expenseDetails.date,
                        tripExpenseIndividuals: expenseDetails.tripExpenseIndividuals
                    }
                },
                {
                    onSuccess: () => {
                        Alert.alert('Expense updated', '', [
                            {
                                text: 'OK',
                                onPress: () => {
                                    setExpenseDetails({
                                        ...expenseDetails,
                                        category: undefined,
                                        categoryIcon: 'mdi:help-circle-outline',
                                        displayCategory: '',
                                        description: '',
                                        tripExpenseSplitType: TripExpenseSplitType.NONE,
                                        displayTripExpenseSplitType: "Don't split",
                                        payerId: user.id,
                                        displayPayer: `You (${user.name})`,
                                        date: 'Optional',
                                        tripExpenseIndividuals: []
                                    });
                                    closeSheet();
                                }
                            }
                        ]);
                    }
                }
            );
        } else {
            createTripExpense(
                {
                    tripId,
                    createTripExpenseReq: {
                        expense: expenseDetails.expense,
                        tripExpenseSplitType: expenseDetails.tripExpenseSplitType,
                        tripExpenseType: expenseDetails.category,
                        payerId: expenseDetails.payerId,
                        details: expenseDetails.description,
                        date: expenseDetails.date === 'Optional' ? undefined : expenseDetails.date,
                        tripExpenseIndividuals: expenseDetails.tripExpenseIndividuals
                    }
                },
                {
                    onSuccess: () => {
                        Alert.alert('New expense created', '', [
                            {
                                text: 'OK',
                                onPress: () => {
                                    setExpenseDetails({
                                        expense: 0,
                                        category: undefined,
                                        categoryIcon: 'mdi:help-circle-outline',
                                        displayCategory: '',
                                        description: '',
                                        tripExpenseSplitType: TripExpenseSplitType.NONE,
                                        displayTripExpenseSplitType: "Don't split",
                                        payerId: user.id,
                                        displayPayer: `You (${user.name})`,
                                        date: 'Optional',
                                        tripExpenseIndividuals: []
                                    });
                                    closeSheet();
                                }
                            }
                        ]);
                    }
                }
            );
        }
    }, [tripId, expenseDetails, createTripExpense, updateTripExpense, expenseId, closeSheet, user]);

    const handleDeleteExpense = useCallback(() => {
        Alert.alert('Delete expense', 'Are you sure you want to delete this expense?', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Delete',
                onPress: () => {
                    if (!expenseId) return;
                    deleteTripExpense(
                        { tripId, expenseId },
                        {
                            onSuccess: () => {
                                Alert.alert('Expense deleted', '', [
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            setExpenseDetails({
                                                ...expenseDetails,
                                                category: undefined,
                                                categoryIcon: 'mdi:help-circle-outline',
                                                displayCategory: '',
                                                description: '',
                                                tripExpenseSplitType: TripExpenseSplitType.NONE,
                                                displayTripExpenseSplitType: "Don't split",
                                                payerId: user.id,
                                                displayPayer: `You (${user.name})`,
                                                date: 'Optional',
                                                tripExpenseIndividuals: []
                                            });
                                            closeSheet();
                                        }
                                    }
                                ]);
                            }
                        }
                    );
                }
            }
        ]);
    }, [tripId, expenseId, deleteTripExpense, closeSheet, expenseDetails, user]);

    const renderContent = useCallback(() => {
        switch (currentView) {
            case AddExpenseSheetView.ADD_EXPENSE:
                return (
                    <AddExpense
                        tripId={tripId}
                        setCurrentView={setCurrentView}
                        expenseDetails={expenseDetails}
                        setExpenseDetails={setExpenseDetails}
                        currency={currency}
                        currencyCode={currencyCode}
                        handleExpense={handleExpense}
                        handleDeleteExpense={handleDeleteExpense}
                        isPending={
                            isPendingCreateTripExpense || isPendingUpdateTripExpense || isPendingDeleteTripExpense
                        }
                        isUpdateView={!!expenseId}
                    />
                );
            case AddExpenseSheetView.EXPENSE_CATEGORY:
                return (
                    <ExpenseCategory
                        setCurrentView={setCurrentView}
                        expenseDetails={expenseDetails}
                        setExpenseDetails={setExpenseDetails}
                    />
                );
            case AddExpenseSheetView.PAID_BY:
                return (
                    <PaidBy
                        setCurrentView={setCurrentView}
                        participants={participants}
                        expenseDetails={expenseDetails}
                        setExpenseDetails={setExpenseDetails}
                    />
                );
            case AddExpenseSheetView.SPLIT_BETWEEN:
                return (
                    <SplitBetween
                        setCurrentView={setCurrentView}
                        expenseDetails={expenseDetails}
                        setExpenseDetails={setExpenseDetails}
                        participants={participants}
                    />
                );
            case AddExpenseSheetView.SELECT_DATE:
                return (
                    <SelectDate
                        setCurrentView={setCurrentView}
                        expenseDetails={expenseDetails}
                        setExpenseDetails={setExpenseDetails}
                    />
                );
            default:
                return null;
        }
    }, [
        currency,
        currencyCode,
        currentView,
        expenseDetails,
        isPendingCreateTripExpense,
        isPendingUpdateTripExpense,
        participants,
        handleExpense,
        expenseId,
        isPendingDeleteTripExpense,
        handleDeleteExpense,
        tripId
    ]);

    if (isFetchingUser || isFetchingTripExpense) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#60ABEF" />
            </View>
        );
    }

    return <>{renderContent()}</>;
};
