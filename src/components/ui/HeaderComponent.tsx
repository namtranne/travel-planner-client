import { router } from 'expo-router';
import type React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

interface HeaderComponentProps {
    title: string;
    hasBackButton?: boolean;
    backPath?: string;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ title, hasBackButton = true, backPath = '/home' }) => {
    return (
        <View className="relative flex-row items-center justify-center px-4 py-2 shadow">
            {hasBackButton && (
                <TouchableOpacity onPress={() => router.replace(backPath)} className="absolute left-4">
                    <Iconify color="black" icon="lets-icons:back-light" width="30" height="30" />
                </TouchableOpacity>
            )}
            <Text className="text-center text-lg font-bold">{title}</Text>
        </View>
    );
};

export default HeaderComponent;
