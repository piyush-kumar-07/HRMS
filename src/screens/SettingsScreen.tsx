import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
    const navigation = useNavigation<any>();

    const renderSetting = (
        icon: any,
        title: string,
        description: string,
        screen: string,
    ) => {
        return (
            <TouchableOpacity
                style={styles.settingCard}
                onPress={() => navigation.navigate(screen)}
                activeOpacity={0.7}>

                <View style={styles.iconContainer}>
                    <MaterialIcons
                        name={icon}
                        size={22}
                        color="#2563EB"
                    />
                </View>

                <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>{title}</Text>
                    <Text style={styles.settingDescription}>
                        {description}
                    </Text>
                </View>

                <MaterialIcons
                    name="chevron-right"
                    size={24}
                    color="#9CA3AF"
                />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>

                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Settings</Text>

                    <Text style={styles.headerSubtitle}>
                        Manage your organization and application
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>
                    ORGANIZATION
                </Text>

                {renderSetting(
                    'business',
                    'Organization',
                    'Manage company information and contact details',
                    'OrganizationSettings',
                )}

                <Text style={styles.sectionTitle}>
                    MANAGEMENT
                </Text>

                {renderSetting(
                    'groups',
                    'Departments',
                    'Create and manage company departments',
                    'DepartmentsSettings',
                )}

                {renderSetting(
                    'admin-panel-settings',
                    'Users & Permissions',
                    'Manage admin users, roles and permissions',
                    'UsersPermissions',
                )}

                <Text style={styles.sectionTitle}>
                    PAYROLL
                </Text>

                {renderSetting(
                    'payments',
                    'Payroll Settings',
                    'Configure salary, earnings and deductions',
                    'PayrollSettings',
                )}

                <Text style={styles.sectionTitle}>
                    GENERAL
                </Text>

                {renderSetting(
                    'settings',
                    'General Settings',
                    'Manage application preferences',
                    'GeneralSettings',
                )}

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },

    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 30,

    },

    header: {
        marginBottom: 24,
    },

    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        marginTop: 20,
    },

    headerSubtitle: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 4,
    },

    sectionTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: '#6B7280',
        marginBottom: 8,
        marginTop: 16,
        letterSpacing: 0.5,
    },

    settingCard: {
        minHeight: 70,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#BBBDBF',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: 8,
    },

    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    settingContent: {
        flex: 1,
    },

    settingTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },

    settingDescription: {
        fontSize: 11,
        color: '#6B7280',
        marginTop: 3,
    },
});

export default SettingsScreen;