import { Icon } from '@rneui/base';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function HomeLayout() {
    const { t } = useTranslation();

    return (
        <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#60ABEF', tabBarInactiveTintColor: '#555' }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: t('Home'),
                    tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="trips"
                options={{
                    title: t('Trips'),
                    tabBarIcon: ({ color, size }) => <Icon name="event" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="notifications"
                options={{
                    title: t('Notifications'),
                    tabBarIcon: ({ color, size }) => <Icon name="notifications" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: t('Account'),
                    tabBarIcon: ({ color, size }) => <Icon name="person" size={size} color={color} />
                }}
            />
        </Tabs>
    );
}
