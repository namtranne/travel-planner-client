import { useNavigation } from '@react-navigation/native';
import type React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

interface HeaderComponentProps {
    title: string;
    hasBackButton?: boolean;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ title, hasBackButton = true }) => {
    const navigation = useNavigation();

    return (
        <View className="flex-row items-center justify-between px-4">
            {hasBackButton && (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Iconify color="black" icon="lets-icons:back-light" width="30" height="30" />
                </TouchableOpacity>
            )}
            <Text className="flex w-full flex-row text-center text-lg font-bold">{title}</Text>
            <View className="w-8" />
        </View>
    );
};

export default HeaderComponent;
