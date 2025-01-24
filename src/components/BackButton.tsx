/* eslint-disable import/no-extraneous-dependencies */
import { useNavigation } from 'expo-router';
import type React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

const BackButton: React.FC = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4 h-8 w-8 items-center justify-center">
            <View className="flex items-center justify-center">
                <Iconify icon="lets-icons:back-light" width="30" height="30" />
            </View>
        </TouchableOpacity>
    );
};

export default BackButton;
