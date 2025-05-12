import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Constants from 'expo-constants';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import io from 'socket.io-client';

import {
    deleteNotification as deleteNotificationApi,
    getNotificationDetails,
    getNotifications,
    markNotificationAsRead as markNotificationAsReadApi
} from '../services/api-notification';

interface NotificationSocketProps {
    userId: string;
    onNotificationReceived: (notification: any) => void;
}

export const useNotificationSocket = (
    userId: NotificationSocketProps['userId'],
    onNotificationReceived: NotificationSocketProps['onNotificationReceived']
): void => {
    useEffect(() => {
        const socket = io(Constants.expoConfig?.extra?.SERVER_URL_LOCAL, {
            query: { userId },
            transports: ['websocket']
        });

        socket.on('connect', () => console.log('Connected to WebSocket'));
        socket.on('notification', onNotificationReceived);

        return () => {
            socket.disconnect();
        };
    }, [userId, onNotificationReceived]);
};

export function useNotifications() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['notifications'],
        queryFn: getNotifications
    });
    if (error) {
        Toast.show({
            type: 'error',
            text1: 'Get notifications failed',
            text2: error.message,
            text2Style: { flexWrap: 'wrap' },
            position: 'top'
        });
    }

    return { isLoading, data, error };
}

export function useNotification(notificationId: number) {
    const { data, isLoading, error } = useQuery({
        queryKey: [`notifications-${notificationId}`, notificationId],
        queryFn: () => getNotificationDetails(notificationId)
    });
    if (error) {
        Toast.show({
            type: 'error',
            text1: 'Get notification details failed',
            text2: error.message,
            text2Style: { flexWrap: 'wrap' },
            position: 'top'
        });
    }

    return { isLoading, data, error };
}

export function useMarkNotificationAsRead() {
    const queryClient = useQueryClient();

    const {
        mutate: markNotificationAsRead,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { notificationId: number }) => markNotificationAsReadApi(data.notificationId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: [`notifications-${variables.notificationId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Mark notification as read failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, markNotificationAsRead, error };
}

export function useDeleteNotification() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteNotification,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { notificationId: number }) => deleteNotificationApi(data.notificationId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.removeQueries({ queryKey: [`notifications-${variables.notificationId}`] });
        },
        onError: (err) =>
            Toast.show({
                type: 'error',
                text1: 'Delete notification failed',
                text2: err.message,
                text2Style: { flexWrap: 'wrap' },
                position: 'top'
            })
    });

    return { isPending, deleteNotification, error };
}
