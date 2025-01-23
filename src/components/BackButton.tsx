/* eslint-disable import/no-extraneous-dependencies */
import { useNavigation } from 'expo-router';
import type React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const BackButton: React.FC = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4 h-8 w-8 items-center justify-center">
            <View className="flex items-center justify-center">
                <Icon name="back" size={24} color="black" />
            </View>
        </TouchableOpacity>
    );
};

export default BackButton;
