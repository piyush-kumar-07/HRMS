import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const RequestDetailsScreen = ({ navigation, route }: any) => {
    const { request } = route.params;

    const [status, setStatus] = useState(request.status);

    const handleStatusChange = (newStatus: 'Approved' | 'Rejected') => {
        const actionText = newStatus === 'Approved' ? 'approve' : 'reject';

        Alert.alert(
            `${newStatus} Request`,
            `Are you sure you want to ${actionText} this request from ${request.employee}?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: newStatus,
                    onPress: () => {
                        setStatus(newStatus);

                        Alert.alert(
                            'Success',
                            `Request has been ${newStatus.toLowerCase()}.`,
                        );
                    },
                },
            ],
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.backIcon}>‹</Text>
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.title}>Request Details</Text>
                        <Text style={styles.subtitle}>
                            Review employee request
                        </Text>
                    </View>
                </View>

                {/* Request Header */}
                <View style={styles.requestHeaderCard}>
                    <View style={styles.requestIconContainer}>
                        <Text style={styles.requestIcon}>
                            {request.type === 'Leave'
                                ? '🟡'
                                : request.type === 'Attendance'
                                    ? '🕒'
                                    : '📄'}
                        </Text>
                    </View>

                    <View style={styles.requestHeaderContent}>
                        <Text style={styles.requestTitle}>
                            {request.title}
                        </Text>

                        <Text style={styles.requestEmployee}>
                            {request.employee}
                        </Text>

                        <Text style={styles.requestId}>
                            Request ID: {request.id}
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.statusBadge,
                            status === 'Approved' && styles.approvedBadge,
                            status === 'Rejected' && styles.rejectedBadge,
                        ]}>
                        <Text
                            style={[
                                styles.statusText,
                                status === 'Approved' && styles.approvedText,
                                status === 'Rejected' && styles.rejectedText,
                            ]}>
                            {status}
                        </Text>
                    </View>
                </View>

                {/* Employee Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Employee Information
                    </Text>

                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Employee Name</Text>
                            <Text style={styles.infoValue}>
                                {request.employee}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Employee ID</Text>
                            <Text style={styles.infoValue}>
                                {request.employeeId}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Department</Text>
                            <Text style={styles.infoValue}>
                                {request.department}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Request Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Request Information
                    </Text>

                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Request Type</Text>
                            <Text style={styles.infoValue}>
                                {request.type}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Details</Text>
                            <Text style={styles.infoValue}>
                                {request.details}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Submitted</Text>
                            <Text style={styles.infoValue}>
                                {request.submittedDate}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Reason */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Reason</Text>

                    <View style={styles.reasonCard}>
                        <Text style={styles.reasonText}>
                            {request.reason}
                        </Text>
                    </View>
                </View>

                {/* Actions */}
                {status === 'Pending' ? (
                    <View style={styles.actionContainer}>
                        <TouchableOpacity
                            style={styles.rejectButton}
                            activeOpacity={0.75}
                            onPress={() => handleStatusChange('Rejected')}>
                            <Text style={styles.rejectButtonText}>
                                Reject
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.approveButton}
                            activeOpacity={0.75}
                            onPress={() => handleStatusChange('Approved')}>
                            <Text style={styles.approveButtonText}>
                                Approve
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View
                        style={[
                            styles.completedCard,
                            status === 'Approved'
                                ? styles.completedApproved
                                : styles.completedRejected,
                        ]}>
                        <Text
                            style={[
                                styles.completedText,
                                status === 'Approved'
                                    ? styles.completedApprovedText
                                    : styles.completedRejectedText,
                            ]}>
                            This request has already been {status.toLowerCase()}.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },

    container: {
        flex: 1,
    },

    contentContainer: {
        padding: 20,
        paddingBottom: 40,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 22,
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },

    backIcon: {
        fontSize: 32,
        color: '#111827',
        lineHeight: 34,
    },

    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        padding: 25,
    },

    subtitle: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 3,
    },

    requestHeaderCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },

    requestIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    requestIcon: {
        fontSize: 22,
    },

    requestHeaderContent: {
        flex: 1,
    },

    requestTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },

    requestEmployee: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2563EB',
        marginTop: 4,
    },

    requestId: {
        fontSize: 11,
        color: '#9CA3AF',
        marginTop: 4,
    },

    statusBadge: {
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: '#FEF3C7',
    },

    approvedBadge: {
        backgroundColor: '#DCFCE7',
    },

    rejectedBadge: {
        backgroundColor: '#FEE2E2',
    },

    statusText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#92400E',
    },

    approvedText: {
        color: '#166534',
    },

    rejectedText: {
        color: '#991B1B',
    },

    section: {
        marginTop: 22,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 10,
    },

    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 16,
    },

    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },

    infoLabel: {
        fontSize: 13,
        color: '#6B7280',
    },

    infoValue: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
        maxWidth: '55%',
        textAlign: 'right',
    },

    reasonCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 16,
    },

    reasonText: {
        fontSize: 14,
        lineHeight: 21,
        color: '#374151',
    },

    actionContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 28,
    },

    rejectButton: {
        flex: 1,
        height: 48,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FCA5A5',
        alignItems: 'center',
        justifyContent: 'center',
    },

    rejectButtonText: {
        color: '#DC2626',
        fontSize: 14,
        fontWeight: '600',
    },

    approveButton: {
        flex: 1,
        height: 48,
        borderRadius: 10,
        backgroundColor: '#16A34A',
        alignItems: 'center',
        justifyContent: 'center',
    },

    approveButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },

    completedCard: {
        marginTop: 28,
        padding: 16,
        borderRadius: 12,
    },

    completedApproved: {
        backgroundColor: '#DCFCE7',
    },

    completedRejected: {
        backgroundColor: '#FEE2E2',
    },

    completedText: {
        textAlign: 'center',
        fontSize: 13,
        fontWeight: '600',
    },

    completedApprovedText: {
        color: '#166534',
    },

    completedRejectedText: {
        color: '#991B1B',
    },
});

export default RequestDetailsScreen;