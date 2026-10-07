import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    FlatList,
    Keyboard,
    Modal,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

type PayrollStatus = 'Processed' | 'Pending';

type PayrollEmployee = {
    id: string;
    name: string;
    designation: string;
    department: string;
    salaryType: 'Monthly' | 'Daily' | 'Hourly';
    payableDays: number;
    netSalary: number;
    status: PayrollStatus;
};

const payrollEmployees: PayrollEmployee[] = [
    {
        id: 'EMP001',
        name: 'Raj Kumar',
        designation: 'Security Supervisor',
        department: 'Security',
        salaryType: 'Monthly',
        payableDays: 26,
        netSalary: 26000,
        status: 'Processed',
    },
    {
        id: 'EMP002',
        name: 'Amit Sharma',
        designation: 'Security Guard',
        department: 'Security',
        salaryType: 'Monthly',
        payableDays: 27,
        netSalary: 27000,
        status: 'Processed',
    },
    {
        id: 'EMP003',
        name: 'Priya Singh',
        designation: 'Accountant',
        department: 'Accounts',
        salaryType: 'Monthly',
        payableDays: 25,
        netSalary: 25000,
        status: 'Pending',
    },
    {
        id: 'EMP004',
        name: 'Rahul Verma',
        designation: 'Security Guard',
        department: 'Security',
        salaryType: 'Daily',
        payableDays: 24,
        netSalary: 19200,
        status: 'Processed',
    },
    {
        id: 'EMP005',
        name: 'Neha Kumari',
        designation: 'Kitchen Staff',
        department: 'Kitchen',
        salaryType: 'Monthly',
        payableDays: 26,
        netSalary: 22000,
        status: 'Pending',
    },
    {
        id: 'EMP006',
        name: 'Vikash Kumar',
        designation: 'Helper',
        department: 'Kitchen',
        salaryType: 'Hourly',
        payableDays: 22,
        netSalary: 17600,
        status: 'Processed',
    },
];

const PayrollScreen = () => {
    const navigation = useNavigation<any>();

    // Payroll period
    const [selectedMonth, setSelectedMonth] = useState(9);
    const [selectedYear, setSelectedYear] = useState(2026);
    const [isPeriodPickerOpen, setIsPeriodPickerOpen] = useState(false);

    // Search
    const [search, setSearch] = useState('');

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const years = Array.from(
        { length: 11 },
        (_, index) => 2024 + index,
    );

    const selectedPeriod = `${months[selectedMonth]} ${selectedYear}`;

    const filteredEmployees = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        if (!searchText) {
            return payrollEmployees;
        }

        return payrollEmployees.filter(employee => {
            return (
                employee.name.toLowerCase().includes(searchText) ||
                employee.id.toLowerCase().includes(searchText) ||
                employee.designation.toLowerCase().includes(searchText) ||
                employee.department.toLowerCase().includes(searchText)
            );
        });
    }, [search]);

    const processedCount = payrollEmployees.filter(
        employee => employee.status === 'Processed',
    ).length;

    const pendingCount = payrollEmployees.filter(
        employee => employee.status === 'Pending',
    ).length;

    const totalNetPayroll = payrollEmployees
        .filter(employee => employee.status === 'Processed')
        .reduce(
            (total, employee) => total + employee.netSalary,
            0,
        );

    const formatCurrency = (amount: number) => {
        return `₹${amount.toLocaleString('en-IN')}`;
    };

    const renderEmployee = ({
        item,
    }: {
        item: PayrollEmployee;
    }) => {
        return (
            <Pressable
                style={({ pressed }) => [
                    styles.employeeCard,
                    pressed && styles.employeeCardPressed,
                ]}
                onPress={() => {
                    navigation.navigate('PayrollDetails', {
                        employee: item,
                    });
                }}>
                <View style={styles.employeeTopRow}>
                    <View style={styles.employeeInfo}>
                        <Text style={styles.employeeName}>
                            {item.name}
                        </Text>

                        <Text style={styles.employeeId}>
                            {item.id}
                        </Text>

                        <Text style={styles.employeeDesignation}>
                            {item.designation}
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.statusBadge,
                            item.status === 'Processed'
                                ? styles.processedBadge
                                : styles.pendingBadge,
                        ]}>
                        <Text
                            style={[
                                styles.statusText,
                                item.status === 'Processed'
                                    ? styles.processedText
                                    : styles.pendingText,
                            ]}>
                            {item.status}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.employeeBottomRow}>
                    <View>
                        <Text style={styles.detailLabel}>
                            Salary Type
                        </Text>

                        <Text style={styles.detailValue}>
                            {item.salaryType}
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.detailLabel}>
                            Payable Days
                        </Text>

                        <Text style={styles.detailValue}>
                            {item.payableDays}
                        </Text>
                    </View>

                    <View style={styles.salaryContainer}>
                        <Text style={styles.detailLabel}>
                            Net Salary
                        </Text>

                        <Text style={styles.salaryValue}>
                            {formatCurrency(item.netSalary)}
                        </Text>
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={filteredEmployees}
                keyExtractor={item => item.id}
                renderItem={renderEmployee}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={
                    <>
                        {/* Header */}
                        <View style={styles.header}>
                            <View>
                                <Text style={styles.title}>
                                    Payroll
                                </Text>

                                <Text style={styles.subtitle}>
                                    Manage employee payroll
                                </Text>
                            </View>
                        </View>

                        {/* Payroll Period */}
                        <Text style={styles.sectionLabel}>
                            Payroll Period
                        </Text>

                        <Pressable
                            style={styles.monthSelector}
                            onPress={() =>
                                setIsPeriodPickerOpen(true)
                            }>
                            <View>
                                <Text style={styles.monthLabel}>
                                    Selected Period
                                </Text>

                                <Text style={styles.monthValue}>
                                    {selectedPeriod}
                                </Text>
                            </View>

                            <Text style={styles.dropdownIcon}>
                                ⌄
                            </Text>
                        </Pressable>

                        {/* Payroll Overview */}
                        <Text style={styles.sectionTitle}>
                            Payroll Overview
                        </Text>

                        <View style={styles.summaryGrid}>
                            <View style={styles.summaryCard}>
                                <Text style={styles.summaryNumber}>
                                    {payrollEmployees.length}
                                </Text>

                                <Text style={styles.summaryLabel}>
                                    Employees
                                </Text>
                            </View>

                            <View style={styles.summaryCard}>
                                <Text style={styles.summaryNumber}>
                                    {processedCount}
                                </Text>

                                <Text style={styles.summaryLabel}>
                                    Processed
                                </Text>
                            </View>

                            <View style={styles.summaryCard}>
                                <Text style={styles.summaryNumber}>
                                    {pendingCount}
                                </Text>

                                <Text style={styles.summaryLabel}>
                                    Pending
                                </Text>
                            </View>

                            <View style={styles.summaryCard}>
                                <Text style={styles.summaryNumber}>
                                    {formatCurrency(totalNetPayroll)}
                                </Text>

                                <Text style={styles.summaryLabel}>
                                    Net Payroll
                                </Text>
                            </View>
                        </View>

                        {/* Employee Payroll */}
                        <Text style={styles.sectionTitle}>
                            Employee Payroll
                        </Text>

                        <View style={styles.searchContainer}>
                            <Text style={styles.searchIcon}>
                                ⌕
                            </Text>

                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search employee..."
                                placeholderTextColor="#9CA3AF"
                                value={search}
                                onChangeText={setSearch}
                                returnKeyType="search"
                                onSubmitEditing={Keyboard.dismiss}
                            />

                            {search.length > 0 && (
                                <Pressable
                                    onPress={() => setSearch('')}
                                    style={styles.clearButton}>
                                    <Text style={styles.clearText}>
                                        ×
                                    </Text>
                                </Pressable>
                            )}
                        </View>

                        <Text style={styles.resultText}>
                            {filteredEmployees.length} employee
                            {filteredEmployees.length !== 1
                                ? 's'
                                : ''}
                        </Text>
                    </>
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyTitle}>
                            No employees found
                        </Text>

                        <Text style={styles.emptyText}>
                            Try searching with a different name, ID
                            or department.
                        </Text>
                    </View>
                }
            />

            {/* Payroll Period Modal */}
            <Modal
                visible={isPeriodPickerOpen}
                transparent
                animationType="slide"
                onRequestClose={() =>
                    setIsPeriodPickerOpen(false)
                }>
                <View style={styles.modalOverlay}>
                    <View style={styles.periodModal}>
                        {/* Modal Header */}
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                Select Payroll Period
                            </Text>

                            <Pressable
                                onPress={() =>
                                    setIsPeriodPickerOpen(false)
                                }>
                                <Text style={styles.closeButton}>
                                    ×
                                </Text>
                            </Pressable>
                        </View>

                        {/* Year */}
                        <Text style={styles.pickerSectionTitle}>
                            Select Year
                        </Text>

                        <FlatList
                            data={years}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.toString()}
                            contentContainerStyle={
                                styles.yearList
                            }
                            renderItem={({ item }) => (
                                <Pressable
                                    style={[
                                        styles.yearButton,
                                        selectedYear === item &&
                                        styles.selectedYearButton,
                                    ]}
                                    onPress={() =>
                                        setSelectedYear(item)
                                    }>
                                    <Text
                                        style={[
                                            styles.yearText,
                                            selectedYear === item &&
                                            styles.selectedYearText,
                                        ]}>
                                        {item}
                                    </Text>
                                </Pressable>
                            )}
                        />

                        {/* Month */}
                        <Text style={styles.pickerSectionTitle}>
                            Select Month
                        </Text>

                        <View style={styles.monthGrid}>
                            {months.map((month, index) => (
                                <Pressable
                                    key={month}
                                    style={[
                                        styles.monthButton,
                                        selectedMonth === index &&
                                        styles.selectedMonthButton,
                                    ]}
                                    onPress={() =>
                                        setSelectedMonth(index)
                                    }>
                                    <Text
                                        style={[
                                            styles.monthButtonText,
                                            selectedMonth === index &&
                                            styles.selectedMonthButtonText,
                                        ]}>
                                        {month.substring(0, 3)}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>

                        {/* Apply */}
                        <Pressable
                            style={styles.applyPeriodButton}
                            onPress={() =>
                                setIsPeriodPickerOpen(false)
                            }>
                            <Text style={styles.applyPeriodText}>
                                Apply Period
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default PayrollScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },

    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 30,
    },

    header: {
        paddingTop: 12,
        paddingBottom: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
        marginTop: 15,
    },

    subtitle: {
        marginTop: 4,
        fontSize: 14,
        color: '#6B7280',
    },

    sectionLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },

    monthSelector: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    monthLabel: {
        fontSize: 12,
        color: '#6B7280',
    },

    monthValue: {
        marginTop: 3,
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },

    dropdownIcon: {
        fontSize: 22,
        color: '#6B7280',
    },

    sectionTitle: {
        marginTop: 24,
        marginBottom: 12,
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },

    summaryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
    },

    summaryCard: {
        width: '48.5%',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 14,
        minHeight: 85,
        justifyContent: 'center',
    },

    summaryNumber: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },

    summaryLabel: {
        marginTop: 5,
        fontSize: 12,
        color: '#6B7280',
    },

    searchContainer: {
        height: 48,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
    },

    searchIcon: {
        fontSize: 24,
        color: '#6B7280',
        marginRight: 8,
    },

    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#111827',
        paddingVertical: 0,
    },

    clearButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },

    clearText: {
        fontSize: 22,
        color: '#6B7280',
    },

    resultText: {
        marginTop: 10,
        fontSize: 12,
        color: '#6B7280',
    },

    employeeCard: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 14,
        padding: 16,
        marginTop: 12,
    },

    employeeCardPressed: {
        opacity: 0.7,
    },

    employeeTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    employeeInfo: {
        flex: 1,
        paddingRight: 10,
    },

    employeeName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },

    employeeId: {
        marginTop: 3,
        fontSize: 12,
        color: '#6B7280',
    },

    employeeDesignation: {
        marginTop: 6,
        fontSize: 13,
        color: '#374151',
    },

    statusBadge: {
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 20,
    },

    processedBadge: {
        backgroundColor: '#DCFCE7',
    },

    pendingBadge: {
        backgroundColor: '#FEF3C7',
    },

    statusText: {
        fontSize: 11,
        fontWeight: '600',
    },

    processedText: {
        color: '#15803D',
    },

    pendingText: {
        color: '#B45309',
    },

    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginVertical: 14,
    },

    employeeBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    detailLabel: {
        fontSize: 11,
        color: '#9CA3AF',
    },

    detailValue: {
        marginTop: 4,
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
    },

    salaryContainer: {
        alignItems: 'flex-end',
    },

    salaryValue: {
        marginTop: 4,
        fontSize: 13,
        fontWeight: '700',
        color: '#2563EB',
    },

    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 20,
    },

    emptyTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },

    emptyText: {
        marginTop: 6,
        textAlign: 'center',
        fontSize: 13,
        color: '#6B7280',
        lineHeight: 19,
    },

    // Modal

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'flex-end',
    },

    periodModal: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        padding: 20,
        paddingBottom: 30,
    },

    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    modalTitle: {
        fontSize: 19,
        fontWeight: '700',
        color: '#111827',
    },

    closeButton: {
        fontSize: 30,
        color: '#6B7280',
    },

    pickerSectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#374151',
        marginBottom: 10,
    },

    yearList: {
        paddingBottom: 20,
    },

    yearButton: {
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        marginRight: 8,
    },

    selectedYearButton: {
        backgroundColor: '#2563EB',
    },

    yearText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
    },

    selectedYearText: {
        color: '#FFFFFF',
    },

    monthGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    monthButton: {
        width: '31%',
        paddingVertical: 13,
        borderRadius: 10,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        marginBottom: 9,
    },

    selectedMonthButton: {
        backgroundColor: '#2563EB',
    },

    monthButtonText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
    },

    selectedMonthButtonText: {
        color: '#FFFFFF',
    },

    applyPeriodButton: {
        height: 48,
        borderRadius: 11,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
    },

    applyPeriodText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
});