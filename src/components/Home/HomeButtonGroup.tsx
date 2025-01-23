import { Text, TouchableOpacity, View } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import Iconify from 'react-native-iconify';

// 'fa-solid:place-of-worship',
// 'arcticons:budgetbakers-wallet',
// 'icon-park-solid:tips-one',
// 'gis:map-favorite'

const buttons = [
    { name: 'Nearby Attractions', icon: 'fa-solid:place-of-worship', color: '#F0F422' },
    { name: 'Budget Tracker', icon: 'arcticons:budgetbakers-wallet', color: '#A092DE' },
    { name: 'Travel Tips', icon: 'icon-park-solid:tips-one', color: '#12F187' },
    { name: 'Favourites', icon: 'gis:map-favorite', color: '#D9D9D9' }
];
export default function HomeButtonGroup() {
    return (
        <View className="mt-4 flex-row justify-between px-4">
            {buttons.map((button) => (
                <View key={button.name} className="items-center space-y-2">
                    <TouchableOpacity
                        className="flex h-16 w-16 items-center justify-center rounded-xl"
                        style={{ backgroundColor: button.color }}
                    >
                        <Iconify icon={button.icon} size={30} color="black" />
                    </TouchableOpacity>
                    <Text className="font-inter text-xs" style={{ fontSize: 8 }}>
                        {button.name}
                    </Text>
                </View>
            ))}
        </View>
    );
}
