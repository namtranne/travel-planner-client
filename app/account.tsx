import { Alert, Image, SafeAreaView, ScrollView, Text, View } from 'react-native';

import HeaderComponent from '@/src/components/ui/HeaderComponent';
import OptionItem from '@/src/components/ui/OptionItem';
import { useLogout } from '@/src/hooks/use-authenticate';

const AccountScreen = ({ navigation }: any) => {
    const { logout, isPending } = useLogout();

    const handleLogout = () => {
        Alert.alert(
            'Log out',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Log out',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            logout();
                            // await AsyncStorage.removeItem('token');
                            // authAxios.defaults.headers.common.Authorization = null;
                            navigation.navigate('Welcome');
                        } catch (error: unknown) {
                            Alert.alert('Logout Failed', (error as Error)?.message, [
                                { text: 'Try Again', onPress: () => console.log('User retries log out') },
                                { text: 'Cancel', style: 'cancel' }
                            ]);
                        }
                    }
                }
            ],
            { cancelable: true }
        );
    };

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
                                handlePress={() => navigation.navigate('Settings')}
                            />
                            <OptionItem
                                icon="tabler:trash-off"
                                title="Delete Account"
                                handlePress={() => navigation.navigate('Profile')}
                            />
                            <OptionItem
                                icon="pepicons-pencil:leave"
                                title="Log out"
                                handlePress={handleLogout}
                                disabled={isPending}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default AccountScreen;
