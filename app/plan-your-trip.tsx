import { CheckBox } from '@rneui/themed';
import type React from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';
import tw from 'tailwind-react-native-classnames';

import BackButton from '@/src/components/ui/BackButton';
import HeaderComponent from '@/src/components/ui/HeaderComponent';

const tripOverview = {
    title: 'Da Lat',
    date: '12 Jan - 20 Jan',
    description: "It's a nice season to go to Da Lat and enjoy cool air",
    image: 'https://s3-alpha-sig.figma.com/img/730f/a2d2/309eb0a335e9149880022974a7d29fd1?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pReIH784yPb-OrcdUnDST6XUgU8Dc1v07hICmub039xYWAk6zeOQ8pPIbYnuJCothYuMyqobAqM7~N6V3jycosuP7xPJb3AYHARBy77BrGOLRk0UDJc6xl106xe4AocDoVHsfN8Qg9P5-YlFF1buAweMseZlBzOyMsjB0XENAz9cjCBSnfzSiO1bLPi01UjNOwS7KovOFIH-AttB3k31zCnYiXnWKpPAx6JNr9weOnpJJY-uLpxeIrdQ8bFUONULUaHB~gqLeUsNyo7srenaAuaHVnhAArbHQROGwmw4zALFhRZcFpuZa3l-Jg9igtz1dJai7NOyy2JAk6FI0jTLNw__'
};

const activities = [
    {
        id: '1',
        title: 'Visit Eiffel Tower',
        time: '10AM',
        image: 'https://picsum.photos/100/100?random=1'
    },
    {
        id: '2',
        title: 'Lunch at Rose restaurant',
        time: '12PM',
        image: 'https://picsum.photos/100/100?random=2'
    }
];

const packingChecklist = [
    { id: '1', label: 'Shoes' },
    { id: '2', label: 'Laptop' },
    { id: '3', label: 'Camera' }
];

const budgetTracking = {
    Transportation: 100000,
    Accommodation: 1000000,
    Food: 1000000
};

const PlanYourTripScreen: React.FC = () => {
    const renderActivity = ({ item }: { item: (typeof activities)[0] }) => (
        <View className="m-2 flex-row items-center rounded-lg bg-white p-2 shadow-md">
            <Image source={{ uri: item.image }} className="h-16 w-16 rounded-2xl" resizeMode="cover" />
            <View className="ml-4 flex-1">
                <Text className="font-inter text-base font-bold">{item.title}</Text>
                <Text className="font-inter text-sm text-gray-500">{item.time}</Text>
            </View>
        </View>
    );

    const renderChecklist = () => (
        <View className="m-2 rounded-lg bg-white p-4 shadow-md">
            {packingChecklist.map((item) => (
                <View key={item.id} className="mb-2 flex-row items-center">
                    <CheckBox
                        checked={false}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        title={item.label}
                        titleProps={{ style: tw`font-inter text-base ml-2` }}
                        checkedColor="#000"
                        uncheckedColor="#000"
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                    />
                </View>
            ))}
        </View>
    );

    const renderBudgetTracking = () => {
        const total = Object.values(budgetTracking).reduce((sum, value) => sum + value, 0);
        return (
            <View className="m-2 rounded-lg bg-white p-4 shadow-md">
                {Object.entries(budgetTracking).map(([key, value]) => (
                    <View key={key} className="mb-2 flex-row justify-between">
                        <Text className="font-inter text-base">{key}</Text>
                        <Text className="font-inter text-base">{value.toLocaleString()} VND</Text>
                    </View>
                ))}
                <View className="mt-2 flex-row justify-between border-t pt-2">
                    <Text className="font-inter text-base font-bold">Total</Text>
                    <Text className="font-inter text-base font-bold">{total.toLocaleString()} VND</Text>
                </View>
            </View>
        );
    };

    return (
        <ScrollView className="flex-1 bg-gray-50 p-4 px-6 pt-12">
            <BackButton />
            <View className="flex-row items-center justify-between bg-white p-4">
                <HeaderComponent title="Plan your trip 📅" />
                <TouchableOpacity className="h-8 w-8 items-center justify-center">
                    <Iconify icon="weui:share-outlined" width="30" height="30" />
                </TouchableOpacity>
            </View>

            <View className="mx-2 my-4 flex-row rounded-lg bg-white p-4 shadow-md">
                <Image source={{ uri: tripOverview.image }} className="h-36 w-24 rounded-lg" resizeMode="cover" />
                <View className="ml-4 flex-1">
                    <Text className="font-inter text-xl font-bold">{tripOverview.title}</Text>
                    <Text className="font-inter text-sm text-gray-700">{tripOverview.date}</Text>
                    <Text className="mt-2 font-inter text-sm text-gray-500">{tripOverview.description}</Text>
                </View>
            </View>

            <Text className="mx-2 mt-2 font-inter text-sm font-bold">Day 1 (12 Jan)</Text>
            <FlatList
                data={activities}
                renderItem={renderActivity}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={tw`pb-4`}
            />

            <Text className="mx-2 mt-2 font-inter text-lg font-bold">Packing Check List</Text>
            {renderChecklist()}

            <Text className="mx-2 mt-2 font-inter text-lg font-bold">Budget tracking</Text>
            {renderBudgetTracking()}
        </ScrollView>
    );
};

export default PlanYourTripScreen;
