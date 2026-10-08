import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ActiveRequestsScreen from '../screens/ActiveRequestsScreen';

const Stack = createNativeStackNavigator();

const DashboardNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />

            <Stack.Screen
                name="ActiveRequests"
                component={ActiveRequestsScreen}
            />
        </Stack.Navigator>
    );
};

export default DashboardNavigator;