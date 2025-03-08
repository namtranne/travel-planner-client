import { router } from 'expo-router';
import type React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

interface BackButtonProps {
    color?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ color = 'black' }) => {
    if (router.canGoBack()) {
        return (
            <TouchableOpacity onPress={() => router.back()} className="ml-[16px] flex items-start justify-center">
                <View className="flex items-center justify-center">
                    <Iconify color={color} icon="lets-icons:back-light" width="30" height="30" />
                </View>
            </TouchableOpacity>
        );
    }
    return null;
};

export default BackButton;
