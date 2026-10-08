import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ActiveRequestsScreen from '../screens/ActiveRequestsScreen';
import RequestDetailsScreen from '../screens/RequestDetailScreen';

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

            <Stack.Screen
                name="RequestDetails"
                component={RequestDetailsScreen}
            />
        </Stack.Navigator>
    );
};

export default DashboardNavigator;