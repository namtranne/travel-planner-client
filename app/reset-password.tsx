import { useState } from 'react';
import { Alert, Image, Keyboard, SafeAreaView, Text, TouchableWithoutFeedback, View } from 'react-native';

import { Logo } from '@/assets';
import AuthInputField from '@/src/components/Auth/AuthInputField';
import BackButton from '@/src/components/ui/BackButton';
import Button from '@/src/components/ui/CommonButton';
import { useResetPassword } from '@/src/hooks/use-authenticate';

export default function ResetPassword({ navigation, route }: any) {
    const { usernameOrEmail } = route.params;
    const [password, setNewPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const { resetPassword, isPending } = useResetPassword();

    const handleResetPassword = () => {
        // Validation
        if (!password || !passwordConfirm) {
            Alert.alert(
                'Password is required',
                'Please provide both new password and confirmation password to continue',
                [
                    { text: 'Try Again', onPress: () => console.log('User retries reset password') },
                    { text: 'Cancel', style: 'cancel' }
                ]
            );
            return;
        }

        if (password !== passwordConfirm) {
            Alert.alert('Passwords do not match', 'Please ensure that both passwords match before proceeding', [
                { text: 'Try Again', onPress: () => console.log('User retries reset password') },
                { text: 'Cancel', style: 'cancel' }
            ]);
        }

        // If validation is successful, proceed with password reset
        resetPassword(
            { usernameOrEmail, password, passwordConfirm },
            {
                onSuccess: () => {
                    Alert.alert('Password Reset Successfully', 'Your password has been reset successfully!', [
                        { text: 'OK', onPress: () => navigation.navigate('SignIn') }
                    ]);
                },
                onError: (error: { message: string }) => {
                    Alert.alert('Reset Password Failed', error.message, [
                        { text: 'Try Again', onPress: () => console.log('User retries reset password') },
                        { text: 'Cancel', style: 'cancel' }
                    ]);
                }
            }
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView className="flex-1 bg-white p-4 px-6 pt-12">
                <BackButton />
                <View className="mt-2 flex-1 items-center px-6">
                    <Image source={Logo} className="h-[121px] w-[120px]" />
                    <Text className="mb-2 font-inter text-lg font-semibold">Reset Password</Text>
                    <Text className="mb-6 text-center text-xs text-gray-400">
                        Please enter your new password and confirm it
                    </Text>
                    <View className="flex w-full items-center justify-center px-4">
                        <AuthInputField
                            placeholder="New Password"
                            icon="mdi:password-outline"
                            value={password}
                            onChangeText={setNewPassword}
                            secureTextEntry
                        />
                        <AuthInputField
                            placeholder="Confirm Password"
                            icon="mdi:password-outline"
                            value={passwordConfirm}
                            onChangeText={setPasswordConfirm}
                            secureTextEntry
                        />
                        <Button
                            text="Reset"
                            onPress={handleResetPassword}
                            additionalStyle="bg-[#60ABEF] w-[200px]"
                            isPending={isPending}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
