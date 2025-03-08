import { useState } from 'react';
import { ActivityIndicator, Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

import { useGetPlaceToVisitDetailsItinerary, useGetPlaceToVisitDetailsOverview } from '@/src/hooks/use-trip';
import { getOpeningPeriodsText } from '@/src/utils/DateTimeUtil';

const PlaceToVisitCard = ({
    tripId,
    sectionId,
    placeToVisitId,
    order,
    onDelete,
    tab = 'overview'
}: {
    tripId: number;
    sectionId: number;
    placeToVisitId: number;
    order: number;
    onDelete: () => void;
    tab?: string;
}) => {
    const [expanded, setExpanded] = useState(false);
    const overviewData = useGetPlaceToVisitDetailsOverview(tripId, sectionId, placeToVisitId);
    const itineraryData = useGetPlaceToVisitDetailsItinerary(tripId, sectionId, placeToVisitId);

    const { isLoading, data: placeToVisit } = tab === 'overview' ? overviewData : itineraryData;

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#60ABEF" />
            </View>
        );
    }
    console.log('Place', placeToVisit);
    return (
        <TouchableOpacity onPress={() => setExpanded(true)} className="border-t border-gray-200 py-4 shadow-md">
            <View className={`${expanded ? 'rounded-xl bg-gray-200 p-2' : ''}`}>
                <View className="flex-row items-center justify-between ">
                    <View className="w-[70%]">
                        <View className="flex-row items-center justify-start space-x-2">
                            <View className="relative flex h-8 w-8 items-center justify-center">
                                <Iconify
                                    className="text-[#ef4444]"
                                    icon="fa-solid:map-marker"
                                    size={30}
                                    color="#ef4444"
                                />
                                <Text className="absolute text-[10px] font-bold text-white">{order}</Text>
                            </View>
                            <Text className="w-10/12 text-sm font-bold leading-4">
                                {placeToVisit?.place.name || ''}
                            </Text>
                        </View>
                        {!expanded && (
                            <Text className="mt-4 flex-wrap text-[14px] leading-4 text-gray-400">
                                {placeToVisit?.place.shortDescription ||
                                    `${placeToVisit?.place?.description?.slice(0, 100) || 'Description unavailable'}...`}
                            </Text>
                        )}
                    </View>
                    <View className="w-[30%] flex-row justify-end">
                        <Image
                            source={{
                                uri:
                                    placeToVisit?.place?.images && placeToVisit?.place.images.length > 0
                                        ? `https://itin-dev.wanderlogstatic.com/freeImage/${placeToVisit?.place.images[0].imageKey}`
                                        : 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
                            }}
                            className="h-[80px] w-2/3 rounded-lg"
                        />
                    </View>
                </View>
                {expanded && (
                    <View className="mt-4 flex-row items-center space-x-4">
                        <TouchableOpacity className="flex-row items-center">
                            <Iconify
                                className="text-black"
                                icon="mdi:clock-outline"
                                width={20}
                                height={20}
                                color="black"
                            />
                            <Text className="text-xs font-bold ">Add time</Text>
                        </TouchableOpacity>
                        <View className="flex-row items-center">
                            <Iconify
                                className="text-black"
                                icon="mdi:currency-usd"
                                width={20}
                                height={20}
                                color="black"
                            />
                            <Text className="text-xs font-bold text-gray-800">Add cost</Text>
                        </View>
                    </View>
                )}
            </View>
            {expanded && (
                <View className="mt-4 px-2">
                    <View className="flex-row flex-wrap items-center space-x-1">
                        {placeToVisit?.place.placeTags.map((tag: string) => (
                            <View key={tag} className="my-2 rounded-lg bg-gray-200 px-2 py-1">
                                <Text className="text-[11px] font-bold text-gray-600">{tag}</Text>
                            </View>
                        ))}
                        {/* <TouchableOpacity>
                            <Text className="my-2 text-[11px] font-bold text-gray-600">See more</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View className="mt-4 flex-row items-center space-x-1">
                        <Iconify className="text-orange-400" icon="mdi:star" width={16} height={16} color="orange" />
                        <Text className="text-xs font-bold text-orange-400">{placeToVisit?.place.rating || 'NA'}</Text>
                        <Text className="text-xs text-gray-500">({placeToVisit?.place.numRatings || 'NA'})</Text>
                        <Iconify icon="devicon:google" width={16} height={16} />
                    </View>

                    {/* Description */}
                    {placeToVisit?.place.description && (
                        <View className="mt-3 flex-row items-start">
                            <Iconify
                                className="text-gray-500"
                                icon="material-symbols:info"
                                width={20}
                                height={20}
                                color="gray"
                            />
                            <Text className="ml-2 text-gray-600">{placeToVisit?.place.description || 'NA'}</Text>
                        </View>
                    )}

                    {/* Opening Hours */}
                    {getOpeningPeriodsText(placeToVisit?.place.placeOpeningPeriods) && (
                        <View className="mt-3 flex-row items-center">
                            <Iconify className="text-gray-500" icon="mdi:clock" width={20} height={20} color="gray" />
                            <Text className="ml-2 text-gray-600">
                                {getOpeningPeriodsText(placeToVisit?.place.placeOpeningPeriods)}
                            </Text>
                            {/* <TouchableOpacity>
                            <Text className="ml-2 text-blue-500">Show other days</Text>
                        </TouchableOpacity> */}
                        </View>
                    )}

                    {/* Address */}
                    {placeToVisit?.place.address && (
                        <View className="mt-3 flex-row items-center">
                            <Iconify
                                className="text-gray-500"
                                icon="mdi:map-marker"
                                width={20}
                                height={20}
                                color="gray"
                            />
                            <TouchableOpacity onPress={() => Linking.openURL(placeToVisit?.place.address)}>
                                <Text className="ml-2 text-blue-500">{placeToVisit?.place.address}</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Website */}
                    {placeToVisit?.place.website && (
                        <View className="mt-3 flex-row items-center">
                            <Iconify className="text-gray-500" icon="mdi:world" width={20} height={20} color="gray" />
                            <TouchableOpacity onPress={() => Linking.openURL(placeToVisit?.place.website)}>
                                <Text className="ml-2 text-blue-500">{placeToVisit?.place.website}</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Phone */}
                    {placeToVisit?.place.hotline && (
                        <View className="mt-3 flex-row items-center">
                            <Iconify className="text-gray-500" icon="mdi:phone" width={20} height={20} color="gray" />
                            <Text className="ml-2 text-blue-500">{placeToVisit?.place.hotline}</Text>
                        </View>
                    )}

                    {/* Buttons */}
                    <View className="mt-4 flex-row items-center justify-between">
                        <View className="flex-row items-center space-x-1">
                            <TouchableOpacity className="flex items-center justify-center rounded-full bg-[#60ABEF] px-3 py-2">
                                <Text className="text-xs font-bold text-white">Map</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex items-center justify-center rounded-full bg-[#cedfef] px-3 py-2">
                                <Text className="text-xs font-bold text-[#60ABEF]">Directions</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row items-center space-x-3">
                            <TouchableOpacity onPress={onDelete}>
                                <Iconify icon="mdi:trash-can" size={24} color="#6c757d" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Iconify icon="mdi:view-grid-outline" size={24} color="#6c757d" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setExpanded(false)}>
                                <Iconify icon="mdi:chevron-up" size={24} color="#6c757d" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default PlaceToVisitCard;
