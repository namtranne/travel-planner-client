import { Avatar } from '@rneui/themed';
import { router } from 'expo-router';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { AirPlane, DefaultUserProfile } from '@/assets';
import DestinationSuggestions from '@/src/components/Home/DestinationSuggestions';
import HomeButtonGroup from '@/src/components/Home/HomeButtonGroup';
import BottomTab from '@/src/components/ui/BottomTab';

export default function Home() {
    return (
        <View className="h-full w-full">
            <SafeAreaView className="w-full flex-1">
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View className="w-full px-6 pt-4">
                        <Avatar
                            size="small"
                            rounded
                            source={DefaultUserProfile}
                            avatarStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                        />
                        <Text className="mt-2 font-inter text-lg">Hi John,</Text>
                        <Text className="mt-2 font-inter text-3xl font-bold">Ready to plan your next trip?</Text>
                        <TouchableOpacity
                            className="mt-6 flex-row rounded-3xl bg-[#CCE4FF] px-4 py-6"
                            onPress={() => router.push('planning')}
                        >
                            {/* Left Section: 70% width (flex-[7]) */}
                            <View className="flex-1 pr-[2px]">
                                <Text className="font-inter text-sm font-bold">Start planning now!</Text>
                                <Text className="font-inter text-xs">Create a perfect plan in just a few clicks</Text>
                            </View>
                            <Image source={AirPlane} className="h-[70px] w-[120px]" />
                        </TouchableOpacity>
                        <HomeButtonGroup />
                    </View>
                    <DestinationSuggestions />
                </ScrollView>
            </SafeAreaView>
            <BottomTab activeTab="home" />
        </View>
    );
}
