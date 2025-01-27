/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';
import Iconify from 'react-native-iconify';

import { Logo } from '@/assets';
import AuthInputField from '@/src/components/Auth/AuthInputField';
import Button from '@/src/components/ui/CommonButton';

export default function SignIn() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSignIn = () => {
        // Validation
        if (!username || !password) {
            return console.error('All fields are required.');
        }

        // If validation is successful, log the final information
        console.log({
            username,
            password
        });
        return null;
    };

    return (
        <View className="flex-1 items-center bg-white pt-36">
            <Link href="./" className="absolute left-6 top-12">
                <Iconify icon="lets-icons:back-light" width="30" height="30" />
            </Link>
            <Image source={Logo} className="h-[121px] w-[120px]" />
            <Text className="mb-4 font-inter text-lg font-semibold">Welcome back!</Text>
            <View>
                {/* Input Fields */}
                <AuthInputField
                    placeholder="Username"
                    icon="basil:user-outline"
                    value={username}
                    onChangeText={setUsername}
                />
                <AuthInputField
                    placeholder="Password"
                    icon="mdi:password-outline"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {/* Sign In Button */}
                <Button text="Login" onPress={handleSignIn} additionalStyle="bg-[#60ABEF] w-[312px]" />
                <View />
                <Text className="mt-4 text-center font-inter text-xs">
                    {"Don't have account?"}{' '}
                    <Link href="/sign-up" className="font-inter text-[#60ABEF]">
                        Sign Up
                    </Link>
                </Text>
            </View>
        </View>
    );
}
