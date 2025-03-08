import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, Text, View } from 'react-native';

import HeaderComponent from '@/src/components/ui/HeaderComponent';
import OptionItem from '@/src/components/ui/OptionItem';
import { useLogout, useUser } from '@/src/hooks/use-authenticate';
import authAxios from '@/src/utils/axios';

const AccountScreen = () => {
    const { logout, isPending } = useLogout();
    const { user, isLoading } = useUser();
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#60ABEF" />
            </View>
        );
    }

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
                            await SecureStore.deleteItemAsync('token');
                            authAxios.defaults.headers.common.Authorization = null;
                            router.navigate('../../welcome');
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
                                source={{
                                    uri:
                                        user.avatarUrl ||
                                        'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
                                }}
                                className="mb-3 h-36 w-36 rounded-full"
                            />
                            <Text className="text-lg font-bold">{user.name}</Text>
                            <Text className="text-sm text-gray-500">@{user.username}</Text>
                            <Text className="mb-5 text-sm text-gray-500">{user.email}</Text>
                        </View>
                        <View className="rounded-2xl p-2 shadow">
                            <OptionItem
                                icon="mdi:account"
                                title="Personal Information"
                                handlePress={() => router.navigate('/profile')}
                            />
                            <OptionItem
                                icon="material-symbols:settings-outline"
                                title="Settings"
                                handlePress={() => router.push('/settings')}
                            />
                            <OptionItem
                                icon="tabler:trash-off"
                                title="Delete Account"
                                handlePress={() => router.push('/profile')}
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
