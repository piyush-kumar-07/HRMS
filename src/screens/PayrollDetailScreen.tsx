import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Pressable,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

type PayrollEmployee = {
    id: string;
    name: string;
    designation: string;
    department: string;
    salaryType: 'Monthly' | 'Daily' | 'Hourly';
    payableDays: number;
    netSalary: number;
    status: 'Processed' | 'Pending';
};

const PayrollDetailScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    const employee: PayrollEmployee = route.params?.employee;

    if (!employee) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>Employee not found</Text>

                    <Pressable
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>Go Back</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    // Prototype payroll values
    const baseSalary = employee.netSalary;
    const overtime = 0;
    const bonus = 0;
    const otherIncome = 0;

    const grossEarnings =
        baseSalary + overtime + bonus + otherIncome;

    const pf = 0;
    const esic = 0;
    const otherDeductions = 0;
    const leaveDeduction = 0;

    const totalDeductions =
        pf + esic + otherDeductions + leaveDeduction;

    const netPayable = grossEarnings - totalDeductions;

    const formatCurrency = (amount: number) => {
        return `₹${amount.toLocaleString('en-IN')}`;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}>

                {/* Header */}
                <View style={styles.header}>
                    <Pressable
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.backIcon}>‹</Text>
                    </Pressable>

                    <View style={styles.headerTextContainer}>
                        <Text style={styles.title}>Payroll Details</Text>
                        <Text style={styles.subtitle}>October 2026</Text>
                    </View>
                </View>

                {/* Employee Information */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        Employee Information
                    </Text>

                    <View style={styles.employeeHeader}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {employee.name.charAt(0)}
                            </Text>
                        </View>

                        <View style={styles.employeeInfo}>
                            <Text style={styles.employeeName}>
                                {employee.name}
                            </Text>

                            <Text style={styles.employeeId}>
                                {employee.id}
                            </Text>

                            <Text style={styles.employeeDesignation}>
                                {employee.designation}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoGrid}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Department</Text>
                            <Text style={styles.infoValue}>
                                {employee.department}
                            </Text>
                        </View>

                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Salary Type</Text>
                            <Text style={styles.infoValue}>
                                {employee.salaryType}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Attendance */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        Attendance & Payable Days
                    </Text>

                    <View style={styles.attendanceRow}>
                        <View>
                            <Text style={styles.infoLabel}>
                                Payable Days
                            </Text>

                            <Text style={styles.largeValue}>
                                {employee.payableDays}
                            </Text>
                        </View>

                        <View style={styles.attendanceDivider} />

                        <View>
                            <Text style={styles.infoLabel}>
                                Payroll Period
                            </Text>

                            <Text style={styles.infoValue}>
                                October 2026
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Salary */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        Salary
                    </Text>

                    <View style={styles.calculationRow}>
                        <Text style={styles.calculationLabel}>
                            Base Salary
                        </Text>

                        <Text style={styles.calculationValue}>
                            {formatCurrency(baseSalary)}
                        </Text>
                    </View>
                </View>

                {/* Earnings */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        Earnings
                    </Text>

                    <View style={styles.calculationRow}>
                        <Text style={styles.calculationLabel}>
                            Basic Salary
                        </Text>

                        <Text style={styles.calculationValue}>
                            {formatCurrency(baseSalary)}
                        </Text>
                    </View>

                    <View style={styles.calculationRow}>
                        <Text style={styles.calculationLabel}>
                            Overtime
                        </Text>

                        <Text style={styles.calculationValue}>
                            {formatCurrency(overtime)}
                        </Text>
                    </View>

                    <View style={styles.calculationRow}>
                        <Text style={styles.calculationLabel}>
                            Bonus
                        </Text>

                        <Text style={styles.calculationValue}>
                            {formatCurrency(bonus)}
                        </Text>
                    </View>

                    <View style={styles.calculationRow}>
                        <Text style={styles.calculationLabel}>
                            Other Income
                        </Text>

                        <Text style={styles.calculationValue}>
                            {formatCurrency(otherIncome)}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.calculationRow}>
                        <Text style={styles.totalLabel}>
                            Gross Earnings
                        </Text>

                        <Text style={styles.totalValue}>
                            {formatCurrency(grossEarnings)}
                        </Text>
                    </View>
                </View>

                {/* Deductions */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        Deductions
                    </Text>

                    <View style={styles.calculationRow}>
                        <Text style={styles.calculationLabel}>
                            EPF / PF
                        </Text>

                        <Text style={styles.calculationValue}>
                            {formatCurrency(pf)}
                        </Text>
                    </View>

                    <View style={styles.calculationRow}>
                        <Text style={styles.calculationLabel}>
                            ESIC
                        </Text>

                        <Text style={styles.calculationValue}>
                            {formatCurrency(esic)}
                        </Text>
                    </View>

                    <View style={styles.calculationRow}>
                        <Text style={styles.calculationLabel}>
                            Leave Deduction
                        </Text>

                        <Text style={styles.calculationValue}>
                            {formatCurrency(leaveDeduction)}
                        </Text>
                    </View>

                    <View style={styles.calculationRow}>
                        <Text style={styles.calculationLabel}>
                            Other Deductions
                        </Text>

                        <Text style={styles.calculationValue}>
                            {formatCurrency(otherDeductions)}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.calculationRow}>
                        <Text style={styles.totalLabel}>
                            Total Deductions
                        </Text>

                        <Text style={styles.totalValue}>
                            {formatCurrency(totalDeductions)}
                        </Text>
                    </View>
                </View>

                {/* Final Calculation */}
                <View style={styles.finalCard}>
                    <Text style={styles.finalTitle}>
                        Net Payable
                    </Text>

                    <Text style={styles.finalAmount}>
                        {formatCurrency(netPayable)}
                    </Text>

                    <Text style={styles.finalDescription}>
                        Gross Earnings − Total Deductions
                    </Text>
                </View>

                {/* Actions */}
                <View style={styles.actionsContainer}>
                    <Pressable
                        style={styles.reviewButton}
                        onPress={() => {
                            // Review functionality will be added later.
                        }}>
                        <Text style={styles.reviewButtonText}>
                            Review Payroll
                        </Text>
                    </Pressable>

                    <Pressable
                        style={styles.finalizeButton}
                        onPress={() => {
                            // Finalize functionality will be added later.
                        }}>
                        <Text style={styles.finalizeButtonText}>
                            Finalize Payroll
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PayrollDetailScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },

    container: {
        paddingHorizontal: 16,
        paddingBottom: 30,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 20,
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
    },

    backIcon: {
        fontSize: 32,
        lineHeight: 34,
        color: '#111827',
        marginTop: -3,
    },

    headerTextContainer: {
        marginLeft: 12,
    },

    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
    },

    subtitle: {
        marginTop: 3,
        fontSize: 13,
        color: '#6B7280',
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        padding: 16,
        marginBottom: 14,
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
    },

    employeeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#DBEAFE',
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarText: {
        fontSize: 21,
        fontWeight: '700',
        color: '#2563EB',
    },

    employeeInfo: {
        marginLeft: 12,
        flex: 1,
    },

    employeeName: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111827',
    },

    employeeId: {
        marginTop: 2,
        fontSize: 12,
        color: '#6B7280',
    },

    employeeDesignation: {
        marginTop: 4,
        fontSize: 13,
        color: '#374151',
    },

    infoGrid: {
        flexDirection: 'row',
        marginTop: 18,
    },

    infoItem: {
        flex: 1,
    },

    infoLabel: {
        fontSize: 11,
        color: '#9CA3AF',
    },

    infoValue: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
    },

    attendanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    attendanceDivider: {
        width: 1,
        height: 45,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 30,
    },

    largeValue: {
        marginTop: 4,
        fontSize: 22,
        fontWeight: '700',
        color: '#2563EB',
    },

    calculationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 13,
    },

    calculationLabel: {
        fontSize: 13,
        color: '#4B5563',
    },

    calculationValue: {
        fontSize: 13,
        fontWeight: '600',
        color: '#111827',
    },

    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 5,
    },

    totalLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111827',
    },

    totalValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2563EB',
    },

    finalCard: {
        backgroundColor: '#EFF6FF',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#BFDBFE',
        padding: 20,
        alignItems: 'center',
        marginBottom: 18,
    },

    finalTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
    },

    finalAmount: {
        marginTop: 6,
        fontSize: 30,
        fontWeight: '800',
        color: '#2563EB',
    },

    finalDescription: {
        marginTop: 5,
        fontSize: 12,
        color: '#6B7280',
    },

    actionsContainer: {
        gap: 10,
    },

    reviewButton: {
        height: 50,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
    },

    reviewButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#2563EB',
    },

    finalizeButton: {
        height: 50,
        borderRadius: 12,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
    },

    finalizeButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
    },

    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
    },

    backButtonText: {
        color: '#2563EB',
        fontSize: 14,
        fontWeight: '600',
    },
});