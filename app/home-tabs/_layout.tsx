import { Icon } from '@rneui/base';
import { Tabs } from 'expo-router';

export default function HomeLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#60ABEF', tabBarInactiveTintColor: '#555' }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="trips"
                options={{
                    title: 'Trips',
                    tabBarIcon: ({ color, size }) => <Icon name="event" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: 'Account',
                    tabBarIcon: ({ color, size }) => <Icon name="person" size={size} color={color} />
                }}
            />
        </Tabs>
    );
}
