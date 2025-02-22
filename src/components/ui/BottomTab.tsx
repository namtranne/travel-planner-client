import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

export default function BottomTab({ activeTab }: { activeTab: string }) {
    const tabs = [
        { id: 'home', icon: 'lets-icons:home', label: 'Home', route: 'home' },
        { id: 'trips', icon: 'material-symbols:calendar-month', label: 'Trips', route: 'travel-tips' },
        { id: 'favorites', icon: 'hugeicons:location-favourite-01', label: 'Favorites', route: 'favourites' },
        { id: 'profile', icon: 'iconamoon:profile-fill', label: 'Profile', route: 'profile' }
    ];
    return (
        <View className="flex-row items-center justify-around border-t border-gray-200 bg-white pb-4 pt-2">
            {tabs.map((tab) => (
                <TouchableOpacity key={tab.id} className="items-center px-4" onPress={() => router.push(tab.route)}>
                    <Iconify icon={tab.icon} size={24} color={activeTab === tab.id ? '#000000' : '#9CA3AF'} />
                    <Text
                        className={`mt-1 font-inter text-xs ${activeTab === tab.id ? 'font-semibold text-black' : 'text-gray-400'}`}
                    >
                        {tab.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
