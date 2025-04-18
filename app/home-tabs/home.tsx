import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { AirPlane, BrandText, Logo } from '@/assets';
import DestinationSuggestions from '@/src/components/Home/DestinationSuggestions';
import HomeButtonGroup from '@/src/components/Home/HomeButtonGroup';
import { useUser } from '@/src/hooks/use-authenticate';

export default function HomeScreen() {
    const { user, isLoading } = useUser();
    useEffect(() => {
        if (user && !user.preferences && !isLoading) {
            router.navigate('/user-survey');
        }
    }, [user, isLoading]);
    if (isLoading) {
        return null;
    }
    return (
        <View className="h-full w-full">
            <View className="w-full flex-1 pb-4">
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <SafeAreaView>
                        <View className="w-full px-6 pt-4">
                            <View className="flex flex-row items-center">
                                <Image source={Logo} className="h-[30px] w-[30px]" />
                                <Image source={BrandText} className="h-[12px] w-[120px]" />
                            </View>
                            <Text className="mt-10 font-inter text-3xl font-bold">Ready to plan your next trip?</Text>
                            <TouchableOpacity
                                className="mt-6 flex-row rounded-3xl bg-[#CCE4FF] px-4 py-6"
                                onPress={() => router.navigate('planning')}
                            >
                                <View className="flex-1 pr-[2px]">
                                    <Text className="font-inter text-sm font-bold">Start planning now!</Text>
                                    <Text className="font-inter text-xs">
                                        Create a perfect plan in just a few clicks
                                    </Text>
                                </View>
                                <Image source={AirPlane} className="h-[70px] w-[120px]" />
                            </TouchableOpacity>
                            <HomeButtonGroup />
                        </View>
                    </SafeAreaView>
                    <DestinationSuggestions />
                </ScrollView>
            </View>
        </View>
    );
}
