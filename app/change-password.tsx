import { useState } from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import AuthInputField from '@/src/components/Auth/AuthInputField';
import BackButton from '@/src/components/ui/BackButton';
import Button from '@/src/components/ui/CommonButton';
import HeaderComponent from '@/src/components/ui/HeaderComponent';
import { useChangePassword } from '@/src/hooks/use-authenticate';

const ChangePasswordScreen = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const { changePassword, isPending } = useChangePassword();

    const handleChangePassword = () => {
        if (!oldPassword || !newPassword || !newPasswordConfirm) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }
        if (newPassword !== newPasswordConfirm) {
            Alert.alert('Error', 'New passwords do not match.');
            return;
        }

        changePassword(
            { oldPassword, newPassword, newPasswordConfirm },
            {
                onSuccess: () => {
                    Alert.alert('Success', 'Your password has been changed successfully.', [
                        {
                            text: 'OK',
                            onPress: () => {
                                setOldPassword('');
                                setNewPassword('');
                                setNewPasswordConfirm('');
                            }
                        }
                    ]);
                },
                onError: (error: { message: string }) => {
                    Alert.alert('Change Password Failed', error.message, [
                        { text: 'Try Again', onPress: () => console.log('User retries change password') },
                        { text: 'Cancel', style: 'cancel' }
                    ]);
                }
            }
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View className="h-full w-full bg-white">
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        <SafeAreaView>
                            <BackButton />
                            <HeaderComponent title="Password & Security" hasBackButton={false} />
                            <View className="w-full flex-1 px-6 pt-4">
                                <Text className="mb-1 font-semibold">Current Password</Text>
                                <AuthInputField
                                    placeholder="Enter old password"
                                    value={oldPassword}
                                    onChangeText={setOldPassword}
                                    secureTextEntry
                                />
                                <Text className="mb-1 mt-4 font-semibold">New Password</Text>
                                <AuthInputField
                                    placeholder="Enter New Password"
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    secureTextEntry
                                />
                                <Text className="mb-1 mt-4 font-semibold">Confirm New Password</Text>
                                <AuthInputField
                                    placeholder="Confirm New Password"
                                    value={newPasswordConfirm}
                                    onChangeText={setNewPasswordConfirm}
                                    secureTextEntry
                                />
                                <View className="flex flex-row items-center justify-center">
                                    <Button
                                        text="Change Password"
                                        onPress={handleChangePassword}
                                        additionalStyle="bg-[#60ABEF] w-[200px] mt-6"
                                        isPending={isPending}
                                    />
                                </View>
                            </View>
                        </SafeAreaView>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default ChangePasswordScreen;
