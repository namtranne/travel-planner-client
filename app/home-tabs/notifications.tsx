import { CheckBox } from '@rneui/base';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import HeaderComponent from '@/src/components/ui/HeaderComponent';
import { useUser } from '@/src/hooks/use-authenticate';
import {
    useDeleteNotification,
    useMarkNotificationAsRead,
    useNotifications,
    useNotificationSocket
} from '@/src/hooks/use-notification';
import { convertToNotificationDate } from '@/src/utils/DateTimeUtil';

const NotificationScreen = () => {
    const [tab, setTab] = useState<'unread' | 'read'>('unread');
    const [realtimeNotifications, setRealtimeNotifications] = useState<any[]>([]);

    const { data: notifications = [], isLoading: isLoadingNotifications } = useNotifications();
    const { isPending: isPendingMarkNotificationAsRead, markNotificationAsRead } = useMarkNotificationAsRead();
    const { isPending: isPendingDeleteNotification, deleteNotification } = useDeleteNotification();
    const { user, isLoading: isLoadingUser } = useUser();
    const { t } = useTranslation();

    const handleNewNotification = useCallback(
        (data: any) => {
            setRealtimeNotifications((prev) => [data, ...prev]);
            Toast.show({
                type: 'info',
                position: 'top',
                text1: data.title,
                text2: data.content,
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 60
            });
        },
        [setRealtimeNotifications]
    );

    useNotificationSocket(user.id.toString(), handleNewNotification);

    const filteredNotifications = realtimeNotifications.filter((notification: any) =>
        tab === 'unread' ? !notification.isRead : notification.isRead
    );

    const renderItem = ({ item }: any) => (
        <Swipeable
            renderRightActions={() => (
                <TouchableOpacity
                    className="ml-4 w-20 items-center justify-center bg-red-500"
                    onPress={() => deleteNotification({ notificationId: item.id })}
                    disabled={isPendingDeleteNotification}
                >
                    <Text className="font-bold text-white">{t('Delete')}</Text>
                </TouchableOpacity>
            )}
            key={item.id}
        >
            <View className="mb-3 flex-row items-start justify-between rounded-xl bg-white p-4 shadow-sm">
                <View className="flex-1 pr-3">
                    <Text className="text-sm text-gray-400">{convertToNotificationDate(item.createdAt)}</Text>
                    <Text className="mb-1 text-base font-semibold">{item.title}</Text>
                    <Text className="text-xs text-gray-500">{item.content}</Text>
                </View>

                {tab === 'unread' && (
                    <CheckBox
                        checked={false}
                        disabled={isPendingMarkNotificationAsRead}
                        onPress={() => markNotificationAsRead({ notificationId: item.id })}
                        checkedColor="#3B82F6"
                        containerStyle={{ padding: 0, margin: 0 }}
                    />
                )}
            </View>
        </Swipeable>
    );

    useEffect(() => {
        if (notifications && !isLoadingNotifications) {
            setRealtimeNotifications(notifications);
        }
    }, [notifications, isLoadingNotifications]);

    if (isLoadingNotifications || isLoadingUser) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#60ABEF" />
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView className="flex-1 bg-gray-50 px-4">
                <HeaderComponent title={t('Notifications')} hasBackButton={false} />
                {/* Tabs */}
                <View className="mb-4 flex-row">
                    <TouchableOpacity
                        className={`flex-1 items-center rounded-full py-2 ${tab === 'unread' ? 'bg-[#60ABEF]' : 'bg-gray-200'}`}
                        onPress={() => setTab('unread')}
                    >
                        <Text className={`font-medium ${tab === 'unread' ? 'text-white' : 'text-gray-700'}`}>
                            {t('Unread')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`ml-2 flex-1 items-center rounded-full py-2 ${tab === 'read' ? 'bg-[#60ABEF]' : 'bg-gray-200'}`}
                        onPress={() => setTab('read')}
                    >
                        <Text className={`font-medium ${tab === 'read' ? 'text-white' : 'text-gray-700'}`}>
                            {t('Read')}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Notification list */}
                <FlatList
                    data={filteredNotifications}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListEmptyComponent={
                        <Text className="mt-10 text-center text-gray-400">{t(`No ${tab} notifications`)}</Text>
                    }
                />
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default NotificationScreen;
