import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useUser } from '@/src/hooks/use-authenticate';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { user, isLoading } = useUser();
    useEffect(() => {
        if (!user && !isLoading) {
            router.navigate('/welcome');
        }
        if (user && !user.preferences && !isLoading) {
            router.navigate('/user-survey');
        }
    }, [user, isLoading]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#60ABEF" />
            </View>
        );
    }

    if (user && user.preferences) return children;
    return null;
}
