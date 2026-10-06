import React, { useMemo, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useNavigation } from '@react-navigation/native';

import { employees } from './EmployeeScreen';

type Department = {
    id: string;
    name: string;
    description: string;
};



const DepartmentDetailsScreen = ({ route }: any) => {
    const navigation = useNavigation<any>();

    const { department } = route.params;

    const [search, setSearch] = useState('');

    const departmentEmployees = useMemo(() => {
        return employees.filter(
            employee =>
                employee.department.toLowerCase() === department.name.toLowerCase(),
        );
    }, [department.name]);

    const filteredEmployees = useMemo(() => {
        const searchText = search.toLowerCase().trim();

        if (!searchText) {
            return departmentEmployees;
        }

        return departmentEmployees.filter(
            employee =>
                employee.name.toLowerCase().includes(searchText) ||
                employee.id.toLowerCase().includes(searchText) ||
                employee.designation.toLowerCase().includes(searchText),
        );
    }, [departmentEmployees, search]);

    const getStatusColor = (status: string) => {
        if (status === 'present') {
            return '#16A34A';
        }

        if (status === 'leave') {
            return '#F59E0B';
        }

        return '#DC2626';
    };

    const renderEmployee = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.employeeCard}
            activeOpacity={0.7}
            onPress={() =>
                navigation.getParent()?.navigate('Employees', {
                    screen: 'EmployeeProfile',
                    params: {
                        employee: item,
                    },
                })
            }>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                    {item.name.charAt(0).toUpperCase()}
                </Text>
            </View>

            <View style={styles.employeeInfo}>
                <Text style={styles.employeeName}>{item.name}</Text>

                <Text style={styles.employeeId}>{item.id}</Text>

                <Text style={styles.employeeDesignation}>{item.designation}</Text>
            </View>

            <View style={styles.statusContainer}>
                <View
                    style={[
                        styles.statusDot,
                        {
                            backgroundColor: getStatusColor(item.status),
                        },
                    ]}
                />

                <Text style={styles.statusText}>
                    {item.status === 'leave'
                        ? 'On Leave'
                        : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
            </View>

            <MaterialIcons
                name="chevron-right"
                size={22}
                color="#9CA3AF"
            />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}>
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color="#111827"
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Department</Text>
            </View>

            <FlatList
                data={filteredEmployees}
                renderItem={renderEmployee}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={
                    <>
                        {/* Department Information */}
                        <View style={styles.departmentCard}>
                            <View style={styles.departmentIcon}>
                                <MaterialIcons
                                    name="business"
                                    size={30}
                                    color="#2563EB"
                                />
                            </View>

                            <View style={styles.departmentInfo}>
                                <Text style={styles.departmentName}>
                                    {department.name}
                                </Text>

                                <Text style={styles.departmentId}>
                                    {department.id}
                                </Text>

                                <Text style={styles.departmentDescription}>
                                    {department.description}
                                </Text>
                            </View>
                        </View>

                        {/* Employee Count */}
                        <View style={styles.employeeSummary}>
                            <View>
                                <Text style={styles.summaryTitle}>Employees</Text>

                                <Text style={styles.summaryCount}>
                                    {departmentEmployees.length}
                                </Text>
                            </View>

                            <MaterialIcons
                                name="people"
                                size={30}
                                color="#2563EB"
                            />
                        </View>

                        {/* Search */}
                        <View style={styles.searchContainer}>
                            <MaterialIcons
                                name="search"
                                size={20}
                                color="#6B7280"
                            />

                            <TextInput
                                style={styles.searchInput}
                                value={search}
                                onChangeText={setSearch}
                                placeholder="Search employee"
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>

                        <Text style={styles.sectionTitle}>
                            DEPARTMENT EMPLOYEES
                        </Text>
                    </>
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <MaterialIcons
                            name="people-outline"
                            size={42}
                            color="#9CA3AF"
                        />

                        <Text style={styles.emptyTitle}>
                            No employees found
                        </Text>

                        <Text style={styles.emptyDescription}>
                            No employees are assigned to this department.
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },

    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },

    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },

    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 30,
    },

    departmentCard: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#BBBDBF',
        borderRadius: 10,
        padding: 14,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },

    departmentIcon: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },

    departmentInfo: {
        flex: 1,
    },

    departmentName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },

    departmentId: {
        fontSize: 11,
        color: '#2563EB',
        marginTop: 2,
    },

    departmentDescription: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 5,
    },

    employeeSummary: {
        height: 70,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#BBBDBF',
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    summaryTitle: {
        fontSize: 11,
        color: '#6B7280',
    },

    summaryCount: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginTop: 2,
    },

    searchContainer: {
        height: 44,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        marginTop: 14,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },

    searchInput: {
        flex: 1,
        height: 42,
        marginLeft: 8,
        fontSize: 13,
        color: '#111827',
    },

    sectionTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: '#6B7280',
        marginTop: 20,
        marginBottom: 8,
        letterSpacing: 0.5,
    },

    employeeCard: {
        minHeight: 76,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#BBBDBF',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: 8,
    },

    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    avatarText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2563EB',
    },

    employeeInfo: {
        flex: 1,
    },

    employeeName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },

    employeeId: {
        fontSize: 10,
        color: '#2563EB',
        marginTop: 2,
    },

    employeeDesignation: {
        fontSize: 11,
        color: '#6B7280',
        marginTop: 3,
    },

    statusContainer: {
        alignItems: 'flex-end',
        marginRight: 8,
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginBottom: 4,
    },

    statusText: {
        fontSize: 10,
        color: '#2563EB',
    },

    emptyContainer: {
        alignItems: 'center',
        paddingTop: 60,
    },

    emptyTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#374151',
        marginTop: 12,
    },

    emptyDescription: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 4,
        textAlign: 'center',
    },
});

export default DepartmentDetailsScreen;