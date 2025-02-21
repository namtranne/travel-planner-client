import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';
import Icon from 'react-native-vector-icons/FontAwesome5';

import HeaderComponent from '@/src/components/ui/HeaderComponent';

const OptionItem = ({ icon, title, handlePress }: { icon: string; title: string; handlePress: any }) => {
    return (
        <TouchableOpacity
            className="flex-row items-center justify-between border-b border-gray-100 px-3 py-4"
            onPress={handlePress}
        >
            <View className="flex-row items-center">
                <Iconify icon={icon} size={20} color="black" />
                <Text className="ml-3 text-base">{title}</Text>
            </View>
            <Icon name="chevron-right" size={15} color="gray" />
        </TouchableOpacity>
    );
};

const AccountScreen = ({ navigation }: any) => {
    return (
        <View className="h-full w-full bg-white">
            <ScrollView showsHorizontalScrollIndicator={false}>
                <SafeAreaView>
                    <HeaderComponent title="Account" hasBackButton={false} />
                    <View className="w-full flex-1 px-6 pt-4">
                        <View className="mt-10 items-center">
                            <Image
                                source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
                                className="mb-3 h-36 w-36 rounded-full"
                            />
                            <Text className="text-lg font-bold">Nguyen Van Hieu</Text>
                            <Text className="text-sm text-gray-500">@ngvahiu</Text>
                            <Text className="mb-5 text-sm text-gray-500">vanhieu230303@gmail.com</Text>
                        </View>
                        <View className="rounded-2xl p-2 shadow">
                            <OptionItem
                                icon="mdi:account"
                                title="Personal Information"
                                handlePress={() => navigation.push('Profile')}
                            />
                            <OptionItem
                                icon="material-symbols:settings-outline"
                                title="Settings"
                                handlePress={() => navigation.navigate('Profile')}
                            />
                            <OptionItem
                                icon="tabler:trash-off"
                                title="Delete Account"
                                handlePress={() => navigation.navigate('Profile')}
                            />
                            <OptionItem
                                icon="pepicons-pencil:leave"
                                title="Log out"
                                handlePress={() => navigation.navigate('Profile')}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default AccountScreen;
