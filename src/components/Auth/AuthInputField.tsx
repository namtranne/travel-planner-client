import { Input } from '@rneui/base';
// eslint-disable-next-line import/no-extraneous-dependencies
import Iconify from 'react-native-iconify';

export default function AuthInputField({
    placeholder,
    icon,
    value,
    onChangeText,
    secureTextEntry
}: {
    placeholder: string;
    icon: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
}) {
    return (
        <Input
            leftIcon={<Iconify icon={icon} width="24" height="24" color="black" opacity="40%" />}
            containerStyle={{
                width: 312,
                height: 50,
                backgroundColor: 'rgba(0, 0, 0, 0.03)',
                borderRadius: 14,
                marginBottom: 16
            }}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            inputContainerStyle={{
                borderBottomWidth: 0
            }}
            inputStyle={{
                fontSize: 13
            }}
        />
    );
}
