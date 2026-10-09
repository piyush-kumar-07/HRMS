import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Modal,
    Pressable,
    StyleSheet,
    StatusBar,
    Alert,
} from 'react-native';

type SalaryType = 'monthly' | 'daily' | 'hourly';
type ShiftType = '1st Shift' | '2nd Shift';

type EmployeeShift = {
    employeeId: string;
    shift: ShiftType;
};

type Employee = {
    id: string;
    name: string;
    departmentId: string;
    salaryType: SalaryType;
    salaryRate: number;
    monthDays: number;
    fullDays: number;
    halfDays: number;
    threeQuarterDays: number;
    payableHours: number;
    overtime: number;
    bonus: number;
    otherIncome: number;
    pf: number;
    esic: number;
    leaveDeduction: number;
    otherDeduction: number;
};

type Calculation = {
    equivalentDays: number;
    basic: number;
    gross: number;
    deductions: number;
    net: number;
};

type PayrollPeriod = {
    label: string;
    start: string;
    end: string;
};


const departments = [
    { id: 'DEP001', name: 'Production' },
    { id: 'DEP002', name: 'Sales' },
    { id: 'DEP003', name: 'Administration' },
    { id: 'DEP004', name: 'Finance & HR' },
];

const periods: PayrollPeriod[] = [
    { label: 'October 2026', start: '2026-10-01', end: '2026-10-31' },
    { label: 'September 2026', start: '2026-09-01', end: '2026-09-30' },
    { label: 'August 2026', start: '2026-08-01', end: '2026-08-31' },
];

// Sample data only. Replace with Firebase records later.
const employees: Employee[] = [
    {
        id: 'EMP001',
        name: 'Rahul Kumar',
        departmentId: 'DEP002',
        salaryType: 'monthly',
        salaryRate: 30000,
        monthDays: 30,
        fullDays: 24,
        halfDays: 4,
        threeQuarterDays: 0,
        payableHours: 0,
        overtime: 1200,
        bonus: 1000,
        otherIncome: 0,
        pf: 1800,
        esic: 0,
        leaveDeduction: 0,
        otherDeduction: 200,
    },
    {
        id: 'EMP002',
        name: 'Amit Sharma',
        departmentId: 'DEP002',
        salaryType: 'daily',
        salaryRate: 800,
        monthDays: 30,
        fullDays: 20,
        halfDays: 4,
        threeQuarterDays: 2,
        payableHours: 0,
        overtime: 1200,
        bonus: 500,
        otherIncome: 0,
        pf: 1200,
        esic: 157,
        leaveDeduction: 0,
        otherDeduction: 300,
    },
    {
        id: 'EMP003',
        name: 'Priya Singh',
        departmentId: 'DEP002',
        salaryType: 'hourly',
        salaryRate: 150,
        monthDays: 30,
        fullDays: 0,
        halfDays: 0,
        threeQuarterDays: 0,
        payableHours: 176,
        overtime: 1500,
        bonus: 1000,
        otherIncome: 200,
        pf: 1200,
        esic: 0,
        leaveDeduction: 0,
        otherDeduction: 300,
    },
    {
        id: 'EMP004',
        name: 'Neha Verma',
        departmentId: 'DEP002',
        salaryType: 'monthly',
        salaryRate: 25000,
        monthDays: 30,
        fullDays: 23,
        halfDays: 4,
        threeQuarterDays: 0,
        payableHours: 0,
        overtime: 0,
        bonus: 500,
        otherIncome: 0,
        pf: 1500,
        esic: 0,
        leaveDeduction: 500,
        otherDeduction: 0,
    },
    {
        id: 'EMP005',
        name: 'Vikash Singh',
        departmentId: 'DEP001',
        salaryType: 'daily',
        salaryRate: 750,
        monthDays: 30,
        fullDays: 26,
        halfDays: 0,
        threeQuarterDays: 0,
        payableHours: 0,
        overtime: 0,
        bonus: 0,
        otherIncome: 0,
        pf: 0,
        esic: 0,
        leaveDeduction: 0,
        otherDeduction: 0,
    },
];

const money = (value: number) =>
    '₹' + Math.round(value).toLocaleString('en-IN');

const getEquivalentDays = (employee: Employee): number =>
    employee.fullDays +
    employee.halfDays * 0.5 +
    employee.threeQuarterDays * 0.75;

const calculateSalary = (employee: Employee): Calculation => {
    const equivalentDays = getEquivalentDays(employee);
    let basic = 0;

    if (employee.salaryType === 'monthly') {
        basic =
            employee.monthDays > 0
                ? (employee.salaryRate / employee.monthDays) * equivalentDays
                : 0;
    } else if (employee.salaryType === 'daily') {
        basic = employee.salaryRate * equivalentDays;
    } else {
        basic = employee.salaryRate * employee.payableHours;
    }

    const gross =
        basic + employee.overtime + employee.bonus + employee.otherIncome;

    const deductions =
        employee.pf +
        employee.esic +
        employee.leaveDeduction +
        employee.otherDeduction;

    return {
        equivalentDays,
        basic,
        gross,
        deductions,
        net: gross - deductions,
    };
};

type PickerProps = {
    visible: boolean;
    title: string;
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
    onClose: () => void;
};

function Picker({
    visible,
    title,
    options,
    selected,
    onSelect,
    onClose,
}: PickerProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable style={styles.sheet} onPress={() => { }}>
                    <View style={styles.handle} />
                    <Text style={styles.sheetTitle}>{title}</Text>

                    {options.map(option => (
                        <TouchableOpacity
                            key={option}
                            style={[
                                styles.option,
                                selected === option && styles.selectedOption,
                            ]}
                            onPress={() => {
                                onSelect(option);
                                onClose();
                            }}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    selected === option && styles.selectedText,
                                ]}
                            >
                                {option}
                            </Text>

                            {selected === option && (
                                <Text style={styles.selectedText}>✓</Text>
                            )}
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

export default function PayrollScreen() {
    const [periodLabel, setPeriodLabel] = useState('October 2026');
    const [departmentId, setDepartmentId] = useState('DEP002');
    const [periodPicker, setPeriodPicker] = useState(false);
    const [departmentPicker, setDepartmentPicker] = useState(false);
    const [reviewEmployee, setReviewEmployee] = useState<Employee | null>(null);
    const [approvedRuns, setApprovedRuns] = useState<string[]>([]);
    const [exportedRuns, setExportedRuns] = useState<string[]>([]);
    const [employeeShifts, setEmployeeShifts] = useState<EmployeeShift[]>(
        employees.map((employee, index) => ({
            employeeId: employee.id,
            shift: index % 2 === 0 ? '1st Shift' : '2nd Shift',
        })),
    );

    const [shiftEmployee, setShiftEmployee] = useState<Employee | null>(null);
    const [selectedShift, setSelectedShift] =
        useState<ShiftType>('1st Shift');
    const [shiftPickerVisible, setShiftPickerVisible] = useState(false);

    const getEmployeeShift = (employeeId: string): ShiftType =>
        employeeShifts.find(item => item.employeeId === employeeId)?.shift ??
        '1st Shift';

    const saveEmployeeShift = () => {
        if (!shiftEmployee) return;

        setEmployeeShifts(previous => [
            ...previous.filter(item => item.employeeId !== shiftEmployee.id),
            {
                employeeId: shiftEmployee.id,
                shift: selectedShift,
            },
        ]);

        setShiftPickerVisible(false);
        setShiftEmployee(null);
    };

    const period = periods.find(item => item.label === periodLabel) ?? periods[0];
    const department =
        departments.find(item => item.id === departmentId) ?? departments[0];

    const runId = `${period.start}_${departmentId}`;

    const departmentEmployees = useMemo(
        () => employees.filter(employee => employee.departmentId === departmentId),
        [departmentId],
    );

    const calculations = departmentEmployees.map(employee => ({
        employee,
        calculation: calculateSalary(employee),
    }));

    const totalGross = calculations.reduce(
        (sum, item) => sum + item.calculation.gross,
        0,
    );

    const totalDeductions = calculations.reduce(
        (sum, item) => sum + item.calculation.deductions,
        0,
    );

    const totalNet = calculations.reduce(
        (sum, item) => sum + item.calculation.net,
        0,
    );

    const isApproved = approvedRuns.includes(runId);
    const isExported = exportedRuns.includes(runId);

    const companyEmployees = employees.length;
    const companyNet = employees.reduce(
        (sum, employee) => sum + calculateSalary(employee).net,
        0,
    );

    const handleApproval = () => {
        if (departmentEmployees.length === 0) {
            Alert.alert('No employees', 'This department has no employees.');
            return;
        }

        Alert.alert(
            'Approve department payroll?',
            `Department: ${department.name}\nPeriod: ${period.label}\nEmployees: ${departmentEmployees.length}\nNet payroll: ${money(totalNet)}`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Approve',
                    onPress: () => {
                        setApprovedRuns(previous =>
                            previous.includes(runId) ? previous : [...previous, runId],
                        );
                    },
                },
            ],
        );
    };

    const handleBankExport = () => {
        if (!isApproved) {
            Alert.alert(
                'Approval required',
                'Approve the payroll before exporting the bank payment file.',
            );
            return;
        }

        Alert.alert(
            'Bank export',
            'This is a UI demonstration. A real bank file has not been generated.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Mark export prepared',
                    onPress: () => {
                        setExportedRuns(previous =>
                            previous.includes(runId) ? previous : [...previous, runId],
                        );
                    },
                },
            ],
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <View style={styles.header}>
                    <View style={styles.flex}>
                        <Text style={styles.title}>
                            {periodLabel.split(' ')[0]} Payroll
                        </Text>
                        <Text style={styles.subtitle}>Payroll management</Text>
                    </View>

                    <View style={[styles.badge, isApproved && styles.approvedBadge]}>
                        <Text style={[styles.badgeText, isApproved && styles.approvedText]}>
                            {isApproved ? 'Approved' : 'Draft'}
                        </Text>
                    </View>
                </View>

                <View style={styles.summaryRow}>
                    <View style={styles.summaryCard}>
                        <Text style={styles.label}>Employees</Text>
                        <Text style={styles.summaryValue}>{companyEmployees}</Text>
                        <Text style={styles.muted}>Across all departments</Text>
                    </View>

                    <View style={styles.summaryCard}>
                        <Text style={styles.label}>Total net salary</Text>
                        <Text style={styles.summaryMoney}>{money(companyNet)}</Text>
                        <Text style={styles.muted}>Sample amount</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Process by Department</Text>
                    <Text style={styles.sectionDescription}>
                        Select a salary period and department to calculate individual salaries.
                    </Text>

                    <Text style={styles.inputLabel}>Payroll period</Text>
                    <TouchableOpacity
                        style={styles.selector}
                        onPress={() => setPeriodPicker(true)}
                    >
                        <Text style={styles.selectorText}>{periodLabel}</Text>
                        <Text style={styles.chevron}>⌄</Text>
                    </TouchableOpacity>

                    <Text style={styles.inputLabel}>Department</Text>
                    <TouchableOpacity
                        style={styles.selector}
                        onPress={() => setDepartmentPicker(true)}
                    >
                        <Text style={styles.selectorText}>{department.name}</Text>
                        <Text style={styles.chevron}>⌄</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.departmentCard}>
                    <Text style={styles.departmentName}>{department.name}</Text>
                    <Text style={styles.muted}>
                        {period.start} to {period.end}
                    </Text>

                    <View style={styles.statsRow}>
                        <View style={styles.stat}>
                            <Text style={styles.statLabel}>Employees</Text>
                            <Text style={styles.statValue}>{departmentEmployees.length}</Text>
                        </View>

                        <View style={styles.stat}>
                            <Text style={styles.statLabel}>Gross earnings</Text>
                            <Text style={styles.statValue}>{money(totalGross)}</Text>
                        </View>

                        <View style={styles.stat}>
                            <Text style={styles.statLabel}>Deductions</Text>
                            <Text style={styles.statValue}>{money(totalDeductions)}</Text>
                        </View>
                    </View>

                    <View style={styles.netBox}>
                        <Text style={styles.netLabel}>Department net payroll</Text>
                        <Text style={styles.netAmount}>{money(totalNet)}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Employee calculations</Text>
                        <Text style={styles.count}>{calculations.length} records</Text>
                    </View>

                    {calculations.length === 0 ? (
                        <View style={styles.empty}>
                            <Text style={styles.emptyTitle}>No employees found</Text>
                            <Text style={styles.muted}>
                                Add employees to this department to begin payroll.
                            </Text>
                        </View>
                    ) : (
                        calculations.map(({ employee, calculation }) => (
                            <TouchableOpacity
                                key={employee.id}
                                style={styles.employeeCard}
                                onPress={() => setReviewEmployee(employee)}
                            >
                                <View style={styles.employeeTop}>
                                    <View style={styles.avatar}>
                                        <Text style={styles.avatarText}>
                                            {employee.name
                                                .split(' ')
                                                .map(part => part[0])
                                                .slice(0, 2)
                                                .join('')}
                                        </Text>
                                    </View>

                                    <View style={styles.flex}>
                                        <Text style={styles.employeeName}>{employee.name}</Text>
                                        <Text style={styles.muted}>
                                            {employee.id} · {employee.salaryType}
                                        </Text>
                                    </View>

                                    <Text style={styles.employeeNet}>{money(calculation.net)}</Text>
                                </View>

                                <View style={styles.employeeDetails}>
                                    <Text style={styles.detailText}>
                                        {employee.salaryType === 'hourly'
                                            ? `${employee.payableHours} payable hours`
                                            : `${calculation.equivalentDays} equivalent payable days`}
                                    </Text>

                                    <Text style={styles.detailText}>
                                        Deductions: {money(calculation.deductions)}
                                    </Text>
                                </View>



                                {employee.salaryType !== 'hourly' && (
                                    <Text style={styles.detailText}>
                                        Full: {employee.fullDays} · Half: {employee.halfDays} ·
                                        Three-quarter: {employee.threeQuarterDays}
                                    </Text>
                                )}

                                <Text style={styles.reviewLink}>View salary breakdown →</Text>
                            </TouchableOpacity>
                        ))
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Approval & payment</Text>

                    <TouchableOpacity
                        style={[styles.primaryButton, isApproved && styles.disabledButton]}
                        disabled={isApproved || calculations.length === 0}
                        onPress={handleApproval}
                    >
                        <Text style={styles.primaryButtonText}>
                            {isApproved ? 'Payroll Approved' : 'Approve Payroll'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.secondaryButton,
                            !isApproved && styles.disabledOutline,
                        ]}
                        onPress={handleBankExport}
                    >
                        <Text style={styles.secondaryButtonText}>
                            {isExported ? 'Bank Export Prepared' : 'Export Bank Payment File'}
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.footnote}>
                        Sample data only. Approval and export status are held in screen
                        state and are not saved to a database. This screen does not make
                        payments or generate a real bank file.
                    </Text>
                </View>
            </ScrollView>

            <Picker
                visible={periodPicker}
                title="Select payroll period"
                options={periods.map(item => item.label)}
                selected={periodLabel}
                onSelect={value => {
                    setPeriodLabel(value);
                    setReviewEmployee(null);
                }}
                onClose={() => setPeriodPicker(false)}
            />

            <Picker
                visible={departmentPicker}
                title="Select department"
                options={departments.map(item => item.name)}
                selected={department.name}
                onSelect={value => {
                    const selected = departments.find(item => item.name === value);

                    if (selected) {
                        setDepartmentId(selected.id);
                        setReviewEmployee(null);
                    }
                }}
                onClose={() => setDepartmentPicker(false)}
            />

            <Modal
                visible={reviewEmployee !== null}
                transparent
                animationType="slide"
                onRequestClose={() => setReviewEmployee(null)}
            >
                <Pressable
                    style={styles.overlay}
                    onPress={() => setReviewEmployee(null)}
                >
                    <Pressable style={styles.sheet} onPress={() => { }}>
                        {reviewEmployee &&
                            (() => {
                                const employee = reviewEmployee;
                                const calculation = calculateSalary(employee);

                                return (
                                    <ScrollView>
                                        <View style={styles.handle} />
                                        <Text style={styles.sheetTitle}>Salary breakdown</Text>
                                        <Text style={styles.employeeName}>{employee.name}</Text>
                                        <Text style={styles.muted}>
                                            {employee.id} · {employee.salaryType} salary
                                        </Text>

                                        <View style={styles.breakdown}>
                                            <Text style={styles.breakdownHeading}>Attendance</Text>

                                            {employee.salaryType === 'hourly' ? (
                                                <Line
                                                    label="Payable hours"
                                                    value={employee.payableHours}
                                                    isCurrency={false}
                                                />
                                            ) : (
                                                <>
                                                    <Line
                                                        label="Full days"
                                                        value={employee.fullDays}
                                                        isCurrency={false}
                                                    />
                                                    <Line
                                                        label="Half-days"
                                                        value={employee.halfDays}
                                                        isCurrency={false}
                                                    />
                                                    <Line
                                                        label="Three-quarter days"
                                                        value={employee.threeQuarterDays}
                                                        isCurrency={false}
                                                    />
                                                    <Line
                                                        label="Equivalent payable days"
                                                        value={calculation.equivalentDays}
                                                        isCurrency={false}
                                                        bold
                                                    />
                                                </>
                                            )}

                                            <View style={styles.separator} />
                                            <Text style={styles.breakdownHeading}>Earnings</Text>
                                            <Line label="Basic payable salary" value={calculation.basic} />
                                            <Line label="Overtime" value={employee.overtime} />
                                            <Line label="Bonus" value={employee.bonus} />
                                            <Line label="Other income" value={employee.otherIncome} />
                                            <Line label="Gross earnings" value={calculation.gross} bold />

                                            <View style={styles.separator} />
                                            <Text style={styles.breakdownHeading}>Deductions</Text>
                                            <Line label="EPF / PF" value={employee.pf} negative />
                                            <Line label="ESIC" value={employee.esic} negative />
                                            <Line
                                                label="Leave deduction"
                                                value={employee.leaveDeduction}
                                                negative
                                            />
                                            <Line
                                                label="Other deductions"
                                                value={employee.otherDeduction}
                                                negative
                                            />
                                            <Line
                                                label="Total deductions"
                                                value={calculation.deductions}
                                                negative
                                                bold
                                            />

                                            <View style={styles.netBox}>
                                                <Text style={styles.netLabel}>Net salary</Text>
                                                <Text style={styles.netAmount}>
                                                    {money(calculation.net)}
                                                </Text>
                                            </View>
                                        </View>

                                        <TouchableOpacity
                                            style={styles.primaryButton}
                                            onPress={() => setReviewEmployee(null)}
                                        >
                                            <Text style={styles.primaryButtonText}>Close breakdown</Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                );
                            })()}
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}

function Line({
    label,
    value,
    negative = false,
    bold = false,
    isCurrency = true,
}: {
    label: string;
    value: number;
    negative?: boolean;
    bold?: boolean;
    isCurrency?: boolean;
}) {
    const displayValue = isCurrency
        ? money(value)
        : value.toLocaleString('en-IN', { maximumFractionDigits: 2 });

    return (
        <View style={styles.line}>
            <Text style={[styles.lineLabel, bold && styles.bold]}>{label}</Text>
            <Text style={[styles.lineValue, bold && styles.bold]}>
                {negative ? '− ' : ''}
                {displayValue}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FB' },
    content: { padding: 18, paddingBottom: 40 },
    flex: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 23,
    },
    title: { fontSize: 27, fontWeight: '700', color: '#172033' },
    subtitle: { color: '#788397', fontSize: 13, marginTop: 4 },
    badge: {
        backgroundColor: '#E4EEFF',
        paddingHorizontal: 13,
        paddingVertical: 8,
        borderRadius: 20,
        marginLeft: 8,
    },
    badgeText: { color: '#2463C5', fontWeight: '700', fontSize: 12 },
    approvedBadge: { backgroundColor: '#DCFCE7' },
    approvedText: { color: '#15803D' },
    summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 28 },
    summaryCard: {
        flex: 1,
        minWidth: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: 17,
        padding: 15,
        minHeight: 140,
        borderWidth: 1,
        borderColor: '#E8ECF3',
        justifyContent: 'center',
    },
    label: { color: '#718096', fontSize: 13, marginBottom: 12 },
    summaryValue: { color: '#172033', fontSize: 34, fontWeight: '700' },
    summaryMoney: { color: '#172033', fontSize: 22, fontWeight: '700' },
    muted: { color: '#8490A3', fontSize: 12, marginTop: 5, lineHeight: 18 },
    section: { marginBottom: 25 },
    sectionTitle: { fontSize: 20, fontWeight: '700', color: '#172033' },
    sectionDescription: {
        color: '#778397',
        fontSize: 13,
        lineHeight: 20,
        marginTop: 7,
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#475467',
        marginBottom: 8,
    },
    selector: {
        height: 52,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#DCE2EB',
        borderRadius: 12,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18,
    },
    selectorText: { color: '#243047', fontSize: 15 },
    chevron: { color: '#667085', fontSize: 23 },
    departmentCard: {
        backgroundColor: '#FFFFFF',
        padding: 17,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#E3E8F0',
        marginBottom: 27,
    },
    departmentName: { color: '#172033', fontSize: 21, fontWeight: '700' },
    statsRow: { flexDirection: 'row', marginTop: 22, marginBottom: 17, gap: 8 },
    stat: { flex: 1, minWidth: 0 },
    statLabel: { color: '#7B8799', fontSize: 11, marginBottom: 7 },
    statValue: { color: '#27364C', fontSize: 14, fontWeight: '700' },
    netBox: {
        backgroundColor: '#F0F7F2',
        padding: 15,
        borderRadius: 12,
        marginTop: 15,
    },
    netLabel: { color: '#4B6654', fontSize: 13 },
    netAmount: { color: '#167343', fontSize: 25, fontWeight: '700', marginTop: 7 },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    count: { color: '#718096', fontSize: 12 },
    employeeCard: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E6EAF1',
        borderRadius: 15,
        padding: 14,
        marginBottom: 12,
    },
    employeeTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    avatar: {
        height: 43,
        width: 43,
        borderRadius: 22,
        backgroundColor: '#E7EEFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: { color: '#315EB5', fontWeight: '700' },
    employeeName: { color: '#202B40', fontSize: 15, fontWeight: '700' },
    employeeNet: { color: '#187746', fontSize: 16, fontWeight: '700' },
    employeeDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 6,
        marginTop: 15,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#EDF0F5',
    },
    detailText: { color: '#738096', fontSize: 11, marginTop: 8 },
    reviewLink: {
        color: '#3269CB',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 12,
    },
    empty: {
        backgroundColor: '#FFFFFF',
        padding: 22,
        borderRadius: 14,
        alignItems: 'center',
    },
    emptyTitle: { color: '#27364C', fontWeight: '700', fontSize: 16 },
    primaryButton: {
        backgroundColor: '#2563EB',
        minHeight: 51,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginTop: 8,
    },
    primaryButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
    disabledButton: { backgroundColor: '#8CA6D9' },
    secondaryButton: {
        minHeight: 51,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#2563EB',
        borderRadius: 12,
        marginTop: 12,
    },
    secondaryButtonText: { color: '#2563EB', fontWeight: '700', fontSize: 14 },
    disabledOutline: { borderColor: '#C9D0DC' },
    footnote: { color: '#8590A1', fontSize: 11, lineHeight: 17, marginTop: 12 },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(20,30,45,0.35)',
    },
    sheet: {
        maxHeight: '85%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 30,
    },
    handle: {
        width: 42,
        height: 4,
        borderRadius: 3,
        backgroundColor: '#D0D5DD',
        alignSelf: 'center',
        marginBottom: 20,
    },
    sheetTitle: {
        color: '#172033',
        fontSize: 21,
        fontWeight: '700',
        marginBottom: 16,
    },
    option: {
        minHeight: 51,
        borderRadius: 10,
        paddingHorizontal: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectedOption: { backgroundColor: '#EEF4FF' },
    optionText: { color: '#344054', fontSize: 15 },
    selectedText: { color: '#2563EB', fontWeight: '700' },
    cancelButton: {
        minHeight: 47,
        borderWidth: 1,
        borderColor: '#DCE2EB',
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    cancelText: { color: '#344054', fontWeight: '600' },
    breakdown: { marginTop: 23, marginBottom: 20 },
    breakdownHeading: {
        color: '#344054',
        fontWeight: '700',
        fontSize: 15,
        marginBottom: 13,
    },
    line: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        gap: 12,
    },
    lineLabel: { color: '#667085', fontSize: 13, flex: 1 },
    lineValue: { color: '#344054', fontSize: 13 },
    bold: { color: '#172033', fontWeight: '700' },
    separator: { height: 1, backgroundColor: '#E4E7EC', marginVertical: 17 },
});