import { useState } from 'react';
import { Alert, Image, Keyboard, SafeAreaView, Text, TouchableWithoutFeedback, View } from 'react-native';

import { Logo } from '@/assets';
import AuthInputField from '@/src/components/Auth/AuthInputField';
import BackButton from '@/src/components/ui/BackButton';
import Button from '@/src/components/ui/CommonButton';
import { useForgotPassword } from '@/src/hooks/use-authenticate';

import { OtpVerificationPurpose } from './otp-verification';

export default function ForgotPassword({ navigation }: any) {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const { forgotPassword, isPending } = useForgotPassword();

    const handleForgotPassword = () => {
        // Validation
        if (!usernameOrEmail) {
            Alert.alert(
                'Username or Email is required',
                'You should provide your username or email to continue next step',
                [
                    { text: 'Try Again', onPress: () => console.log('User retries send OTP') },
                    { text: 'Cancel', style: 'cancel' }
                ]
            );
            return;
        }

        forgotPassword(usernameOrEmail, {
            onSuccess: () => {
                navigation.navigate('OtpVerification', {
                    usernameOrEmail,
                    purpose: OtpVerificationPurpose.ResetPassword
                });
            },
            onError: (error: { message: string }) => {
                Alert.alert('Sent OTP Failed', error.message, [
                    { text: 'Try Again', onPress: () => console.log('User retries send OTP') },
                    { text: 'Cancel', style: 'cancel' }
                ]);
            }
        });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView className="flex-1 bg-white p-4 px-6 pt-12">
                <BackButton />
                <View className="mt-2 w-full flex-1 items-center px-6">
                    <Image source={Logo} className="h-[121px] w-[120px]" />
                    <Text className="mb-2 font-inter text-lg font-semibold">Forgot Password</Text>
                    <Text className="mb-6 text-center text-xs text-gray-400">
                        Please enter your username or email address. We will send you an OTP code to reset your
                        password.
                    </Text>
                    <View className="flex w-full items-center justify-center px-4">
                        <AuthInputField
                            placeholder="Username or Email"
                            icon="basil:user-outline"
                            value={usernameOrEmail}
                            onChangeText={setUsernameOrEmail}
                        />
                        <Button
                            text="Submit"
                            onPress={handleForgotPassword}
                            additionalStyle="bg-[#60ABEF] w-[200px]"
                            isPending={isPending}
                        />
                        <View />
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
