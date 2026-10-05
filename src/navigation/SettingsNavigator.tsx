import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '../screens/SettingsScreen';
import OrganizationSettingsScreen from '../screens/OrganizationSettingsScreen';
import DepartmentsSettingsScreen from '../screens/DepartmentsSettingsScreen';
import UsersPermissionsScreen from '../screens/UsersPermissionsScreen';
import PayrollSettingsScreen from '../screens/PayrollSettingsScreen';
import GeneralSettingsScreen from '../screens/GeneralSettingsScreen';

const Stack = createNativeStackNavigator();

const SettingsNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="SettingsHome"
            screenOptions={{
                headerShown: false,
            }}>

            <Stack.Screen
                name="SettingsHome"
                component={SettingsScreen}
            />

            <Stack.Screen
                name="OrganizationSettings"
                component={OrganizationSettingsScreen}
            />

            <Stack.Screen
                name="DepartmentsSettings"
                component={DepartmentsSettingsScreen}
            />

            <Stack.Screen
                name="UsersPermissions"
                component={UsersPermissionsScreen}
            />

            <Stack.Screen
                name="PayrollSettings"
                component={PayrollSettingsScreen}
            />

            <Stack.Screen
                name="GeneralSettings"
                component={GeneralSettingsScreen}
            />

        </Stack.Navigator>
    );
};

export default SettingsNavigator;