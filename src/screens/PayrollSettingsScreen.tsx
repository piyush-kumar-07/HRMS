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

const PayrollSettingsScreen = ({ navigation }: any) => {
    const renderSettingItem = (
        icon: string,
        title: string,
        description: string,
        onPress: () => void,
    ) => {
        return (
            <TouchableOpacity
                style={styles.settingItem}
                activeOpacity={0.7}
                onPress={onPress}>
                <View style={styles.iconContainer}>
                    <MaterialIcons
                        name={icon as any}
                        size={22}
                        color="#2563EB"
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.itemTitle}>{title}</Text>

                    <Text style={styles.itemDescription}>
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
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color="#111827"
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Payroll Settings
                </Text>

                <View style={styles.headerSpace} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>

                {/* Intro */}
                <View style={styles.introCard}>
                    <View style={styles.introIcon}>
                        <MaterialIcons
                            name="settings"
                            size={24}
                            color="#2563EB"
                        />
                    </View>

                    <View style={styles.introContent}>
                        <Text style={styles.introTitle}>
                            Payroll Configuration
                        </Text>

                        <Text style={styles.introText}>
                            Define the rules and components that will be used
                            when processing employee payroll.
                        </Text>
                    </View>
                </View>

                {/* Salary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Salary
                    </Text>

                    <View style={styles.card}>
                        {renderSettingItem(
                            'payments',
                            'Salary Types',
                            'Configure monthly, daily and hourly salary structures.',
                            () => navigation.navigate('SalaryTypes'),
                        )}
                    </View>
                </View>

                {/* Earnings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Earnings
                    </Text>

                    <View style={styles.card}>
                        {renderSettingItem(
                            'add-circle-outline',
                            'Earnings',
                            'Configure basic salary, overtime, bonus and other income.',
                            () =>
                                navigation.navigate('PayrollEarnings'),
                        )}
                    </View>
                </View>

                {/* Deductions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Deductions
                    </Text>

                    <View style={styles.card}>
                        {renderSettingItem(
                            'remove-circle-outline',
                            'Deductions',
                            'Configure EPF/PF, ESIC, leave and other deductions.',
                            () =>
                                navigation.navigate('PayrollDeductions'),
                        )}
                    </View>
                </View>

                {/* Rules */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Payroll Rules
                    </Text>

                    <View style={styles.card}>
                        {renderSettingItem(
                            'access-time',
                            'Overtime Rules',
                            'Configure overtime hours, rates and calculation rules.',
                            () =>
                                navigation.navigate('OvertimeSettings'),
                        )}

                        <View style={styles.divider} />

                        {renderSettingItem(
                            'account-balance',
                            'EPF / PF Rules',
                            'Configure employee and employer PF contributions.',
                            () =>
                                navigation.navigate('EPFSettings'),
                        )}

                        <View style={styles.divider} />

                        {renderSettingItem(
                            'health-and-safety',
                            'ESIC Rules',
                            'Configure employee and employer ESIC contributions.',
                            () =>
                                navigation.navigate('ESICSettings'),
                        )}

                        <View style={styles.divider} />

                        {renderSettingItem(
                            'card-giftcard',
                            'Gratuity Rules',
                            'Configure gratuity as an employee benefit.',
                            () =>
                                navigation.navigate('GratuitySettings'),
                        )}
                    </View>
                </View>

                {/* Information */}
                <View style={styles.noteCard}>
                    <MaterialIcons
                        name="info-outline"
                        size={21}
                        color="#2563EB"
                    />

                    <Text style={styles.noteText}>
                        These settings define the payroll rules. Actual
                        employee salary processing will be handled separately
                        in the Payroll module.
                    </Text>
                </View>
            </ScrollView>
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
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerSpace: {
        width: 40,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },

    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },

    introCard: {
        flexDirection: 'row',
        backgroundColor: '#EFF6FF',
        borderWidth: 1,
        borderColor: '#DBEAFE',
        borderRadius: 12,
        padding: 14,
        marginBottom: 22,
    },

    introIcon: {
        width: 42,
        height: 42,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    introContent: {
        flex: 1,
    },

    introTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E3A8A',
        marginBottom: 4,
    },

    introText: {
        fontSize: 12,
        lineHeight: 18,
        color: '#475569',
    },

    section: {
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        overflow: 'hidden',
    },

    settingItem: {
        minHeight: 78,
        paddingHorizontal: 14,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconContainer: {
        width: 42,
        height: 42,
        borderRadius: 10,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    textContainer: {
        flex: 1,
        paddingRight: 8,
    },

    itemTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 3,
    },

    itemDescription: {
        fontSize: 12,
        lineHeight: 17,
        color: '#6B7280',
    },

    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginLeft: 68,
    },

    noteCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        padding: 13,
        marginTop: 2,
    },

    noteText: {
        flex: 1,
        fontSize: 12,
        lineHeight: 18,
        color: '#6B7280',
        marginLeft: 9,
    },
});

export default PayrollSettingsScreen;