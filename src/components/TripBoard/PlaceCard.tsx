import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

import { DaLat } from '@/assets';

export default function PlaceCard({
    data
}: {
    data: { index: number; title: string; description: string; rating: number; address: string };
}) {
    const { index, title, description, rating, address } = data;
    const [expanded, setExpanded] = useState(false);
    const maxLength = 100; // Set a max length for truncation

    return (
        <View className="font-inter">
            <View className="flex-row items-start justify-between">
                <View className="mr-4 flex-1">
                    {' '}
                    {/* 'mdi:information-outline',
                        'material-symbols:star',
                        'mdi:clock-outline',
                        'ic:baseline-phone' */}
                    <View className="mb-2 flex-row items-center">
                        <View className="relative">
                            <Iconify icon="fontisto:map-marker" color="#60ABEF" />
                            <Text
                                className="absolute left-1/2 text-xs text-white"
                                style={{ transform: 'translateX(-50%) translateY(2px)' }}
                            >
                                {index}
                            </Text>
                        </View>
                        <Text className="ml-2 text-base font-bold">{title}</Text>
                    </View>
                    {expanded && (
                        <>
                            <View className="mb-2 flex-row items-center">
                                <Iconify icon="material-symbols:map" color="" size={35} />
                                <Text className="ml-2 text-sm font-medium">{address}</Text>
                            </View>
                            <View className="mb-2 flex-row items-center">
                                <Iconify icon="material-symbols:star" color="yellow" size={25} />
                                <Text className="ml-2 text-sm font-medium">{rating}</Text>
                            </View>
                            <View className="mb-2 flex-row items-center">
                                <Iconify icon="mdi:clock-outline" color="" size={20} />
                                <Text className="ml-2 text-sm font-medium">{rating}</Text>
                            </View>
                        </>
                    )}
                    <View>
                        <Text>{!expanded && `${description.slice(0, maxLength)}...`}</Text>
                        {description.length > maxLength && (
                            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                                <Text className="text-blue-500">{expanded ? 'See Less' : 'See More'}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <Image source={DaLat} className="h-20 w-20 rounded-lg" />
            </View>
        </View>
    );
}
