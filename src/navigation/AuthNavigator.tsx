import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreens';

const Stack = createNativeStackNavigator();

type AuthNavigatorProps = {
    setIsLoggedIn: (value: boolean) => void;
};

const AuthNavigator = ({ setIsLoggedIn }: AuthNavigatorProps) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login">
                {props => (
                    <LoginScreen
                        {...props}
                        setIsLoggedIn={setIsLoggedIn}
                    />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default AuthNavigator;