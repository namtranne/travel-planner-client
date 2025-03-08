import { useRouter } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';
import { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import { LogoText } from '@/assets';
import BackButton from '@/src/components/ui/BackButton';
import {
    useResendOtpEmail,
    useResendOtpResetPassword,
    useVerifyOtpEmail,
    useVerifyOtpResetPassword
} from '@/src/hooks/use-authenticate';

export enum OtpVerificationPurpose {
    VerifyEmail = 'VerifyEmail',
    ResetPassword = 'ResetPassword'
}

const OTPVerification = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const usernameOrEmail = searchParams.get('usernameOrEmail') || '';
    const purpose = searchParams.get('purpose') || OtpVerificationPurpose.VerifyEmail;
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(300);
    const inputsRef = useRef<(TextInput | null)[]>([]);
    const { verifyOtpEmail, isPending: isPendingVerifyOtpEmail } = useVerifyOtpEmail();
    const { resendOtpEmail, isPending: isPendingResendOtpEmail } = useResendOtpEmail();
    const { verifyOtpResetPassword, isPending: isPendingVerifyOtpResetPassword } = useVerifyOtpResetPassword();
    const { resendOtpResetPassword, isPending: isPendingResendOtpResetPassword } = useResendOtpResetPassword();

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
        return undefined;
    }, [timer]);

    const handleChangeText = (text: string, index: number) => {
        if (/^\d?$/.test(text)) {
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);

            if (text && index < 5) {
                inputsRef.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleResendOTP = () => {
        setOtp(['', '', '', '', '', '']);
        if (purpose === OtpVerificationPurpose.VerifyEmail) {
            resendOtpEmail(usernameOrEmail, {
                onSuccess: () => {},
                onError: (error: { message: string }) => {
                    Alert.alert('Resend OTP Failed', error.message, [
                        { text: 'Try Again', onPress: () => console.log('User retries resend OTP code') },
                        { text: 'Cancel', style: 'cancel' }
                    ]);
                }
            });
        } else if (purpose === OtpVerificationPurpose.ResetPassword) {
            resendOtpResetPassword(usernameOrEmail, {
                onSuccess: () => {},
                onError: (error: { message: string }) => {
                    Alert.alert('Resend OTP Failed', error.message, [
                        { text: 'Try Again', onPress: () => console.log('User retries resend OTP code') },
                        { text: 'Cancel', style: 'cancel' }
                    ]);
                }
            });
        }
    };

    const handleVerifyOTP = () => {
        const enteredOTP = otp.join('');
        if (enteredOTP.length !== 6) {
            Alert.alert('Invalid OTP', 'Please enter a 6-digit OTP.');
            return;
        }

        if (purpose === OtpVerificationPurpose.VerifyEmail) {
            verifyOtpEmail(
                { email: usernameOrEmail, otp: enteredOTP },
                {
                    onSuccess: () => {
                        Alert.alert('OTP Verified', 'Your account has been verified!');
                        router.navigate('/sign-in');
                    },
                    onError: (error: { message: string }) => {
                        Alert.alert('Verification Failed', error.message, [
                            { text: 'Try Again', onPress: () => console.log('User retries enter OTP code') },
                            { text: 'Cancel', style: 'cancel' }
                        ]);
                    }
                }
            );
        } else if (purpose === OtpVerificationPurpose.ResetPassword) {
            verifyOtpResetPassword(
                { usernameOrEmail, otp: enteredOTP },
                {
                    onSuccess: () => {
                        router.navigate({ pathname: '/reset-password', params: { usernameOrEmail } });
                    },
                    onError: (error: { message: string }) => {
                        Alert.alert('Verification Failed', error.message, [
                            { text: 'Try Again', onPress: () => console.log('User retries enter OTP code') },
                            { text: 'Cancel', style: 'cancel' }
                        ]);
                    }
                }
            );
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <SafeAreaView className="flex-1 bg-white">
                    <BackButton />
                    <View className="flex-1 items-center justify-center bg-white px-6">
                        <Image source={LogoText} className="h-[238.44px] w-[300px]" />
                        <Text className="text-center text-base font-semibold text-gray-700">
                            Enter the 6-digit OTP sent to mailbox of{' '}
                            <Text className="text-sm text-[#60ABEF]">{usernameOrEmail}</Text>
                        </Text>
                        <View className="mt-6 flex-row justify-center gap-3">
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={`otp-input-${index}`}
                                    ref={(el) => (inputsRef.current[index] = el)}
                                    className="h-12 w-12 rounded-md border-2 border-gray-300 text-center align-middle text-xl font-semibold"
                                    maxLength={1}
                                    keyboardType="numeric"
                                    value={digit}
                                    onChangeText={(text) => handleChangeText(text, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    onFocus={() =>
                                        inputsRef.current[index]?.setNativeProps({ selection: { start: 1, end: 1 } })
                                    }
                                />
                            ))}
                        </View>
                        <Text className="mt-4 text-gray-500">
                            OTP expires in{' '}
                            <Text className="font-semibold text-red-500">
                                {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
                            </Text>
                        </Text>
                        <TouchableOpacity
                            className={`mt-6 w-full rounded-md bg-[#60ABEF] py-3 ${timer === 0 ? 'opacity-50' : 'opacity-100'}`}
                            onPress={handleVerifyOTP}
                            disabled={timer === 0 || isPendingVerifyOtpEmail || isPendingResendOtpResetPassword}
                        >
                            <Text className="text-center text-lg font-semibold text-white">Verify OTP</Text>
                        </TouchableOpacity>
                        {timer === 0 && (
                            <TouchableOpacity
                                onPress={handleResendOTP}
                                className="mt-4"
                                disabled={isPendingResendOtpEmail || isPendingVerifyOtpResetPassword}
                            >
                                <Text className="font-semibold text-[#60ABEF]">Resend OTP</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default OTPVerification;
