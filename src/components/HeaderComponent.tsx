import type React from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, Text, View } from 'react-native';

interface HeaderComponentProps {
    title: string;
    subtitle?: string;
    icon?: ImageSourcePropType;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ title, subtitle, icon }) => {
    return (
        <View className="mb-4 ml-2">
            <View className="flex-row items-center">
                <Text className="font-inter text-3xl font-bold text-black">{title}</Text>
                {icon && <Image source={icon} className="ml-2 h-6 w-6" />}
            </View>
            {subtitle && <Text className="mt-1 font-inter text-base text-gray-500">{subtitle}</Text>}
        </View>
    );
};

export default HeaderComponent;
