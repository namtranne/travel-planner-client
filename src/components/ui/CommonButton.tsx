import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

export default function Button({
    text,
    onPress,
    additionalStyle,
    children,
    isPending = false
}: {
    text: string;
    onPress: () => void;
    additionalStyle: string;
    children?: React.JSX.Element;
    isPending?: boolean;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`flex h-[41px] items-center justify-center rounded-xl ${additionalStyle}`}
        >
            {isPending ? (
                <ActivityIndicator />
            ) : (
                <>
                    {children}
                    <Text className="font-inter text-xs font-semibold text-white">{text}</Text>
                </>
            )}
        </TouchableOpacity>
    );
}
