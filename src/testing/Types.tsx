import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
type Employee = {
    name: string;
    employeeId: string;
    salary: number;
    phone: string;
    isPresent: boolean;
}
const employee: Employee = {
    name: 'Rahul Kumar',
    employeeId: 'EMP001',
    salary: 25000,
    isPresent: true,
    phone: '1234567890',
};
export default function EmployeeCard() {
    return (
        <View style={styles.card}>
            <Text style={styles.Heading}>{employee.name}</Text>
            <Text>{employee.employeeId}</Text>
            <Text>{employee.salary}</Text>
            <Text>{employee.phone}</Text>
            <Text>{employee.isPresent}</Text>
        </View>

    );

}
const styles = StyleSheet.create({
    Heading: {
        fontSize: 22,

    },
    card: {
        padding: 4,
    },
})