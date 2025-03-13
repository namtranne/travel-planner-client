import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const categoryData = {
    title: 'Where to eat: The 45 Best Restaurants in An Giang Province',
    backgroundImage: 'https://via.placeholder.com/800x300',
    description:
        'An Giang Province, nestled in the heart of the Mekong Delta, is a treasure trove of culinary delights...'
};

const places = [
    {
        id: '1',
        name: 'Lẩu mắm Hiếu Miên',
        image: 'https://via.placeholder.com/300',
        rating: 4.4,
        reviews: 426,
        tags: ['Bistro', 'Local Specialty'],
        timeSpent: '1.5 hours',
        openingHours: {
            Monday: '07:00 - 22:00',
            Tuesday: '07:00 - 22:00',
            Wednesday: '07:00 - 22:00',
            Thursday: '07:00 - 22:00',
            Friday: '07:00 - 23:00',
            Saturday: '07:00 - 23:00',
            Sunday: '07:00 - 22:00'
        },
        address: '5D Lê Lai, P. Mỹ Bình, Thành phố Long Xuyên, An Giang, Vietnam',
        phone: '+84 915 822 832'
    }
    // Add more places here...
];

export default function Category() {
    const { id } = useLocalSearchParams();
    console.log(id);
    const router = useRouter();

    return (
        <ScrollView className="flex-1 bg-white">
            {/* Background Image */}
            <Image source={{ uri: categoryData.backgroundImage }} className="h-48 w-full" />

            {/* Category Title & Description */}
            <View className="p-4">
                <Text className="text-2xl font-bold">{categoryData.title}</Text>
                <Text className="mt-2 text-gray-600">{categoryData.description}</Text>
            </View>

            {/* Places List */}
            <FlatList
                data={places}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className="m-4 rounded-lg border bg-white p-4 shadow-sm"
                        onPress={() => router.push(`/place/${item.id}`)}
                    >
                        {/* Place Image */}
                        <Image source={{ uri: item.image }} className="h-40 w-full rounded-lg" />

                        {/* Place Info */}
                        <View className="mt-2">
                            <Text className="text-xl font-bold">{item.name}</Text>

                            {/* Tags */}
                            <View className="mt-1 flex-row">
                                {item.tags.map((tag, index) => (
                                    <Text
                                        key={index}
                                        className="mr-2 rounded-lg bg-gray-200 px-2 py-1 text-xs text-gray-600"
                                    >
                                        {tag}
                                    </Text>
                                ))}
                            </View>

                            {/* Rating & Reviews */}
                            <View className="mt-2 flex-row items-center">
                                {/* <FontAwesome name="star" size={16} color="gold" /> */}
                                <Text className="ml-1 font-semibold">{item.rating}</Text>
                                <Text className="ml-2 text-gray-500">({item.reviews} reviews)</Text>
                            </View>

                            {/* Opening Hours */}
                            <Text className="mt-1 text-gray-500">Time Spent: {item.timeSpent}</Text>
                            <Text className="text-gray-500">Opening Hours: {item.openingHours.Monday} (Mon)</Text>

                            {/* Address & Phone */}
                            <View className="mt-2 flex-row items-center">
                                {/* <Ionicons name="location-outline" size={16} color="gray" /> */}
                                <Text className="ml-1 flex-1 text-gray-600">{item.address}</Text>
                            </View>

                            <View className="mt-1 flex-row items-center">
                                {/* <Ionicons name="call-outline" size={16} color="gray" /> */}
                                <Text className="ml-1 text-blue-600">{item.phone}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </ScrollView>
    );
}
