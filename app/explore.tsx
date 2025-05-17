import { Skeleton } from '@rneui/themed';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionList, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Iconify from 'react-native-iconify';
import { SafeAreaView } from 'react-native-safe-area-context';

import PlaceCard from '@/src/components/Category/PlaceCard';
import BrowseCategories from '@/src/components/Explore/BrowseCategories';
import { useExplorePage } from '@/src/hooks/use-location';
import { useCreatePlaceToVisitItinerary, useCreatePlaceToVisitOverview, useTripDetails } from '@/src/hooks/use-trip';
import authAxios from '@/src/utils/axios';

export default function Explore({
    locationId = 174,
    showFullPage = false,
    tripId,
    openSheet,
    setBottomSheetContent,
    setSnapPoints
}: {
    locationId: number;
    showFullPage?: boolean;
    tripId?: number;
    openSheet: () => void;
    setBottomSheetContent: (content: React.ReactNode) => void;
    setSnapPoints: (points: string[]) => void;
}) {
    const { t } = useTranslation();

    const { data, isLoading } = useExplorePage(locationId);
    const [restaurantData, setRestaurantData] = useState<any>(null);
    const [attractionData, setAttractionData] = useState<any>(null);
    const { trip, isLoading: isLoadingTrip } = useTripDetails(tripId);
    const { createPlaceToVisitItinerary } = useCreatePlaceToVisitItinerary();
    const { createPlaceToVisitOverview } = useCreatePlaceToVisitOverview();

    const sections = [
        {
            title: 'Overview',
            data: trip.tripOverview.sections
                .map((section: any, index: number) => ({
                    id: section.id,
                    label: section.title || `Untitled section`,
                    color: ['text-blue-500', 'text-red-500', 'text-green-500', 'text-yellow-500'][index % 4],
                    section: 'Overview'
                }))
                .concat([{ id: 'new', label: 'New list', isNew: true }])
        },
        {
            title: 'Itinerary',
            data: trip.tripItinerary.days.map((day: any, index: number) => ({
                id: day.id,
                label: day.title,
                color: ['text-teal-500', 'text-purple-500', 'text-blue-500', 'text-red-500'][index % 4],
                section: 'Itinerary'
            }))
        }
    ];

    const handleAddPlace = (item: any, placeId: number) => {
        if (item.section === 'Overview') {
            createPlaceToVisitOverview({
                tripId: tripId || 0,
                sectionId: item.id,
                createPlaceToVisitReq: { placeId }
            });
        } else if (item.section === 'Itinerary') {
            createPlaceToVisitItinerary({
                tripId: tripId || 0,
                dayId: item.id,
                createPlaceToVisitReq: { placeId }
            });
        }
    };

    const handleSelectPlace = (placeId: number) => {
        setBottomSheetContent(
            <View className="bg-white p-4">
                <View className="mb-4 flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text className="text-gray-400">{t('Cancel')}</Text>
                    </TouchableOpacity>
                    <Text className="text-lg font-semibold">{t('Add to trip')}</Text>
                    <View className="w-12" />
                </View>

                <SectionList
                    sections={sections}
                    keyExtractor={(item) => item.id}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text className="mb-2 mt-6 text-xs font-semibold text-gray-500">{title}</Text>
                    )}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleAddPlace(item, placeId)}
                            className="flex-row items-center py-3"
                            disabled={isAddingPlaceToOverview || isPendingCreatePlaceToVisitItinerary}
                        >
                            <View className={`mr-3 h-2 w-2 rounded-full ${item.color || 'text-gray-400'}`} />
                            <View className="flex flex-row items-center">
                                <Iconify
                                    icon={item.isNew ? 'ic:baseline-plus' : 'mdi:map-marker'}
                                    size={item.isNew ? 20 : 25}
                                    className="text-[#60ABEF]"
                                />
                                <Text
                                    className={`${item.isNew ? 'text-[#60ABEF]' : 'text-black'} text-center text-sm font-normal`}
                                >
                                    {item.label}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View className="ml-5 h-px bg-gray-200" />}
                />
            </View>
        );
        setSnapPoints(['70%']);
        openSheet();
    };

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

    if (isLoading || isLoadingTrip) {
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
            <ScrollView className={showFullPage ? 'px-4 py-6' : 'px-4'}>
                {/* Title & Description */}
                {showFullPage && (
                    <View>
                        <Text className="mb-2 font-inter text-3xl font-bold">{data.name}</Text>
                        <Text className="mb-4 font-inter text-gray-600">{data.description.replace(/""/g, '"')}</Text>
                    </View>
                )}

                {/* Categories */}
                <View className="mb-4 flex-row items-center justify-between">
                    <Text className="font-inter text-xl font-bold">{t('Categories')}</Text>
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
                            <Text
                                className="font-inter text-xs font-semibold text-gray-700"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{ flexShrink: 1 }}
                            >
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Custom Section: Restaurants */}
                {restaurantData && (
                    <View className="mt-6">
                        <Text className="mb-2 font-inter text-xl font-bold">{t('Top places to eat')}</Text>
                        {/* Replace this with a flatlist or card component */}
                        {restaurantData.places
                            ?.slice(0, 10)
                            .map((place: any) => (
                                <PlaceCard
                                    key={place.id}
                                    item={place}
                                    onSelected={(id: number) => handleSelectPlace(id)}
                                />
                            ))}
                    </View>
                )}

                {/* Custom Section: Attractions */}
                {attractionData && (
                    <View className="mt-6">
                        <Text className="mb-2 font-inter text-xl font-bold">{t('Top places to visit')}</Text>
                        {/* Replace this with a flatlist or card component */}
                        {attractionData.places
                            ?.slice(0, 10)
                            .map((place: any) => <PlaceCard key={place.id} item={place} />)}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
