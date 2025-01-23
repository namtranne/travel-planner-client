import { Image, ScrollView, Text, View } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import Iconify from 'react-native-iconify';

import { DaLat, Hanoi, NhaTrang, VungTau } from '@/assets';

const destinationSuggestionData = [
    {
        name: 'Trending Places',
        destinations: [
            {
                name: 'Hanoi',
                country: 'Vietnam',
                rating: '4.8',
                image: Hanoi
            },
            {
                name: 'Dalat',
                country: 'Vietnam',
                rating: '5',
                image: DaLat
            }
        ]
    },
    {
        name: 'Beaches',
        destinations: [
            {
                name: 'Nha Trang',
                country: 'Vietnam',
                rating: '4.8',
                image: NhaTrang
            },
            {
                name: 'Vung Tau',
                country: 'Vietnam',
                rating: '5',
                image: VungTau
            }
        ]
    }
];
export default function DestinationSuggestions() {
    return (
        <View>
            {destinationSuggestionData.map((category) => {
                return (
                    <View key={category.name} className="mt-6">
                        <View className="mb-2 flex flex-row items-center justify-between px-6">
                            <Text className="font-inter text-lg font-bold">{category.name}</Text>
                            <Iconify icon="grommet-icons:next" color="black" width="15" height="15" />
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4 pl-6">
                            {category.destinations.map((destination) => {
                                return (
                                    <View className="w-[250px] rounded-lg bg-white" key={destination.name}>
                                        <View className="h-[150px] w-[250px] overflow-hidden rounded-lg">
                                            <Image
                                                source={destination.image}
                                                className="h-full w-full"
                                                resizeMode="cover"
                                            />
                                        </View>
                                        <View className="flex-row justify-between p-4">
                                            <View>
                                                <Text className="font-inter text-base">{destination.name}</Text>
                                                <Text className=" font-inter text-xs font-light text-[#6A778B]">
                                                    {destination.country}
                                                </Text>
                                            </View>
                                            <View className="flex flex-row items-center justify-center">
                                                <Iconify icon="material-symbols:star" color="#31ade6" />
                                                <Text className="font-inter font-light">{destination.rating}</Text>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>
                );
            })}
        </View>
    );
}
