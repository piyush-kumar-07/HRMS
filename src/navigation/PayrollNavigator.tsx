import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PayrollScreen from '../screens/PayrollScreen';

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
        </Stack.Navigator>
    );
};

export default PayrollNavigator;