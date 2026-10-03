import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import HomeScreen from '../screens/HomeScreen';

import SettingsScreen from '../screens/SettingsScreen';
import EmployeeNavigator from './EmployeeNavigator';
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarActiveTintColor: '#2563EB',
                tabBarInactiveTintColor: '#6B7280',

                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Dashboard') {
                        return (
                            <MaterialIcons
                                name="dashboard"
                                size={size}
                                color={color}
                            />
                        );
                    }

                    if (route.name === 'Employees') {
                        return (
                            <MaterialIcons
                                name="people"
                                size={size}
                                color={color}
                            />
                        );
                    }

                    return (
                        <MaterialIcons
                            name="settings"
                            size={size}
                            color={color}
                        />
                    );
                },
            })}>

            <Tab.Screen
                name="Dashboard"
                component={HomeScreen}
            />


            <Tab.Screen
                name="Employees"
                component={EmployeeNavigator}
            />

            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
            />

        </Tab.Navigator>
    );
};

export default AppNavigator;