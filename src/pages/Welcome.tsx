/* eslint-disable global-require */
import { Link } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { LogoText } from '@/assets';
const Welcome = () => (
  <View className="flex h-full w-full items-center pt-36">
    <Image
      source={LogoText}
      className="h-[238.44px] w-[300px]"
    />
    <View>
      <View className="flex flex-row">
        <TouchableOpacity
          onPress={() => console.log('Sign In Pressed')}
          className="mr-8 flex h-[41px] w-[140px] items-center justify-center rounded-xl border border-[#60ABEF]"
        >
          <Link
            href="/sign-in"
            className="font-inter text-xs font-semibold text-black"
          >
            Sign In
          </Link>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log('Sign In Pressed')}
          className="flex h-[41px] w-[140px] items-center justify-center rounded-xl bg-[#60ABEF]"
        >
          <Text className="font-inter text-xs font-semibold text-white">
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => console.log('Sign In Pressed')}
          className="mt-5 flex h-[41px] w-[312px] flex-row items-center justify-center rounded-xl bg-black"
        >
          <Text className="mr-2 pb-[3px] text-xl text-white"></Text>
          <Text className="font-inter text-xs font-semibold text-white">
            Sign in with Apple
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export { Welcome };
