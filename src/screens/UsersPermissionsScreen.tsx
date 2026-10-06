import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import MaterialIcons from '@react-native-vector-icons/material-icons';

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'Active' | 'Inactive';
};

const UsersPermissionsScreen = ({ navigation }: any) => {
    const [activeSection, setActiveSection] = useState<
        'users' | 'roles' | 'permissions'
    >('users');

    const [users, setUsers] = useState<User[]>([
        {
            id: 'USR001',
            name: 'Main Administrator',
            email: 'admin@barcsecurity.com',
            role: 'Super Admin',
            status: 'Active',
        },
        {
            id: 'USR002',
            name: 'HR Manager',
            email: 'hr@barcsecurity.com',
            role: 'HR Manager',
            status: 'Active',
        },
        {
            id: 'USR003',
            name: 'Office Admin',
            email: 'office@barcsecurity.com',
            role: 'Admin',
            status: 'Inactive',
        },
    ]);

    const roles = [
        {
            id: 'ROLE001',
            name: 'Super Admin',
            description: 'Full access to all HRMS modules and settings.',
        },
        {
            id: 'ROLE002',
            name: 'Admin',
            description: 'Access to employee and operational management.',
        },
        {
            id: 'ROLE003',
            name: 'HR Manager',
            description: 'Access to employees, recruitment and HR operations.',
        },
    ];

    const permissions = [
        {
            id: 'PER001',
            name: 'Dashboard',
            description: 'View dashboard and attendance overview.',
        },
        {
            id: 'PER002',
            name: 'Employees',
            description: 'View and manage employee information.',
        },
        {
            id: 'PER003',
            name: 'Recruitment',
            description: 'Manage candidates and recruitment workflow.',
        },
        {
            id: 'PER004',
            name: 'Attendance',
            description: 'View and manage employee attendance.',
        },
        {
            id: 'PER005',
            name: 'Payroll',
            description: 'Manage payroll and salary information.',
        },
        {
            id: 'PER006',
            name: 'Settings',
            description: 'Manage organization and system settings.',
        },
    ];

    const handleToggleUser = (user: User) => {
        const newStatus =
            user.status === 'Active' ? 'Inactive' : 'Active';

        Alert.alert(
            'Change User Status',
            `Are you sure you want to make ${user.name} ${newStatus.toLowerCase()}?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        setUsers(currentUsers =>
                            currentUsers.map(item =>
                                item.id === user.id
                                    ? { ...item, status: newStatus }
                                    : item,
                            ),
                        );
                    },
                },
            ],
        );
    };

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

                <View>
                    <Text style={styles.headerTitle}>
                        Users & Permissions
                    </Text>

                    <Text style={styles.headerSubtitle}>
                        Manage system access
                    </Text>
                </View>
            </View>

            {/* Section Switch */}
            <View style={styles.sectionSwitch}>
                <TouchableOpacity
                    style={[
                        styles.sectionButton,
                        activeSection === 'users' &&
                        styles.activeSectionButton,
                    ]}
                    onPress={() => setActiveSection('users')}>
                    <MaterialIcons
                        name="people"
                        size={18}
                        color={
                            activeSection === 'users'
                                ? '#2563EB'
                                : '#6B7280'
                        }
                    />

                    <Text
                        style={[
                            styles.sectionButtonText,
                            activeSection === 'users' &&
                            styles.activeSectionButtonText,
                        ]}>
                        Users
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.sectionButton,
                        activeSection === 'roles' &&
                        styles.activeSectionButton,
                    ]}
                    onPress={() => setActiveSection('roles')}>
                    <MaterialIcons
                        name="admin-panel-settings"
                        size={18}
                        color={
                            activeSection === 'roles'
                                ? '#2563EB'
                                : '#6B7280'
                        }
                    />

                    <Text
                        style={[
                            styles.sectionButtonText,
                            activeSection === 'roles' &&
                            styles.activeSectionButtonText,
                        ]}>
                        Roles
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.sectionButton,
                        activeSection === 'permissions' &&
                        styles.activeSectionButton,
                    ]}
                    onPress={() => setActiveSection('permissions')}>
                    <MaterialIcons
                        name="security"
                        size={18}
                        color={
                            activeSection === 'permissions'
                                ? '#2563EB'
                                : '#6B7280'
                        }
                    />

                    <Text
                        style={[
                            styles.sectionButtonText,
                            activeSection === 'permissions' &&
                            styles.activeSectionButtonText,
                        ]}>
                        Permissions
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Users */}
            {activeSection === 'users' && (
                <View style={styles.content}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>
                                ADMIN USERS
                            </Text>

                            <Text style={styles.sectionDescription}>
                                Manage people who can access the HRMS.
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() =>
                                Alert.alert(
                                    'Add User',
                                    'User creation will be connected to the authentication system later.',
                                )
                            }>
                            <MaterialIcons
                                name="add"
                                size={20}
                                color="#FFFFFF"
                            />

                            <Text style={styles.addButtonText}>
                                Add
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {users.map(user => (
                        <View
                            key={user.id}
                            style={styles.card}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>
                                    {user.name.charAt(0)}
                                </Text>
                            </View>

                            <View style={styles.cardInfo}>
                                <Text style={styles.cardTitle}>
                                    {user.name}
                                </Text>

                                <Text style={styles.cardSubtitle}>
                                    {user.email}
                                </Text>

                                <Text style={styles.roleText}>
                                    {user.role}
                                </Text>
                            </View>

                            <View style={styles.cardRight}>
                                <View
                                    style={[
                                        styles.statusBadge,
                                        user.status === 'Active'
                                            ? styles.activeBadge
                                            : styles.inactiveBadge,
                                    ]}>
                                    <Text
                                        style={[
                                            styles.statusBadgeText,
                                            user.status === 'Active'
                                                ? styles.activeText
                                                : styles.inactiveText,
                                        ]}>
                                        {user.status}
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.moreButton}
                                    onPress={() => handleToggleUser(user)}>
                                    <MaterialIcons
                                        name="more-vert"
                                        size={22}
                                        color="#6B7280"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            )}

            {/* Roles */}
            {activeSection === 'roles' && (
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>
                        ROLES
                    </Text>

                    <Text style={styles.sectionDescription}>
                        Roles define the level of access available to a user.
                    </Text>

                    {roles.map(role => (
                        <TouchableOpacity
                            key={role.id}
                            style={styles.card}
                            activeOpacity={0.7}
                            onPress={() =>
                                Alert.alert(
                                    role.name,
                                    'Role permission management will be implemented here.',
                                )
                            }>
                            <View style={styles.iconBox}>
                                <MaterialIcons
                                    name="admin-panel-settings"
                                    size={24}
                                    color="#2563EB"
                                />
                            </View>

                            <View style={styles.cardInfo}>
                                <Text style={styles.cardTitle}>
                                    {role.name}
                                </Text>

                                <Text style={styles.cardSubtitle}>
                                    {role.description}
                                </Text>
                            </View>

                            <MaterialIcons
                                name="chevron-right"
                                size={22}
                                color="#9CA3AF"
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {/* Permissions */}
            {activeSection === 'permissions' && (
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>
                        SYSTEM PERMISSIONS
                    </Text>

                    <Text style={styles.sectionDescription}>
                        These permissions control access to different HRMS modules.
                    </Text>

                    {permissions.map(permission => (
                        <View
                            key={permission.id}
                            style={styles.card}>
                            <View style={styles.iconBox}>
                                <MaterialIcons
                                    name="security"
                                    size={24}
                                    color="#2563EB"
                                />
                            </View>

                            <View style={styles.cardInfo}>
                                <Text style={styles.cardTitle}>
                                    {permission.name}
                                </Text>

                                <Text style={styles.cardSubtitle}>
                                    {permission.description}
                                </Text>
                            </View>

                            <MaterialIcons
                                name="chevron-right"
                                size={22}
                                color="#9CA3AF"
                            />
                        </View>
                    ))}
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },

    header: {
        height: 72,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
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

    headerSubtitle: {
        fontSize: 11,
        color: '#6B7280',
        marginTop: 2,
    },

    sectionSwitch: {
        height: 48,
        backgroundColor: '#EAEFF7',
        borderRadius: 10,
        marginHorizontal: 16,
        marginTop: 16,
        padding: 4,
        flexDirection: 'row',
    },

    sectionButton: {
        flex: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5,
    },

    activeSectionButton: {
        backgroundColor: '#FFFFFF',
    },

    sectionButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6B7280',
    },

    activeSectionButtonText: {
        color: '#2563EB',
    },

    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: '#6B7280',
        letterSpacing: 0.5,
    },

    sectionDescription: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 4,
        marginBottom: 12,
    },

    addButton: {
        height: 36,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#2563EB',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    addButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#FFFFFF',
    },

    card: {
        minHeight: 76,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#BBBDBF',
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
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

    iconBox: {
        width: 42,
        height: 42,
        borderRadius: 10,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    cardInfo: {
        flex: 1,
    },

    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },

    cardSubtitle: {
        fontSize: 11,
        color: '#6B7280',
        marginTop: 3,
        lineHeight: 16,
    },

    roleText: {
        fontSize: 11,
        color: '#2563EB',
        marginTop: 4,
        fontWeight: '600',
    },

    cardRight: {
        alignItems: 'flex-end',
        marginLeft: 8,
    },

    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },

    activeBadge: {
        backgroundColor: '#DCFCE7',
    },

    inactiveBadge: {
        backgroundColor: '#FEE2E2',
    },

    statusBadgeText: {
        fontSize: 9,
        fontWeight: '600',
    },

    activeText: {
        color: '#16A34A',
    },

    inactiveText: {
        color: '#DC2626',
    },

    moreButton: {
        marginTop: 5,
        padding: 2,
    },
});

export default UsersPermissionsScreen;