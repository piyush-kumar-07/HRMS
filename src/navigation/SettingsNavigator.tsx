import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '../screens/SettingsScreen';
import OrganizationSettingsScreen from '../screens/OrganizationSettingsScreen';
import DepartmentsSettingsScreen from '../screens/DepartmentsSettingsScreen';
import DepartmentDetailsScreen from '../screens/DepartmentDetailsScreen';
import DepartmentTransferScreen from '../screens/DepartmentTransferScreen';
import UsersPermissionsScreen from '../screens/UsersPermissionsScreen';
import PayrollSettingsScreen from '../screens/PayrollSettingsScreen';
import SalaryTypesScreen from '../screens/SalaryTypesScreen';
import PayrollEarningsScreen from '../screens/PayrollEarningScreen';
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
                name="DepartmentTransfer"
                component={DepartmentTransferScreen}
            />

            <Stack.Screen
                name="DepartmentDetails"
                component={DepartmentDetailsScreen}
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
                name="SalaryTypes"
                component={SalaryTypesScreen}
            />
            <Stack.Screen
                name="PayrollEarnings"
                component={PayrollEarningsScreen}
            />

            <Stack.Screen
                name="GeneralSettings"
                component={GeneralSettingsScreen}
            />
        </Stack.Navigator>
    );
};

export default SettingsNavigator;