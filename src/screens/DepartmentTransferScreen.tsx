
import React, { useMemo, useState } from 'react';
import {
    Alert,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { employees } from './EmployeeScreen';

const departments = [
    'Admin',
    'Accounts',
    'Security',
    'Kitchen',
    'Sales & Marketing',
];

type TransferRecord = {
    id: string;
    employeeId: string;
    employeeName: string;
    fromDepartment: string;
    toDepartment: string;
    effectiveDate: string;
    reason: string;
    transferredAt: string;
};

const DepartmentTransferScreen = ({ navigation }: any) => {
    const [search, setSearch] = useState('');
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [toDepartment, setToDepartment] = useState('');
    const [effectiveDate, setEffectiveDate] = useState(
        new Date().toISOString().slice(0, 10),
    );
    const [reason, setReason] = useState('');
    const [history, setHistory] = useState<TransferRecord[]>([]);

    const selectedEmployee = employees.find(
        employee => employee.id === selectedEmployeeId,
    );

    const filteredEmployees = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return employees;
        }

        return employees.filter(
            employee =>
                employee.name.toLowerCase().includes(query) ||
                employee.id.toLowerCase().includes(query),
        );
    }, [search]);

    const handleTransfer = () => {
        if (!selectedEmployee) {
            Alert.alert('Select Employee', 'Please select an employee first.');
            return;
        }

        if (!toDepartment) {
            Alert.alert('Select Department', 'Choose the destination department.');
            return;
        }

        if (toDepartment === selectedEmployee.department) {
            Alert.alert(
                'Invalid Transfer',
                'The employee already belongs to this department.',
            );
            return;
        }

        if (!effectiveDate.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(effectiveDate)) {
            Alert.alert('Invalid Date', 'Enter the date in YYYY-MM-DD format.');
            return;
        }

        if (!reason.trim()) {
            Alert.alert('Reason Required', 'Enter a reason for this transfer.');
            return;
        }

        const oldDepartment = selectedEmployee.department;

        Alert.alert(
            'Confirm Department Transfer',
            `Employee: ${selectedEmployee.name}\n\nFrom: ${oldDepartment}\nTo: ${toDepartment}\nEffective date: ${effectiveDate}\n\nContinue with this transfer?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm Transfer',
                    onPress: () => {
                        const record: TransferRecord = {
                            id: `TR-${Date.now()}`,
                            employeeId: selectedEmployee.id,
                            employeeName: selectedEmployee.name,
                            fromDepartment: oldDepartment,
                            toDepartment,
                            effectiveDate,
                            reason: reason.trim(),
                            transferredAt: new Date().toISOString(),
                        };

                        // Update the existing employee; do not create a duplicate.
                        selectedEmployee.department = toDepartment;

                        setHistory(previous => [record, ...previous]);

                        Alert.alert(
                            'Transfer Complete',
                            `${selectedEmployee.name} has been transferred from ${oldDepartment} to ${toDepartment}.`,
                        );

                        setSearch('');
                        setSelectedEmployeeId('');
                        setToDepartment('');
                        setReason('');
                        setEffectiveDate(new Date().toISOString().slice(0, 10));
                    },
                },
            ],
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#111827" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Department Transfer</Text>
                <View style={styles.headerSpace} />
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                <View style={styles.introCard}>
                    <View style={styles.introIcon}>
                        <MaterialIcons
                            name="swap-horiz"
                            size={27}
                            color="#2563EB"
                        />
                    </View>
                    <Text style={styles.introTitle}>Internal Department Transfer</Text>
                    <Text style={styles.introSubtitle}>
                        Move an existing employee to another department while keeping
                        their employee ID unchanged.
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>1. Select Employee</Text>

                <View style={styles.searchBox}>
                    <MaterialIcons name="search" size={21} color="#6B7280" />
                    <TextInput
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Search by employee name or ID"
                        placeholderTextColor="#9CA3AF"
                        style={styles.searchInput}
                    />
                </View>

                {filteredEmployees.length === 0 ? (
                    <Text style={styles.emptyText}>No employees found.</Text>
                ) : (
                    <FlatList
                        data={filteredEmployees}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                        renderItem={({ item }) => {
                            const isSelected = selectedEmployeeId === item.id;

                            return (
                                <TouchableOpacity
                                    style={[
                                        styles.employeeCard,
                                        isSelected && styles.selectedCard,
                                    ]}
                                    onPress={() => {
                                        setSelectedEmployeeId(item.id);
                                        setToDepartment('');
                                    }}
                                    activeOpacity={0.75}>
                                    <View style={styles.avatar}>
                                        <Text style={styles.avatarText}>
                                            {item.name.charAt(0).toUpperCase()}
                                        </Text>
                                    </View>

                                    <View style={styles.employeeInfo}>
                                        <Text style={styles.employeeName}>{item.name}</Text>
                                        <Text style={styles.employeeId}>{item.id}</Text>
                                        <Text style={styles.currentDepartment}>
                                            Current: {item.department}
                                        </Text>
                                    </View>

                                    <MaterialIcons
                                        name={
                                            isSelected
                                                ? 'radio-button-checked'
                                                : 'radio-button-unchecked'
                                        }
                                        size={23}
                                        color={isSelected ? '#2563EB' : '#9CA3AF'}
                                    />
                                </TouchableOpacity>
                            );
                        }}
                    />
                )}

                {selectedEmployee && (
                    <>
                        <Text style={styles.sectionTitle}>2. Choose New Department</Text>

                        <View style={styles.departmentGrid}>
                            {departments
                                .filter(name => name !== selectedEmployee.department)
                                .map(name => {
                                    const selected = toDepartment === name;

                                    return (
                                        <TouchableOpacity
                                            key={name}
                                            style={[
                                                styles.departmentOption,
                                                selected && styles.selectedDepartment,
                                            ]}
                                            onPress={() => setToDepartment(name)}
                                            activeOpacity={0.75}>
                                            <MaterialIcons
                                                name="business"
                                                size={20}
                                                color={selected ? '#FFFFFF' : '#2563EB'}
                                            />
                                            <Text
                                                style={[
                                                    styles.departmentText,
                                                    selected && styles.selectedDepartmentText,
                                                ]}>
                                                {name}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                        </View>

                        <Text style={styles.sectionTitle}>3. Transfer Details</Text>

                        <Text style={styles.label}>Effective Date (YYYY-MM-DD)</Text>
                        <TextInput
                            value={effectiveDate}
                            onChangeText={setEffectiveDate}
                            placeholder="2026-10-09"
                            placeholderTextColor="#9CA3AF"
                            style={styles.input}
                            autoCapitalize="none"
                        />

                        <Text style={styles.label}>Reason for Transfer</Text>
                        <TextInput
                            value={reason}
                            onChangeText={setReason}
                            placeholder="Enter reason for transfer"
                            placeholderTextColor="#9CA3AF"
                            style={[styles.input, styles.reasonInput]}
                            multiline
                            textAlignVertical="top"
                        />

                        <TouchableOpacity
                            style={[
                                styles.transferButton,
                                (!toDepartment || !reason.trim()) &&
                                styles.disabledButton,
                            ]}
                            disabled={!toDepartment || !reason.trim()}
                            onPress={handleTransfer}
                            activeOpacity={0.8}>
                            <MaterialIcons
                                name="check-circle"
                                size={21}
                                color="#FFFFFF"
                            />
                            <Text style={styles.transferButtonText}>
                                Confirm Department Transfer
                            </Text>
                        </TouchableOpacity>
                    </>
                )}

                <Text style={styles.sectionTitle}>Transfer History</Text>

                {history.length === 0 ? (
                    <View style={styles.emptyHistory}>
                        <MaterialIcons
                            name="history"
                            size={30}
                            color="#9CA3AF"
                        />
                        <Text style={styles.emptyHistoryTitle}>
                            No transfers in this session
                        </Text>
                        <Text style={styles.emptyText}>
                            Completed transfers will appear here.
                        </Text>
                    </View>
                ) : (
                    history.map(record => (
                        <View style={styles.historyCard} key={record.id}>
                            <Text style={styles.employeeName}>{record.employeeName}</Text>
                            <Text style={styles.employeeId}>{record.employeeId}</Text>

                            <View style={styles.historyRoute}>
                                <Text style={styles.historyDepartment}>
                                    {record.fromDepartment}
                                </Text>
                                <MaterialIcons
                                    name="arrow-forward"
                                    size={18}
                                    color="#2563EB"
                                />
                                <Text style={styles.historyDepartment}>
                                    {record.toDepartment}
                                </Text>
                            </View>

                            <Text style={styles.historyMeta}>
                                Effective date: {record.effectiveDate}
                            </Text>
                            <Text style={styles.historyMeta}>
                                Reason: {record.reason}
                            </Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default DepartmentTransferScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        height: 60,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        width: 38,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    headerSpace: {
        width: 38,
    },
    content: {
        padding: 18,
        paddingBottom: 40,
    },
    introCard: {
        backgroundColor: '#FFFFFF',
        padding: 18,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    introIcon: {
        width: 48,
        height: 48,
        borderRadius: 13,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    introTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111827',
    },
    introSubtitle: {
        fontSize: 13,
        lineHeight: 20,
        color: '#6B7280',
        marginTop: 6,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginTop: 24,
        marginBottom: 12,
    },
    searchBox: {
        minHeight: 48,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 11,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#111827',
        paddingVertical: 10,
    },
    employeeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        marginTop: 9,
    },
    selectedCard: {
        borderColor: '#2563EB',
        backgroundColor: '#EFF6FF',
    },
    avatar: {
        width: 43,
        height: 43,
        borderRadius: 22,
        backgroundColor: '#DBEAFE',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#2563EB',
        fontSize: 18,
        fontWeight: '700',
    },
    employeeInfo: {
        flex: 1,
    },
    employeeName: {
        color: '#111827',
        fontSize: 14,
        fontWeight: '700',
    },
    employeeId: {
        color: '#6B7280',
        fontSize: 12,
        marginTop: 3,
    },
    currentDepartment: {
        color: '#2563EB',
        fontSize: 12,
        marginTop: 4,
    },
    departmentGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    departmentOption: {
        width: '48%',
        minHeight: 55,
        paddingHorizontal: 10,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    selectedDepartment: {
        backgroundColor: '#2563EB',
        borderColor: '#2563EB',
    },
    departmentText: {
        flex: 1,
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
    },
    selectedDepartmentText: {
        color: '#FFFFFF',
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 7,
    },
    input: {
        minHeight: 47,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 10,
        paddingHorizontal: 12,
        color: '#111827',
        fontSize: 14,
        marginBottom: 16,
    },
    reasonInput: {
        height: 95,
        paddingTop: 12,
    },
    transferButton: {
        minHeight: 51,
        borderRadius: 11,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 9,
        marginTop: 5,
    },
    disabledButton: {
        opacity: 0.5,
    },
    transferButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
    },
    emptyText: {
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 7,
    },
    emptyHistory: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        alignItems: 'center',
        padding: 22,
    },
    emptyHistoryTitle: {
        color: '#374151',
        fontSize: 14,
        fontWeight: '600',
        marginTop: 8,
    },
    historyCard: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
    },
    historyRoute: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 12,
        marginBottom: 8,
    },
    historyDepartment: {
        fontSize: 13,
        color: '#374151',
        fontWeight: '600',
    },
    historyMeta: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 5,
    },
});
