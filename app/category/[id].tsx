import { Skeleton } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PlaceCard from '@/src/components/Category/PlaceCard';
import BackButton from '@/src/components/ui/BackButton';
import authAxios from '@/src/utils/axios';

export default function Category() {
    const { id } = useLocalSearchParams();
    const [data, setData]: any = useState(null);
    // const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            const res = await authAxios.get(`locations/category/${id}`);
            setData(res.data.data);
        };
        fetchData();
    }, [id]);
    if (!data) {
        return (
            <SafeAreaView className="flex-1 bg-white">
                <Skeleton />
            </SafeAreaView>
        );
    }
    return (
        <ScrollView className="flex-1 bg-white">
            <SafeAreaView className="absolute top-0 z-10 w-full">
                <BackButton />
            </SafeAreaView>
            {/* Background Image */}
            {data.headerImageKey && (
                <Image
                    source={{ uri: `https://itin-dev.wanderlogstatic.com/freeImage/${data.headerImageKey}` }}
                    className="h-48 w-full"
                />
            )}
            <View className="flex-1 p-4">
                {/* Category Title & Description */}
                <View>
                    <Text className="font-inter text-2xl font-bold">{data.title}</Text>
                    <Text className="mt-2 font-inter text-gray-600">{data.topBlurb}</Text>
                </View>

                {data?.places?.map((item: any) => {
                    return <PlaceCard key={item.id} item={item} />;
                })}
            </View>
        </ScrollView>
    );
}
