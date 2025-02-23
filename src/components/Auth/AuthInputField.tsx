import { Input } from '@rneui/base';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Iconify from 'react-native-iconify';

export default function AuthInputField({
    placeholder,
    icon,
    value,
    onChangeText,
    secureTextEntry
}: {
    placeholder: string;
    icon?: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
}) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <Input
            leftIcon={icon ? <Iconify icon={icon} width="24" height="24" color="black" opacity="40%" /> : undefined}
            rightIcon={
                secureTextEntry && (
                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        <Iconify
                            icon={isPasswordVisible ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                            width="24"
                            height="24"
                            color="black"
                        />
                    </TouchableOpacity>
                )
            }
            containerStyle={{
                width: '100%',
                height: 50,
                backgroundColor: 'rgba(0, 0, 0, 0.03)',
                borderRadius: 14,
                marginBottom: 16
            }}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            inputContainerStyle={{
                borderBottomWidth: 0
            }}
            inputStyle={{
                fontSize: 13
            }}
        />
    );
}
