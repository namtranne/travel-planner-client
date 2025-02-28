import { Link } from 'expo-router';
import React from 'react';
import { Alert, Image, SafeAreaView, Text, View } from 'react-native';

import { Logo } from '@/assets';
import AuthInputField from '@/src/components/Auth/AuthInputField';
import BackButton from '@/src/components/ui/BackButton';
import Button from '@/src/components/ui/CommonButton';
import { useSignUp } from '@/src/hooks/use-authenticate';

import { OtpVerificationPurpose } from './otp-verification';

export default function SignUp({ navigation }: any) {
    const [username, setUsername] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const { signUp, isPending } = useSignUp();

    const handleSignUp = () => {
        // Validation
        if (!username || !name || !email || !password || !passwordConfirm) {
            return console.error('All fields are required.');
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return console.error('Invalid email format.');
        }

        if (password !== passwordConfirm) {
            return console.error('Passwords do not match.');
        }

        // If validation is successful, log the final information
        signUp(
            { username, password, passwordConfirm, name, email },
            {
                onSuccess: () => {
                    navigation.navigate('OtpVerification', {
                        usernameOrEmail: email,
                        purpose: OtpVerificationPurpose.VerifyEmail
                    });
                },
                onError: (error: { message: string }) => {
                    Alert.alert('Sign Up Failed', error.message, [
                        { text: 'Try Again', onPress: () => console.log('User retries sign up') },
                        { text: 'Cancel', style: 'cancel' }
                    ]);
                }
            }
        );

        return null;
    };

    return (
        <SafeAreaView className="flex-1 bg-white p-4 px-6 pt-12">
            <BackButton />
            <View className="mt-2 flex-1 items-center">
                <Image source={Logo} className="h-[121px] w-[120px]" />
                <Text className="mb-4 font-inter text-lg font-semibold">Hi new friend!</Text>
                <View className="flex w-full items-center justify-center px-12">
                    {/* Input Fields */}
                    <AuthInputField
                        placeholder="Username"
                        icon="basil:user-outline"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <AuthInputField placeholder="Name" icon="basil:user-outline" value={name} onChangeText={setName} />
                    <AuthInputField
                        placeholder="Email"
                        icon="clarity:email-line"
                        value={email}
                        onChangeText={setEmail}
                    />
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
                        value={passwordConfirm}
                        onChangeText={setPasswordConfirm}
                        secureTextEntry
                    />
                    {/* Sign Up Button */}
                    <Button
                        text="Create account"
                        onPress={handleSignUp}
                        additionalStyle="bg-[#60ABEF] w-[312px]"
                        isPending={isPending}
                    />
                    <View />
                    <Text className="mt-4 text-center font-inter text-xs">
                        Already have account?{' '}
                        <Link href="./sign-in" className="font-inter text-[#60ABEF]">
                            Sign In
                        </Link>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
