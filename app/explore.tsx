import { Skeleton } from '@rneui/themed';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PlaceCard from '@/src/components/Category/PlaceCard';
import BrowseCategories from '@/src/components/Explore/BrowseCategories';
import { useExplorePage } from '@/src/hooks/use-location';
import authAxios from '@/src/utils/axios';

export default function Explore({
    locationId = 174,
    showFullPage = false
}: {
    locationId: number;
    showFullPage?: boolean;
}) {
    const { data, isLoading } = useExplorePage(locationId);

    const [restaurantData, setRestaurantData] = useState<any>(null);
    const [attractionData, setAttractionData] = useState<any>(null);

    // Wait for base explore data to load first
    useEffect(() => {
        if (!isLoading && data?.categories) {
            const restaurantCategory = data.categories.find((cat: any) => cat.name.toLowerCase() === 'restaurants');
            const attractionCategory = data.categories.find((cat: any) => cat.name.toLowerCase() === 'attractions');

            if (restaurantCategory?.id) {
                authAxios
                    .get(`/locations/category/${restaurantCategory.id}`)
                    .then((res) => {
                        setRestaurantData(res.data.data);
                        for (const item of res.data.data) {
                            console.log(item.placeOrder);
                        }
                    })
                    .catch((err) => console.error('Failed to fetch restaurants:', err));
            }

            if (attractionCategory?.id) {
                authAxios
                    .get(`/locations/category/${attractionCategory.id}`)
                    .then((res) => setAttractionData(res.data.data))
                    .catch((err) => console.error('Failed to fetch attractions:', err));
            }
        }
    }, [isLoading, data]);

    if (isLoading) {
        return (
            <SafeAreaView>
                <View className={showFullPage ? 'px-4 py-6' : 'px-4'}>
                    <View className="mt-4">
                        <Skeleton height={40} width={120} />
                    </View>
                    <View className="my-4">
                        <Skeleton height={300} />
                    </View>
                    <View className="flex-row flex-wrap justify-between gap-2">
                        {[...Array(10)].map((_, index) => (
                            <Skeleton key={index} height={40} width="47%" />
                        ))}
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <View className={showFullPage ? 'px-4 py-6' : 'px-4'}>
                {/* Title & Description */}
                {showFullPage && (
                    <View>
                        <Text className="mb-2 font-inter text-3xl font-bold">{data.name}</Text>
                        <Text className="mb-4 font-inter text-gray-600">{data.description.replace(/""/g, '"')}</Text>
                    </View>
                )}

                {/* Categories */}
                <View className="mb-4 flex-row items-center justify-between">
                    <Text className="font-inter text-xl font-bold">Categories</Text>
                    <BrowseCategories categories={data.categories} />
                </View>

                {/* Category Grid */}
                <View className="flex-row flex-wrap gap-2">
                    {data.categories?.slice(0, 10).map((category: any, index: number) => (
                        <TouchableOpacity
                            key={index}
                            className="w-[48%] flex-row items-center rounded-lg bg-white px-4 py-3"
                            onPress={() => router.push({ pathname: '/category/[id]', params: { id: category.id } })}
                        >
                            <Text className="mr-2 text-lg">{category.emoji}</Text>
                            <Text className="font-inter text-xs font-semibold text-gray-700">{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Custom Section: Restaurants */}
                {restaurantData && (
                    <View className="mt-6">
                        <Text className="mb-2 font-inter text-xl font-bold">Top places to eat</Text>
                        {/* Replace this with a flatlist or card component */}
                        {restaurantData.places
                            ?.slice(0, 10)
                            .map((place: any) => <PlaceCard key={place.id} item={place} />)}
                    </View>
                )}

                {/* Custom Section: Attractions */}
                {attractionData && (
                    <View className="mt-6">
                        <Text className="mb-2 font-inter text-xl font-bold">Top places to visit</Text>
                        {/* Replace this with a flatlist or card component */}
                        {attractionData.places
                            ?.slice(0, 10)
                            .map((place: any) => <PlaceCard key={place.id} item={place} />)}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}
