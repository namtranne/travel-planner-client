import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Iconify from 'react-native-iconify';

import AccountStack from './account-stack';
import HomeScreen from './home';

const Tab = createBottomTabNavigator();

const TabIcon = ({ route, focused }: { route: any; focused: boolean }) => {
    let iconName: string = '';

    if (route.name === 'Home') {
        iconName = 'lets-icons:home';
    } else if (route.name === 'AccountStack') {
        iconName = 'iconamoon:profile-fill';
    } else if (route.name === 'Favorites') {
        iconName = 'hugeicons:location-favourite-01';
    } else if (route.name === 'Trips') {
        iconName = 'material-symbols:calendar-month';
    } else if (route.name === 'Notification') {
        iconName = 'mingcute:notification-line';
    }

    return <Iconify color={focused ? '#60ABEF' : 'gray'} icon={iconName} width="30" height="30" />;
};

export default function MainScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: (props) => <TabIcon route={route} {...props} />,
                headerShown: false
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Favorites" component={HomeScreen} />
            <Tab.Screen name="Trips" component={HomeScreen} />
            <Tab.Screen name="Notification" component={HomeScreen} />
            <Tab.Screen name="AccountStack" component={AccountStack} options={{ title: 'Account' }} />
        </Tab.Navigator>
    );
}
