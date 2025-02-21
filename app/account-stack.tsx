import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AccountScreen from './account';
import ProfileScreen from './profile';

const Stack = createNativeStackNavigator();

export default function AccountStack() {
    return (
        <Stack.Navigator
            screenOptions={() => ({
                headerShown: false
            })}
        >
            <Stack.Screen name="AccountMain" component={AccountScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
}
