import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Iconify } from 'react-native-iconify';

const PlaceCard = ({ item, onSelected }: any) => {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <View className="mt-8 " key={item.id}>
            <View className="rounded-lg bg-white p-4 shadow-sm">
                {/* Place Image */}
                {item.images.length > 0 && (
                    <Image
                        source={{
                            uri: `https://itin-dev.wanderlogstatic.com/freeImage/${item.images[0]}`
                        }}
                        className="h-56 w-full rounded-lg"
                    />
                )}

                {/* Place Info */}
                <View className="mt-2">
                    <Text className="font-inter text-xl font-bold">{item.name}</Text>
                    <Text className="mb-2 font-inter">{item.description}</Text>

                    {/* Tags */}
                    <View className="mt-1 w-full flex-row flex-wrap">
                        {item.tags.map((tag: string, index: number) => (
                            <Text
                                key={index}
                                className="mb-2 mr-2 rounded-lg bg-gray-200 px-2 py-1 font-inter text-xs text-gray-600"
                            >
                                {tag}
                            </Text>
                        ))}
                    </View>

                    {/* Rating & Reviews */}
                    <View className="mt-2 flex-row items-center">
                        <Iconify className="text-black" icon="material-symbols:star" color="black" />
                        <Text className="ml-1 font-inter font-semibold">{item.rating}</Text>
                        <Text className="ml-2 font-inter text-gray-500">
                            ({item.reviews} {t('reviews')})
                        </Text>
                    </View>

                    {/* Address */}
                    {item.address && (
                        <View className="mt-2 flex-row items-start">
                            <Iconify className="text-black" icon="material-symbols:map" color="black" />
                            <Text className="ml-1 flex-1 font-inter text-gray-600">{item.address}</Text>
                        </View>
                    )}

                    {/* Phone */}
                    {item.phone && (
                        <View className="mt-1 flex-row items-center">
                            <Text className="ml-1 font-inter text-blue-600">{item.phone}</Text>
                        </View>
                    )}

                    {/* Time Spent */}
                    {(item.minMinutesSpent || item.maxMinutesSpent) && (
                        <View className="mt-2 flex-row items-center">
                            <Iconify className="text-black" icon="mdi:clock-outline" color="black" />
                            <Text className="ml-1 font-inter text-gray-500">
                                {t('Time spent')}:{' '}
                                {item.minMinutesSpent &&
                                item.maxMinutesSpent &&
                                item.minMinutesSpent !== item.maxMinutesSpent
                                    ? `${item.minMinutesSpent} - ${item.maxMinutesSpent}`
                                    : item.minMinutesSpent || item.maxMinutesSpent}{' '}
                                {' min'}
                            </Text>
                        </View>
                    )}

                    {/* Action Buttons */}
                    <View className="mt-2 flex-row justify-between">
                        <TouchableOpacity
                            className="mr-2 flex-1 rounded-lg bg-[#60ABEF] py-2"
                            onPress={() => router.push(`/place/${item.id}`)}
                        >
                            <Text className="text-center font-inter font-semibold text-white">{t('View more')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="ml-2 flex-1 rounded-lg bg-[#b6b6b6] py-2"
                            onPress={() => onSelected(item.id)}
                        >
                            <Text className=" text-center font-inter font-semibold text-white">{t('Add to Plan')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PlaceCard;
