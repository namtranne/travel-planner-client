import { router } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { LogoText } from '@/assets';
import GoogleSigninButton from '@/src/components/Auth/GoogleSigninButton';

const Welcome = () => {
    return (
        <View className="flex h-full w-full items-center bg-white pt-36">
            <Image source={LogoText} className="h-[238.44px] w-[300px]" />
            <View>
                <View className="flex flex-row">
                    <TouchableOpacity
                        onPress={() => router.navigate('/sign-up')}
                        className="mr-8 flex h-[41px] w-[140px] items-center justify-center rounded-xl border border-[#60ABEF]"
                    >
                        <Text className="font-inter text-xs font-semibold text-black">Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.navigate('/sign-in')}
                        className="flex h-[41px] w-[140px] items-center justify-center rounded-xl bg-[#60ABEF]"
                    >
                        <Text className="font-inter text-xs font-semibold text-white">Sign In</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => router.navigate('/trip-board')}
                        className="mt-5 flex h-[41px] w-[312px] flex-row items-center justify-center rounded-xl bg-black"
                    >
                        <Text className="font-inter text-xs font-semibold text-white">Home</Text>
                    </TouchableOpacity>
                    <GoogleSigninButton />
                </View>
            </View>
        </View>
    );
};
export default Welcome;
