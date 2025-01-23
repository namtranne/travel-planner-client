import { Text, TouchableOpacity } from 'react-native';

export default function Button({
    text,
    onPress,
    additionalStyle,
    children
}: {
    text: string;
    onPress: () => void;
    additionalStyle: string;
    children?: React.JSX.Element;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`flex h-[41px] items-center justify-center rounded-xl ${additionalStyle}`}
        >
            {children}
            <Text className="font-inter text-xs font-semibold text-white">{text}</Text>
        </TouchableOpacity>
    );
}
