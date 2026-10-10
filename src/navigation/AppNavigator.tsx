import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialIcons from '@react-native-vector-icons/material-icons';

import DashboardNavigator from './DashboardNavigator';
import EmployeeNavigator from './EmployeeNavigator';
import PayrollNavigator from './PayrollNavigator';
import SettingsNavigator from './SettingsNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarActiveTintColor: '#2d69ea',
                tabBarInactiveTintColor: '#6B7280',

                tabBarShowLabel: true,

                tabBarStyle: {


                    left: 16,



                    height: 72,

                    backgroundColor: '#FFFFFF',

                    borderRadius: 70,

                    borderTopWidth: 0,

                    paddingHorizontal: 8,
                    paddingTop: 6,
                    paddingBottom: 8,

                    elevation: 15,

                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.12,
                    shadowRadius: 10,
                },

                tabBarItemStyle: {
                    borderRadius: 18,
                    marginHorizontal: 3,
                    marginVertical: 3,

                    justifyContent: 'center',
                    alignItems: 'center',
                },

                tabBarActiveBackgroundColor: '#deeafb',

                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: 2,
                },

                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Dashboard') {
                        return (
                            <MaterialIcons
                                name="dashboard"
                                size={23}
                                color={color}
                            />
                        );
                    }

                    if (route.name === 'Employees') {
                        return (
                            <MaterialIcons
                                name="people"
                                size={23}
                                color={color}
                            />
                        );
                    }

                    if (route.name === 'Payroll') {
                        return (
                            <MaterialIcons
                                name="payments"
                                size={23}
                                color={color}
                            />
                        );
                    }

                    if (route.name === 'Settings') {
                        return (
                            <MaterialIcons
                                name="settings"
                                size={23}
                                color={color}
                            />
                        );
                    }

                    return null;
                },
            })}>

            <Tab.Screen
                name="Dashboard"
                component={DashboardNavigator}
            />

            <Tab.Screen
                name="Employees"
                component={EmployeeNavigator}
            />

            <Tab.Screen
                name="Payroll"
                component={PayrollNavigator}
            />

            <Tab.Screen
                name="Settings"
                component={SettingsNavigator}
            />

        </Tab.Navigator>
    );
};

export default AppNavigator;