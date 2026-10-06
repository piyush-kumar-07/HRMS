import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

const SalaryTypesScreen = ({ navigation }: any) => {
    const [monthlyEnabled, setMonthlyEnabled] = useState(true);
    const [dailyEnabled, setDailyEnabled] = useState(true);
    const [hourlyEnabled, setHourlyEnabled] = useState(true);

    const [monthDays, setMonthDays] = useState('30');

    const [monthlyWorkingDays, setMonthlyWorkingDays] = useState(true);
    const [monthlyPayableDays, setMonthlyPayableDays] = useState(true);

    const [dailyPayableDays, setDailyPayableDays] = useState(true);

    const [hourlyPayableHours, setHourlyPayableHours] = useState(true);

    const handleSave = () => {
        Alert.alert(
            'Save Salary Type Settings',
            'Are you sure you want to save these salary type settings?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Save',
                    onPress: () => {
                        Alert.alert(
                            'Saved',
                            'Salary type settings have been saved successfully.',
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
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color="#111827"
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Salary Types</Text>

                <View style={styles.headerSpace} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>

                {/* Information */}
                <View style={styles.infoCard}>
                    <View style={styles.infoIcon}>
                        <MaterialIcons
                            name="payments"
                            size={23}
                            color="#2563EB"
                        />
                    </View>

                    <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>
                            Salary Structure
                        </Text>

                        <Text style={styles.infoText}>
                            Configure which salary types are available for
                            employees and define the rules used during payroll
                            calculation.
                        </Text>
                    </View>
                </View>

                {/* Monthly Salary */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>
                                Monthly Salary
                            </Text>

                            <Text style={styles.sectionDescription}>
                                Salary calculated using monthly salary and payable
                                days.
                            </Text>
                        </View>

                        <Switch
                            value={monthlyEnabled}
                            onValueChange={setMonthlyEnabled}
                            trackColor={{
                                false: '#D1D5DB',
                                true: '#93C5FD',
                            }}
                            thumbColor={
                                monthlyEnabled ? '#2563EB' : '#F3F4F6'
                            }
                        />
                    </View>

                    {monthlyEnabled && (
                        <View style={styles.card}>
                            <Text style={styles.fieldLabel}>
                                Default Month Days
                            </Text>

                            <TextInput
                                value={monthDays}
                                onChangeText={setMonthDays}
                                keyboardType="numeric"
                                placeholder="Example: 30"
                                placeholderTextColor="#9CA3AF"
                                style={styles.input}
                            />

                            <Text style={styles.helperText}>
                                This is the number of days used as the denominator
                                for monthly salary calculation.
                            </Text>

                            <View style={styles.divider} />

                            <View style={styles.ruleRow}>
                                <View style={styles.ruleContent}>
                                    <Text style={styles.ruleTitle}>
                                        Working Days
                                    </Text>

                                    <Text style={styles.ruleDescription}>
                                        Allow working days to be considered during
                                        monthly payroll calculation.
                                    </Text>
                                </View>

                                <Switch
                                    value={monthlyWorkingDays}
                                    onValueChange={setMonthlyWorkingDays}
                                    trackColor={{
                                        false: '#D1D5DB',
                                        true: '#93C5FD',
                                    }}
                                    thumbColor={
                                        monthlyWorkingDays
                                            ? '#2563EB'
                                            : '#F3F4F6'
                                    }
                                />
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.ruleRow}>
                                <View style={styles.ruleContent}>
                                    <Text style={styles.ruleTitle}>
                                        Payable Days
                                    </Text>

                                    <Text style={styles.ruleDescription}>
                                        Allow payable days to be entered or calculated
                                        separately from working days.
                                    </Text>
                                </View>

                                <Switch
                                    value={monthlyPayableDays}
                                    onValueChange={setMonthlyPayableDays}
                                    trackColor={{
                                        false: '#D1D5DB',
                                        true: '#93C5FD',
                                    }}
                                    thumbColor={
                                        monthlyPayableDays
                                            ? '#2563EB'
                                            : '#F3F4F6'
                                    }
                                />
                            </View>

                            <View style={styles.formulaBox}>
                                <Text style={styles.formulaTitle}>
                                    Monthly Salary Formula
                                </Text>

                                <Text style={styles.formulaText}>
                                    Monthly Salary ÷ Month Days × Working Days
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Daily Salary */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>
                                Daily Salary
                            </Text>

                            <Text style={styles.sectionDescription}>
                                Salary calculated using a daily rate.
                            </Text>
                        </View>

                        <Switch
                            value={dailyEnabled}
                            onValueChange={setDailyEnabled}
                            trackColor={{
                                false: '#D1D5DB',
                                true: '#93C5FD',
                            }}
                            thumbColor={
                                dailyEnabled ? '#2563EB' : '#F3F4F6'
                            }
                        />
                    </View>

                    {dailyEnabled && (
                        <View style={styles.card}>
                            <Text style={styles.fieldLabel}>
                                Payable Days
                            </Text>

                            <View style={styles.ruleRow}>
                                <View style={styles.ruleContent}>
                                    <Text style={styles.ruleTitle}>
                                        Use Payable Days
                                    </Text>

                                    <Text style={styles.ruleDescription}>
                                        Calculate salary using the employee's payable
                                        days.
                                    </Text>
                                </View>

                                <Switch
                                    value={dailyPayableDays}
                                    onValueChange={setDailyPayableDays}
                                    trackColor={{
                                        false: '#D1D5DB',
                                        true: '#93C5FD',
                                    }}
                                    thumbColor={
                                        dailyPayableDays
                                            ? '#2563EB'
                                            : '#F3F4F6'
                                    }
                                />
                            </View>

                            <View style={styles.formulaBox}>
                                <Text style={styles.formulaTitle}>
                                    Daily Salary Formula
                                </Text>

                                <Text style={styles.formulaText}>
                                    Daily Rate × Payable Days
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Hourly Salary */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>
                                Hourly Salary
                            </Text>

                            <Text style={styles.sectionDescription}>
                                Salary calculated using payable working hours.
                            </Text>
                        </View>

                        <Switch
                            value={hourlyEnabled}
                            onValueChange={setHourlyEnabled}
                            trackColor={{
                                false: '#D1D5DB',
                                true: '#93C5FD',
                            }}
                            thumbColor={
                                hourlyEnabled ? '#2563EB' : '#F3F4F6'
                            }
                        />
                    </View>

                    {hourlyEnabled && (
                        <View style={styles.card}>
                            <Text style={styles.fieldLabel}>
                                Payable Hours
                            </Text>

                            <View style={styles.ruleRow}>
                                <View style={styles.ruleContent}>
                                    <Text style={styles.ruleTitle}>
                                        Use Payable Hours
                                    </Text>

                                    <Text style={styles.ruleDescription}>
                                        Calculate salary using the employee's total
                                        payable hours.
                                    </Text>
                                </View>

                                <Switch
                                    value={hourlyPayableHours}
                                    onValueChange={setHourlyPayableHours}
                                    trackColor={{
                                        false: '#D1D5DB',
                                        true: '#93C5FD',
                                    }}
                                    thumbColor={
                                        hourlyPayableHours
                                            ? '#2563EB'
                                            : '#F3F4F6'
                                    }
                                />
                            </View>

                            <View style={styles.formulaBox}>
                                <Text style={styles.formulaTitle}>
                                    Hourly Salary Formula
                                </Text>

                                <Text style={styles.formulaText}>
                                    Hourly Rate × Total Payable Hours
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Important Note */}
                <View style={styles.noteCard}>
                    <MaterialIcons
                        name="info-outline"
                        size={21}
                        color="#2563EB"
                    />

                    <Text style={styles.noteText}>
                        Salary type settings define the calculation structure.
                        Individual employee salary rates will be configured
                        separately when managing employee payroll information.
                    </Text>
                </View>

                {/* Save */}
                <TouchableOpacity
                    style={styles.saveButton}
                    activeOpacity={0.8}
                    onPress={handleSave}>
                    <MaterialIcons
                        name="save"
                        size={21}
                        color="#FFFFFF"
                    />

                    <Text style={styles.saveButtonText}>
                        Save Salary Type Settings
                    </Text>
                </TouchableOpacity>
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

    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#EFF6FF',
        borderWidth: 1,
        borderColor: '#DBEAFE',
        borderRadius: 12,
        padding: 14,
        marginBottom: 22,
    },

    infoIcon: {
        width: 42,
        height: 42,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    infoContent: {
        flex: 1,
    },

    infoTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E3A8A',
        marginBottom: 4,
    },

    infoText: {
        fontSize: 12,
        lineHeight: 18,
        color: '#475569',
    },

    section: {
        marginBottom: 22,
    },

    sectionHeader: {
        minHeight: 64,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 11,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },

    sectionDescription: {
        fontSize: 12,
        lineHeight: 17,
        color: '#6B7280',
        marginTop: 3,
        maxWidth: 270,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 14,
    },

    fieldLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 7,
    },

    input: {
        height: 46,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 14,
        color: '#111827',
        backgroundColor: '#FFFFFF',
    },

    helperText: {
        fontSize: 11,
        lineHeight: 16,
        color: '#6B7280',
        marginTop: 6,
    },

    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 14,
    },

    ruleRow: {
        minHeight: 62,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    ruleContent: {
        flex: 1,
        paddingRight: 10,
    },

    ruleTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 3,
    },

    ruleDescription: {
        fontSize: 12,
        lineHeight: 17,
        color: '#6B7280',
    },

    formulaBox: {
        backgroundColor: '#F8FAFC',
        borderRadius: 8,
        padding: 12,
        marginTop: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },

    formulaTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#475569',
        marginBottom: 5,
    },

    formulaText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#111827',
    },

    noteCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        padding: 13,
        marginBottom: 18,
    },

    noteText: {
        flex: 1,
        fontSize: 12,
        lineHeight: 18,
        color: '#6B7280',
        marginLeft: 9,
    },

    saveButton: {
        height: 52,
        borderRadius: 10,
        backgroundColor: '#2563EB',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },

    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
        marginLeft: 8,
    },
});

export default SalaryTypesScreen;