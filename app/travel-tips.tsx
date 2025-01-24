import type React from 'react';
import type { ImageSourcePropType } from 'react-native';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

import { TravelTips1, TravelTips2, TravelTips3, TravelTips4, TravelTips5, TravelTips6 } from '@/assets';
import BackButton from '@/src/components/ui/BackButton';
import HeaderComponent from '@/src/components/ui/HeaderComponent';

interface TipItem {
    id: string;
    title: string;
    image: ImageSourcePropType;
    backgroundColor: string;
}

const tips: TipItem[] = [
    {
        id: '1',
        title: 'Travel Wardrobe Essentials',
        backgroundColor: 'bg-[#afbaff]',
        image: TravelTips1
    },
    {
        id: '2',
        title: 'From Beach to Mountains',
        image: TravelTips2,
        backgroundColor: 'bg-[#4a4d1e]'
    },
    {
        id: '3',
        title: 'The Ultimate Packing Checklist',
        image: TravelTips3,
        backgroundColor: 'bg-[#5e4c4a]'
    },
    {
        id: '4',
        title: 'Stay Healthy on the Go',
        image: TravelTips4,
        backgroundColor: 'bg-[#343671]'
    },
    {
        id: '5',
        title: 'Solo Travel Packing Tips',
        image: TravelTips5,
        backgroundColor: 'bg-[#0049a8]'
    },
    {
        id: '6',
        title: 'Family Travel 101',
        image: TravelTips6,
        backgroundColor: 'bg-[#04c272]'
    }
];

const TravelTipsScreen: React.FC = () => {
    const renderItem = ({ item }: { item: TipItem }) => (
        <TouchableOpacity className={`m-2 my-4 flex-1 overflow-hidden rounded-lg ${item.backgroundColor}`}>
            <Image source={item.image} className="h-32 w-full rounded-b-2xl" resizeMode="cover" />
            <Text className="px-4 py-2 text-center text-sm text-white">{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-white p-4 px-6 pt-12">
            <BackButton />
            <View className="mt-2">
                <HeaderComponent title="Travel tips" subtitle="Be well prepared for every trips" />
                <FlatList
                    data={tips}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={tw`pb-4`}
                />
            </View>
        </View>
    );
};

export default TravelTipsScreen;
