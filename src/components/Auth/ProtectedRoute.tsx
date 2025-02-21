import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useUser } from '@/src/hooks/use-authenticate';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { user, isLoading } = useUser();
    const navigation = useNavigation();

    useEffect(() => {
        if (!user && !isLoading) {
            navigation.navigate('Welcome' as never);
        }
    }, [user, isLoading, navigation]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#60ABEF" />
            </View>
        );
    }

    if (user) return children;
    return null;
}
