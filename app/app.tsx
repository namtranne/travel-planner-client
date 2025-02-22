import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProtectedRoute from '@/src/components/Auth/ProtectedRoute';

import ChangePasswordScreen from './change-password';
import ForgotPassword from './forgot-password';
import MainScreen from './main-screen';
import OTPVerification from './otp-verification';
import ResetPassword from './reset-password';
import SignIn from './sign-in';
import SignUp from './sign-up';
import Welcome from './welcome';

const Stack = createNativeStackNavigator();
const MainScreenWrapper = () => (
    <ProtectedRoute>
        <MainScreen />
    </ProtectedRoute>
);

const App = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainScreen" component={MainScreenWrapper} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            <Stack.Screen name="OtpVerification" component={OTPVerification} />
        </Stack.Navigator>
    );
};
export default App;
