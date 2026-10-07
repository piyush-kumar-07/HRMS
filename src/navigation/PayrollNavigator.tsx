import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PayrollScreen from '../screens/PayrollScreen';
import PayrollDetailScreen from '../screens/PayrollDetailScreen';

const Stack = createNativeStackNavigator();

const PayrollNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="PayrollHome"
                component={PayrollScreen}
            />

            <Stack.Screen
                name="PayrollDetails"
                component={PayrollDetailScreen}
            />
        </Stack.Navigator>
    );
};

export default PayrollNavigator;