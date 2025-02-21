import { useNavigation } from '@react-navigation/native';
import type React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

const BackButton: React.FC = () => {
    const navigation = useNavigation();
    if (navigation.canGoBack()) {
        return (
            <TouchableOpacity onPress={() => navigation.goBack()} className="ml-[16px] flex items-start justify-center">
                <View className="flex items-center justify-center">
                    <Iconify color="black" icon="lets-icons:back-light" width="30" height="30" />
                </View>
            </TouchableOpacity>
        );
    }
    return null;
};

export default BackButton;
