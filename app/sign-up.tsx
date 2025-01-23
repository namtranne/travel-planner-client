/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import { Link } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import Iconify from 'react-native-iconify';

import { Logo } from '@/assets';
import AuthInputField from '@/src/components/Auth/AuthInputField';
import Button from '@/src/components/ui/CommonButton';

export default function SignUp() {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const handleSignIn = () => {
        // Validation
        if (!username || !email || !password || !confirmPassword) {
            return console.error('All fields are required.');
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return console.error('Invalid email format.');
        }

        if (password !== confirmPassword) {
            return console.error('Passwords do not match.');
        }

        // If validation is successful, log the final information
        console.log({
            username,
            email,
            password
        });
        return null;
    };

    return (
        <SafeAreaView className="flex-1 items-center bg-white pt-36">
            <Link href="./" className="absolute left-6 top-12">
                <Iconify icon="lets-icons:back-light" width="30" height="30" />
            </Link>
            <Image source={Logo} className="h-[121px] w-[120px]" />
            <Text className="mb-4 font-inter text-lg font-semibold">Hi new friend!</Text>
            <View>
                {/* Input Fields */}
                <AuthInputField
                    placeholder="Username"
                    icon="basil:user-outline"
                    value={username}
                    onChangeText={setUsername}
                />
                <AuthInputField placeholder="Email" icon="clarity:email-line" value={email} onChangeText={setEmail} />
                <AuthInputField
                    placeholder="Password"
                    icon="mdi:password-outline"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <AuthInputField
                    placeholder="Confirm Password"
                    icon="mdi:password-outline"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                {/* Sign In Button */}
                <Button text="Create account" onPress={handleSignIn} additionalStyle="bg-[#60ABEF] w-[312px]" />
                <View />
                <Text className="mt-4 text-center font-inter text-xs">
                    Already have account?{' '}
                    <Link href="/sign-in" className="font-inter text-[#60ABEF]">
                        Sign In
                    </Link>
                </Text>
            </View>
        </SafeAreaView>
    );
}
