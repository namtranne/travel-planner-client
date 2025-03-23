import { Skeleton } from '@rneui/themed';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BrowseCategories from '@/src/components/Explore/BrowseCategories';
import { useExplorePage } from '@/src/hooks/use-location';

export default function Explore({
    locationId = 174,
    showFullPage = false
}: {
    locationId: number;
    showFullPage?: boolean;
}) {
    // const
    const { data, isLoading } = useExplorePage(locationId);
    if (isLoading) {
        return (
            <SafeAreaView>
                <View className={showFullPage ? 'px-4 py-6' : 'px-4'}>
                    {/* <View className="mb-4 flex-row items-center justify-between">
                        <TouchableOpacity><ArrowLeftIcon size={24} color="black" /></TouchableOpacity>
                        <Text className="text-lg font-bold">Explore</Text>
                        <TouchableOpacity><MagnifyingGlassIcon size={24} color="black" /></TouchableOpacity>
                    </View> */}
                    <View className="mt-4">
                        <Skeleton height={40} width={120} />
                    </View>
                    <View className="my-4">
                        <Skeleton height={300} />
                    </View>

                    <View className="flex-row flex-wrap justify-between gap-2">
                        {[...Array(10)].map((item, index) => {
                            return <Skeleton key={index} height={40} width="47%" />;
                        })}
                    </View>
                </View>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView>
            <View className={showFullPage ? 'px-4 py-6' : 'px-4'}>
                {/* <View className="mb-4 flex-row items-center justify-between"> */}
                <TouchableOpacity>{/* <ArrowLeftIcon size={24} color="black" /> */}</TouchableOpacity>
                {/* <Text className="text-lg font-bold">Explore</Text> */}
                <TouchableOpacity>{/* <MagnifyingGlassIcon size={24} color="black" /> */}</TouchableOpacity>
                {/* </View> */}

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
                    {data.categories
                        .slice(0, 10)
                        .map((category: { emoji: string; name: string; id: any }, index: number) => (
                            <TouchableOpacity
                                key={index}
                                className="w-[48%] flex-row items-center rounded-lg bg-gray-100 px-4 py-3"
                                onPress={() => router.push({ pathname: '/category/[id]', params: { id: category.id } })}
                            >
                                <Text className="mr-2 text-lg">{category.emoji}</Text>
                                <Text className="font-inter text-xs font-semibold text-gray-700">{category.name}</Text>
                            </TouchableOpacity>
                        ))}
                </View>
            </View>
        </SafeAreaView>
    );
}
