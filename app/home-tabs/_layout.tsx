// @@iconify-code-gen

import { Tabs } from 'expo-router';
import Iconify from 'react-native-iconify';

export default function HomeLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Iconify icon="lets-icons:home" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: 'Account',
                    tabBarIcon: ({ color, size }) => <Iconify icon="iconamoon:profile-fill" size={size} color={color} />
                }}
            />
        </Tabs>
    );
}
