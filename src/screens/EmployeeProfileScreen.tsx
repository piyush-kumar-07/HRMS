import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';

type EmployeeProfileProps = {
    route: any;
    navigation: any;
};

const EmployeeProfileScreen = ({
    route,
    navigation,
}: EmployeeProfileProps) => {
    const employee = route.params.employee;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}>
                        <Text style={styles.backText}>‹</Text>
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>
                        Employee Profile
                    </Text>

                    <View style={styles.headerSpace} />
                </View>

                {/* Employee Header */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {employee.name.charAt(0)}
                        </Text>
                    </View>

                    <Text style={styles.employeeName}>
                        {employee.name}
                    </Text>

                    <Text style={styles.employeeId}>
                        {employee.id}
                    </Text>

                    <View style={styles.statusRow}>
                        <View
                            style={[
                                styles.statusIndicator,
                                {
                                    backgroundColor:
                                        employee.status === 'present'
                                            ? '#22C55E'
                                            : employee.status === 'absent'
                                                ? '#EF4444'
                                                : '#EAB308',
                                },
                            ]}
                        />

                        <Text style={styles.statusText}>
                            {employee.status === 'present'
                                ? 'Present'
                                : employee.status === 'absent'
                                    ? 'Absent'
                                    : 'On Leave'}
                        </Text>
                    </View>
                </View>

                {/* Personal Details */}
                <Text style={styles.sectionTitle}>
                    Personal Details
                </Text>

                <View style={styles.card}>
                    <DetailRow
                        label="Full Name"
                        value={employee.name}
                    />

                    <DetailRow
                        label="Employee ID"
                        value={employee.id}
                    />

                    <DetailRow
                        label="Department"
                        value={employee.department}
                    />
                </View>

                {/* Employment Details */}
                <Text style={styles.sectionTitle}>
                    Employment Details
                </Text>

                <View style={styles.card}>
                    <DetailRow
                        label="Designation"
                        value={employee.designation}
                    />

                    <DetailRow
                        label="Department"
                        value={employee.department}
                    />

                    <DetailRow
                        label="Employment Status"
                        value="Active"
                    />
                </View>

                {/* Attendance */}
                <Text style={styles.sectionTitle}>
                    Attendance
                </Text>

                <TouchableOpacity style={styles.actionCard}>
                    <View>
                        <Text style={styles.actionTitle}>
                            Attendance History
                        </Text>

                        <Text style={styles.actionSubtitle}>
                            View employee attendance records
                        </Text>
                    </View>

                    <Text style={styles.arrow}>
                        →
                    </Text>
                </TouchableOpacity>

                {/* Documents */}
                <Text style={styles.sectionTitle}>
                    Documents
                </Text>

                <TouchableOpacity style={styles.actionCard}>
                    <View>
                        <Text style={styles.actionTitle}>
                            Employee Documents
                        </Text>

                        <Text style={styles.actionSubtitle}>
                            View employee documents
                        </Text>
                    </View>

                    <Text style={styles.arrow}>
                        →
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

const DetailRow = ({
    label,
    value,
}: {
    label: string;
    value: string;
}) => {
    return (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
                {label}
            </Text>

            <Text style={styles.detailValue}>
                {value}
            </Text>
        </View>
    );
};

export default EmployeeProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    content: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },

    backText: {
        fontSize: 34,
        color: '#111827',
        lineHeight: 36,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },

    headerSpace: {
        width: 40,
    },

    profileHeader: {
        alignItems: 'center',
        paddingVertical: 20,
    },

    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },

    avatarText: {
        fontSize: 30,
        fontWeight: '700',
        color: '#2563EB',
    },

    employeeName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
    },

    employeeId: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 4,
    },

    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },

    statusIndicator: {
        width: 9,
        height: 9,
        borderRadius: 5,
        marginRight: 6,
    },

    statusText: {
        fontSize: 13,
        color: '#6B7280',
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginTop: 15,
        marginBottom: 10,
    },

    card: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 15,
    },

    detailRow: {
        minHeight: 55,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        justifyContent: 'center',
    },

    detailLabel: {
        fontSize: 12,
        color: '#9CA3AF',
    },

    detailValue: {
        fontSize: 14,
        color: '#111827',
        fontWeight: '500',
        marginTop: 3,
    },

    actionCard: {
        minHeight: 75,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    actionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
    },

    actionSubtitle: {
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 4,
    },

    arrow: {
        fontSize: 22,
        color: '#2563EB',
    },
});