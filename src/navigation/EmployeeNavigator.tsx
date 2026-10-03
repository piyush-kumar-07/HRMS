import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EmployeesScreen from '../screens/EmployeeScreen';
import EmployeeProfileScreen from '../screens/EmployeeProfileScreen';
import CandidateProfileScreen from '../screens/CandidateProfileScreen';

const Stack = createNativeStackNavigator();

const EmployeeNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name="EmployeeList"
                component={EmployeesScreen}
            />

            <Stack.Screen
                name="EmployeeProfile"
                component={EmployeeProfileScreen}
            />

            <Stack.Screen
                name="CandidateProfile"
                component={CandidateProfileScreen}
            />

        </Stack.Navigator>
    );
};

export default EmployeeNavigator;