import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

import BudgetTab from '@/src/components/TripPlanTabs/BudgetTab';
import ExploreTab from '@/src/components/TripPlanTabs/ExploreTab';
import ItineraryTab from '@/src/components/TripPlanTabs/ItineraryTab';
import OverviewTab from '@/src/components/TripPlanTabs/OverviewTab';
import BackButton from '@/src/components/ui/BackButton';
import Button from '@/src/components/ui/CommonButton';

const TripPlanTabs = ['Overview', 'Itinerary', 'Explore', 'Budget'];
const TabComponents: { [key: string]: React.ComponentType } = {
    Overview: OverviewTab,
    Itinerary: ItineraryTab,
    Explore: ExploreTab,
    Budget: BudgetTab
};
export default function TripScreen() {
    const [selectedTab, setSelectedTab] = useState(TripPlanTabs[0] || 'Overview');
    const TabContent = TabComponents[selectedTab] || OverviewTab;

    return (
        <View className="flex-1 bg-gray-100">
            {/* Fixed Header & Tabs */}
            <SafeAreaView className="bg-blue-400">
                <View className="rounded-b-3xl bg-blue-400">
                    <BackButton color="white" />
                    <View className="px-6">
                        <Text className="mt-2 text-2xl font-bold text-white">Summer trip</Text>
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center gap-2">
                                <Iconify icon="solar:calendar-linear" color="white" size={16} />
                                <Text className="text-xs text-white">12 Jan - 20 Jan</Text>
                            </View>
                            <View className="flex-row">
                                <View className="-ml-2 flex-row items-center justify-center">
                                    {[...Array(3)].map((_, index) => (
                                        <Image
                                            key={index}
                                            source={{
                                                uri: 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg'
                                            }}
                                            className="h-8 w-8 rounded-full border-2 border-white"
                                            style={{ marginLeft: -36 / 3 }}
                                        />
                                    ))}
                                    <View
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e3f2fd]"
                                        style={{ marginLeft: -36 / 3 }}
                                    >
                                        <Text className="text-xs font-bold text-[#60ABEF]">+2</Text>
                                    </View>
                                </View>
                                <Button text="Share" onPress={() => {}} additionalStyle="bg-black px-4 py-2 ml-3" />
                            </View>
                        </View>
                    </View>
                </View>
                <View className="mt-4 flex-row justify-between">
                    {TripPlanTabs.map((tab, index) => {
                        const isActive = selectedTab === tab;
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedTab(tab)}
                                className={`flex-1 items-center py-3 ${
                                    isActive ? 'bg-white' : 'bg-transparent'
                                } rounded-t-xl`}
                            >
                                <Text className={`font-semibold ${isActive ? 'text-[#60ABEF]' : 'text-white'}`}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </SafeAreaView>

            {/* Tab content */}
            <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
                <TabContent />
            </ScrollView>
        </View>
    );
}
