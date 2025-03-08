import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { Logo } from '@/assets';
import AuthInputField from '@/src/components/Auth/AuthInputField';
import BackButton from '@/src/components/ui/BackButton';
import Button from '@/src/components/ui/CommonButton';
import { useLogin } from '@/src/hooks/use-authenticate';

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, isPending } = useLogin();

    const handleSignIn = () => {
        // Validation
        if (!username || !password) {
            return console.error('All fields are required.');
        }
        login(
            { username, password },
            {
                onSuccess: () => {
                    router.navigate('home-tabs/home');
                },
                onError: (error) => {
                    Alert.alert('Login Failed', error.message, [
                        { text: 'Try Again', onPress: () => console.log('User retries login') },
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
                <Text className="mb-4 font-inter text-lg font-semibold">Welcome back!</Text>
                <View className="flex w-full items-center justify-center px-12">
                    <AuthInputField
                        placeholder="Username or Email"
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
                    <TouchableOpacity
                        className="mb-6 w-full text-right"
                        onPress={() => router.navigate('/forgot-password')}
                    >
                        <Text className="text-right font-inter text-xs text-[#60ABEF]">Forgot your password?</Text>
                    </TouchableOpacity>
                    <Button
                        text="Login"
                        onPress={handleSignIn}
                        additionalStyle="bg-[#60ABEF] w-[312px]"
                        isPending={isPending}
                    />
                    <View />
                    <TouchableOpacity className="mt-4" onPress={() => router.navigate('/sign-up')}>
                        <Text className="text-center font-inter text-xs">
                            Don&apos;t have an account? <Text className="text-[#60ABEF]">Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
