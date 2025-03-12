import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BrowseCategories from '@/src/components/Explore/BrowseCategories';

export default function Explore() {
    const categories = [
        { name: 'Restaurants', icon: '🍽️' },
        { name: 'Attractions', icon: '📍' },
        { name: 'Cafes', icon: '☕' },
        { name: 'Photo spots', icon: '📸' },
        { name: 'Cheap eats', icon: '💰' },
        { name: 'Breakfast', icon: '🍳' },
        { name: 'Bakeries', icon: '🥐' },
        { name: 'Breweries', icon: '🍺' },
        { name: 'Romantic places', icon: '❤️' }
    ];
    return (
        <SafeAreaView>
            <View className="px-4 py-6">
                <View className="mb-4 flex-row items-center justify-between">
                    <TouchableOpacity>{/* <ArrowLeftIcon size={24} color="black" /> */}</TouchableOpacity>
                    <Text className="text-lg font-bold">Explore</Text>
                    <TouchableOpacity>{/* <MagnifyingGlassIcon size={24} color="black" /> */}</TouchableOpacity>
                </View>

                {/* Title & Description */}
                <Text className="mb-2 font-inter text-3xl font-bold">Da Lat</Text>
                <Text className="mb-4 font-inter text-gray-600">
                    Located in the mystical Highlands of Vietnam, Da Lat has a cool climate and beautiful scenery. It is
                    known as the city of eternal spring - famous for its pine trees, rice fields, and lakes...
                </Text>

                {/* Categories */}
                <View className="mb-4 flex-row items-center justify-between">
                    <Text className="font-inter text-xl font-bold">Categories</Text>
                    <BrowseCategories />
                </View>

                {/* Category Grid */}
                <View className="flex-row flex-wrap gap-2">
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            className="w-[48%] flex-row items-center rounded-lg bg-gray-100 px-4 py-3"
                        >
                            <Text className="mr-2 text-lg">{category.icon}</Text>
                            <Text className="font-inter text-xs font-semibold text-gray-700">{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}
