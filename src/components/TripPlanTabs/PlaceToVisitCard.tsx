import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

const PlaceToVisitCard = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <TouchableOpacity onPress={() => setExpanded(!expanded)} className="border-t border-gray-200 py-4 shadow-md">
            <View className={`${expanded ? 'rounded-xl bg-gray-200 p-2' : ''}`}>
                <View className="flex-row items-center justify-between ">
                    <View className="w-[70%]">
                        <View className="flex-row items-center justify-start">
                            <View className="relative flex h-8 w-8 items-center justify-center">
                                <Iconify icon="fa-solid:map-marker" size={30} color="#ef4444" />
                                <Text className="absolute text-[10px] font-bold text-white">1</Text>
                            </View>
                            <Text className="w-10/12 text-sm font-bold leading-4">
                                Basilica Cathedral of Saint Denis
                            </Text>
                        </View>
                        {!expanded && (
                            <Text className="mt-4 flex-wrap text-[14px] leading-4 text-gray-400">
                                The Basilica Cathedral of Saint Denis is an impressive Gothic cathedral...
                            </Text>
                        )}
                    </View>
                    <View className="w-[30%] flex-row justify-end">
                        <Image
                            source={{
                                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Saint-Denis_-_Fa%C3%A7ade.jpg/330px-Saint-Denis_-_Fa%C3%A7ade.jpg'
                            }}
                            className="h-[80px] w-2/3 rounded-lg"
                        />
                    </View>
                </View>
                {expanded && (
                    <View className="mt-4 flex-row items-center space-x-4">
                        <TouchableOpacity className="flex-row items-center">
                            <Iconify icon="mdi:clock-outline" width={20} height={20} color="black" />
                            <Text className="text-xs font-bold ">Add time</Text>
                        </TouchableOpacity>
                        <View className="flex-row items-center">
                            <Iconify icon="mdi:currency-usd" width={20} height={20} color="black" />
                            <Text className="text-xs font-bold text-gray-800">Add cost</Text>
                        </View>
                    </View>
                )}
            </View>
            {expanded && (
                <View className="mt-4 px-2">
                    <View className="flex-row flex-wrap items-center space-x-1">
                        <View className="my-2 rounded-lg bg-gray-200 px-2 py-1">
                            <Text className="text-[11px] font-bold text-gray-600">Bascilia</Text>
                        </View>
                        <View className="my-2 rounded-lg bg-gray-200 px-2 py-1">
                            <Text className="text-[11px] font-bold text-gray-600">Sights & Landmarks</Text>
                        </View>
                        <View className="my-2 rounded-lg bg-gray-200 px-2 py-1">
                            <Text className="text-[11px] font-bold text-gray-600">Cathedral</Text>
                        </View>
                        <TouchableOpacity>
                            <Text className="my-2 text-[11px] font-bold text-gray-600">See more</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="mt-4 flex-row items-center space-x-1">
                        <Iconify icon="mdi:star" width={16} height={16} color="orange" />
                        <Text className="text-xs font-bold text-orange-400">4.6</Text>
                        <Text className="text-xs text-gray-500">(6638)</Text>
                        <Iconify icon="devicon:google" width={16} height={16} />
                    </View>

                    {/* Description */}
                    <View className="mt-3 flex-row items-start">
                        <Iconify icon="material-symbols:info" width={20} height={20} color="gray" />
                        <Text className="ml-2 text-gray-600">
                            The Basilica Cathedral of Saint Denis is an impressive Gothic cathedral known for its
                            intricate 12th-century stained-glass windows and numerous reclining statues. It serves as
                            the burial place for most of the Kings of France, making it a significant historical site.
                        </Text>
                    </View>

                    {/* Opening Hours */}
                    <View className="mt-3 flex-row items-center">
                        <Iconify icon="mdi:clock" width={20} height={20} color="gray" />
                        <Text className="ml-2 text-gray-600">Saturday: 10–17:15</Text>
                        <TouchableOpacity>
                            <Text className="ml-2 text-blue-500">Show other days</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Address */}
                    <View className="mt-3 flex-row items-center">
                        <Iconify icon="mdi:map-marker" width={20} height={20} color="gray" />
                        <Text className="ml-2 text-blue-500">
                            1 Rue de la Légion d&apos;Honneur, 93200 Saint-Denis, France
                        </Text>
                    </View>

                    {/* Website */}
                    <View className="mt-3 flex-row items-center">
                        <Iconify icon="mdi:world" width={20} height={20} color="gray" />
                        <Text className="ml-2 text-blue-500">https://www.saint-denis-basilique.fr/</Text>
                    </View>

                    {/* Phone */}
                    <View className="mt-3 flex-row items-center">
                        <Iconify icon="mdi:phone" width={20} height={20} color="gray" />
                        <Text className="ml-2 text-blue-500">+33 1 48 09 83 54</Text>
                    </View>

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
                            <TouchableOpacity>
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
