import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
                <Stack.Screen name="Auth">
                    {() => <AuthNavigator setIsLoggedIn={setIsLoggedIn} />}
                </Stack.Screen>
            ) : (
                <Stack.Screen name="AdminApp" component={AppNavigator} />
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;