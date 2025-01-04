/* eslint-disable global-require */
import { Input } from '@rneui/themed';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Logo } from '@/assets';

export default function SignIn() {
    return (
        <View className="flex-1 items-center">
            <Image source={Logo} className="h-[121px] w-[120px]" />

            <View>
                <Input className="h-[41px] w-[248px]" />
                <View className="flex flex-row">
                    <TouchableOpacity
                        onPress={() => console.log('Sign In Pressed')}
                        className="flex h-[41px] w-[140px] items-center justify-center rounded-xl bg-[#60ABEF]"
                    >
                        <Text className="test-xs font-inter font-semibold text-white">Sign In</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => console.log('Sign In Pressed')}
                        className="mt-5 flex h-[41px] w-[312px] flex-row items-center justify-center rounded-xl bg-black"
                    >
                        <Text className="mr-2 pb-[3px] text-xl text-white"></Text>
                        <Text className="font-inter text-xs font-semibold text-white">Sign in with Apple</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
