import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../../screens/Login/LoginScreen';
import { Layout } from '../Layout/Layout';
import { AuthContext } from './AuthContext/AuthContext';

export type AuthStackParamList = {
    Login: undefined;
    Main: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthProvider = () => {
    return (
        <AuthContext>
            <NavigationContainer>
                <AuthStack.Navigator
                    initialRouteName="Login"
                    screenOptions={{ headerShown: false }}
                >
                    <AuthStack.Screen
                        name="Login"
                        component={LoginScreen}
                    />
                    <AuthStack.Screen
                        name="Main"
                        component={Layout}
                    />
                </AuthStack.Navigator>
            </NavigationContainer>
        </AuthContext>
    );
};
