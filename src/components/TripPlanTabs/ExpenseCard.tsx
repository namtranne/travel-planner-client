import type React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import Iconify from 'react-native-iconify';

import { formatAmount } from '@/src/utils/AmountUtil';
import { convertDateFormat } from '@/src/utils/DateTimeUtil';

type TripExpense = {
    id: number;
    details: string;
    type: string;
    splitType: string;
    expense: number;
    date?: string;
};

export const ExpenseCard = ({
    expense,
    openSheet,
    setBottomSheetContent,
    setSnapPoints
}: {
    expense: TripExpense;
    openSheet: () => void;
    setBottomSheetContent: (content: React.ReactNode) => void;
    setSnapPoints: (points: string[]) => void;
}) => {
    const avatars = [
        { uri: 'https://picsum.photos/200/300', title: 'Avatar 1' },
        { uri: 'https://picsum.photos/200/300', title: 'Avatar 2' },
        { uri: 'https://picsum.photos/200/300', title: 'Avatar 3' },
        { uri: 'https://picsum.photos/200/300', title: 'Avatar 4' },
        { uri: 'https://picsum.photos/200/300', title: 'Avatar 5' }
    ];
    const maxAvatars = 3;
    const displayAvatars = avatars.slice(0, maxAvatars);
    const extraCount = avatars.length - maxAvatars;

    return (
        <View className="flex-row items-center justify-between border-b border-gray-200 py-3">
            <View className="flex-row items-center">
                <View className="rounded-full bg-gray-300 p-2">
                    <Iconify icon="mdi:bank" className="text-gray-500" size={16} />
                </View>
                <View className="ml-3">
                    <Text className="text-base font-bold">{expense.details}</Text>
                    <View className="flex-row items-center">
                        {expense.date && (
                            <Text className="text-sm text-gray-500">{convertDateFormat(expense.date)} • </Text>
                        )}
                        <Text className="text-sm text-gray-500">{expense.type}</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text className="text-base font-bold">${formatAmount(expense.expense)}</Text>
                <TouchableOpacity
                    className="flex-row items-center justify-end"
                    onPress={() => {
                        setBottomSheetContent(
                            <View className="bg-white p-4">
                                <Text className="text-center text-base font-bold">Expense split with</Text>
                                <ScrollView>
                                    {avatars.map((avatar, index) => (
                                        <View key={index} className="mt-2 flex-row items-center">
                                            <Avatar
                                                rounded
                                                size={40}
                                                source={avatar.uri ? { uri: avatar.uri } : undefined}
                                                title={avatar.title || undefined}
                                                titleStyle={{ fontSize: 12 }}
                                                containerStyle={{
                                                    borderWidth: 2,
                                                    borderColor: 'white',
                                                    backgroundColor: 'gray'
                                                }}
                                            />
                                            <Text className="ml-2 text-base font-semibold">{avatar.title}</Text>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        );
                        openSheet();
                        setSnapPoints(['40%']);
                    }}
                >
                    {displayAvatars.map((avatar, index) => (
                        <Avatar
                            key={index}
                            rounded
                            size={30}
                            source={avatar.uri ? { uri: avatar.uri } : undefined}
                            title={avatar.title || undefined}
                            titleStyle={{ fontSize: 12 }}
                            containerStyle={{
                                borderWidth: 2,
                                borderColor: 'white',
                                backgroundColor: 'gray',
                                marginLeft: index !== 0 ? -8 : 0
                            }}
                        />
                    ))}
                    {extraCount > 0 && (
                        <Avatar
                            rounded
                            size={30}
                            title={`+${extraCount}`}
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
