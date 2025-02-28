import { Text, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';
import Icon from 'react-native-vector-icons/FontAwesome5';

const OptionItem = ({
    icon,
    title,
    handlePress,
    disabled = false
}: {
    icon: string;
    title: string;
    handlePress: any;
    disabled?: boolean;
}) => {
    return (
        <TouchableOpacity
            className="flex-row items-center justify-between border-b border-gray-100 px-3 py-4"
            onPress={handlePress}
            disabled={disabled}
        >
            <View className="flex-row items-center">
                <Iconify icon={icon} size={20} color="black" />
                <Text className="ml-3 text-base">{title}</Text>
            </View>
            <Icon name="chevron-right" size={15} color="gray" />
        </TouchableOpacity>
    );
};

export default OptionItem;
