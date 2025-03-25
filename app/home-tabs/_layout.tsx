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
                    tabBarIcon: ({ color, size }) => (
                        <Iconify className={`text-${color}`} icon="lets-icons:home" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="trips"
                options={{
                    title: 'Trips',
                    tabBarIcon: ({ color, size }) => (
                        <Iconify
                            className={`text-${color}`}
                            icon="material-symbols:calendar-month"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: 'Account',
                    tabBarIcon: ({ color, size }) => (
                        <Iconify className={`text-${color}`} icon="iconamoon:profile-fill" size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    );
}
