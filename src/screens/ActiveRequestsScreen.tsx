import React, { useMemo, useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type RequestType = 'Leave' | 'Attendance' | 'Other';

type RequestStatus = 'Pending' | 'Approved' | 'Rejected';

type Request = {
    id: string;
    type: RequestType;
    title: string;
    employee: string;
    employeeId: string;
    department: string;
    details: string;
    submittedDate: string;
    status: RequestStatus;
    reason: string;
};

const requests: Request[] = [
    {
        id: 'REQ001',
        type: 'Leave',
        title: 'Leave Request',
        employee: 'Rahul Kumar',
        employeeId: 'EMP001',
        department: 'Security',
        details: '2 days • Casual Leave',
        submittedDate: '08 Oct 2026',
        status: 'Pending',
        reason: 'Personal work',
    },
    {
        id: 'REQ002',
        type: 'Attendance',
        title: 'Attendance Correction',
        employee: 'Amit Sharma',
        employeeId: 'EMP002',
        department: 'Accounts',
        details: 'Missing check-out',
        submittedDate: '07 Oct 2026',
        status: 'Pending',
        reason: 'Forgot to check out after completing the shift.',
    },
    {
        id: 'REQ003',
        type: 'Leave',
        title: 'Leave Request',
        employee: 'Priya Singh',
        employeeId: 'EMP003',
        department: 'Admin',
        details: '1 day • Sick Leave',
        submittedDate: '07 Oct 2026',
        status: 'Pending',
        reason: 'Not feeling well.',
    },
    {
        id: 'REQ004',
        type: 'Other',
        title: 'Document Request',
        employee: 'Vikas Kumar',
        employeeId: 'EMP004',
        department: 'Kitchen',
        details: 'Salary Certificate',
        submittedDate: '06 Oct 2026',
        status: 'Pending',
        reason: 'Required for personal documentation.',
    },
];

const ActiveRequestsScreen = ({ navigation }: any) => {
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState<'All' | RequestType>('All');
    const [requestList, setRequestList] = useState<Request[]>(requests);

    const pendingCount = requestList.filter(
        item => item.status === 'Pending',
    ).length;

    const filteredRequests = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        return requestList.filter(item => {
            const matchesFilter =
                activeFilter === 'All' || item.type === activeFilter;

            const matchesSearch =
                !searchText ||
                item.employee.toLowerCase().includes(searchText) ||
                item.employeeId.toLowerCase().includes(searchText) ||
                item.title.toLowerCase().includes(searchText) ||
                item.department.toLowerCase().includes(searchText);

            return matchesFilter && matchesSearch;
        });
    }, [search, activeFilter, requestList]);

    const reviewRequest = (request: Request) => {
        navigation.navigate('RequestDetails', {
            request,
        });
    };

    const updateRequestStatus = (
        requestId: string,
        status: 'Approved' | 'Rejected',
    ) => {
        setRequestList(current =>
            current.map(item =>
                item.id === requestId
                    ? {
                        ...item,
                        status,
                    }
                    : item,
            ),
        );
    };

    const handleAction = (
        request: Request,
        action: 'Approved' | 'Rejected',
    ) => {
        const actionText = action === 'Approved' ? 'approve' : 'reject';

        Alert.alert(
            `${action} Request`,
            `Are you sure you want to ${actionText} this request from ${request.employee}?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: action,
                    onPress: () => {
                        updateRequestStatus(request.id, action);
                    },
                },
            ],
        );
    };

    const getIcon = (type: RequestType) => {
        if (type === 'Leave') {
            return '🟡';
        }

        if (type === 'Attendance') {
            return '🕒';
        }

        return '📄';
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled">

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.backIcon}>‹</Text>
                    </TouchableOpacity>

                    <View style={styles.headerTextContainer}>
                        <Text style={styles.title}>Active Requests</Text>
                        <Text style={styles.subtitle}>
                            Review and manage employee requests
                        </Text>
                    </View>
                </View>

                {/* Summary */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryIconContainer}>
                        <Text style={styles.summaryIcon}>📋</Text>
                    </View>

                    <View>
                        <Text style={styles.summaryLabel}>Pending Requests</Text>
                        <Text style={styles.summaryValue}>{pendingCount}</Text>
                    </View>
                </View>

                {/* Search */}
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>

                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search requests..."
                        placeholderTextColor="#9CA3AF"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                {/* Filters */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterContainer}>
                    {(['All', 'Leave', 'Attendance', 'Other'] as const).map(filter => (
                        <TouchableOpacity
                            key={filter}
                            style={[
                                styles.filterButton,
                                activeFilter === filter && styles.activeFilterButton,
                            ]}
                            onPress={() => setActiveFilter(filter)}>
                            <Text
                                style={[
                                    styles.filterText,
                                    activeFilter === filter && styles.activeFilterText,
                                ]}>
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Section Header */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Requests</Text>

                    <Text style={styles.requestCount}>
                        {filteredRequests.length}
                    </Text>
                </View>

                {/* Requests */}
                {filteredRequests.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>📭</Text>

                        <Text style={styles.emptyTitle}>No requests found</Text>

                        <Text style={styles.emptyText}>
                            Try changing your search or filter.
                        </Text>
                    </View>
                ) : (
                    filteredRequests.map(request => (
                        <View key={request.id} style={styles.requestCard}>
                            {/* Top */}
                            <View style={styles.requestTop}>
                                <View style={styles.requestIconContainer}>
                                    <Text style={styles.requestIcon}>
                                        {getIcon(request.type)}
                                    </Text>
                                </View>

                                <View style={styles.requestContent}>
                                    <Text style={styles.requestTitle}>
                                        {request.title}
                                    </Text>

                                    <Text style={styles.requestEmployee}>
                                        {request.employee}
                                    </Text>

                                    <Text style={styles.requestDetails}>
                                        {request.details}
                                    </Text>
                                </View>

                                <View
                                    style={[
                                        styles.statusBadge,
                                        request.status === 'Approved' &&
                                        styles.approvedBadge,
                                        request.status === 'Rejected' &&
                                        styles.rejectedBadge,
                                    ]}>
                                    <Text
                                        style={[
                                            styles.statusText,
                                            request.status === 'Approved' &&
                                            styles.approvedText,
                                            request.status === 'Rejected' &&
                                            styles.rejectedText,
                                        ]}>
                                        {request.status}
                                    </Text>
                                </View>
                            </View>

                            {/* Information */}
                            <View style={styles.divider} />

                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Department</Text>
                                <Text style={styles.infoValue}>
                                    {request.department}
                                </Text>
                            </View>

                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Submitted</Text>
                                <Text style={styles.infoValue}>
                                    {request.submittedDate}
                                </Text>
                            </View>

                            {/* Actions */}
                            {request.status === 'Pending' && (
                                <View style={styles.actionContainer}>
                                    <TouchableOpacity
                                        style={styles.rejectButton}
                                        activeOpacity={0.75}
                                        onPress={() =>
                                            handleAction(request, 'Rejected')
                                        }>
                                        <Text style={styles.rejectButtonText}>
                                            Reject
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.reviewButton}
                                        activeOpacity={0.75}
                                        onPress={() => reviewRequest(request)}>
                                        <Text style={styles.reviewButtonText}>
                                            Review
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    ))
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

    headerTextContainer: {
        flex: 1,
    },

    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
    },

    subtitle: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 3,
    },

    summaryCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },

    summaryIconContainer: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 13,
    },

    summaryIcon: {
        fontSize: 22,
    },

    summaryLabel: {
        fontSize: 13,
        color: '#6B7280',
    },

    summaryValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        marginTop: 2,
    },

    searchContainer: {
        height: 48,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    searchIcon: {
        fontSize: 17,
        marginRight: 9,
    },

    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#111827',
        paddingVertical: 0,
    },

    filterContainer: {
        paddingBottom: 8,
    },

    filterButton: {
        paddingHorizontal: 17,
        paddingVertical: 9,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    activeFilterButton: {
        backgroundColor: '#2563EB',
        borderColor: '#2563EB',
    },

    filterText: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '500',
    },

    activeFilterText: {
        color: '#FFFFFF',
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },

    requestCount: {
        marginLeft: 8,
        minWidth: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#E5E7EB',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
    },

    requestCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 16,
        marginBottom: 14,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },

    requestTop: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    requestIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    requestIcon: {
        fontSize: 20,
    },

    requestContent: {
        flex: 1,
    },

    requestTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
    },

    requestEmployee: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2563EB',
        marginTop: 3,
    },

    requestDetails: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 3,
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

    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 14,
    },

    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 7,
    },

    infoLabel: {
        fontSize: 12,
        color: '#6B7280',
    },

    infoValue: {
        fontSize: 12,
        color: '#374151',
        fontWeight: '500',
    },

    actionContainer: {
        flexDirection: 'row',
        marginTop: 12,
        gap: 10,
    },

    rejectButton: {
        flex: 1,
        height: 42,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FCA5A5',
        alignItems: 'center',
        justifyContent: 'center',
    },

    rejectButtonText: {
        color: '#DC2626',
        fontSize: 13,
        fontWeight: '600',
    },

    reviewButton: {
        flex: 1,
        height: 42,
        borderRadius: 10,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
    },

    reviewButtonText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '600',
    },

    emptyContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingVertical: 45,
        alignItems: 'center',
        marginTop: 8,
    },

    emptyIcon: {
        fontSize: 35,
        marginBottom: 10,
    },

    emptyTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },

    emptyText: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 5,
    },
});

export default ActiveRequestsScreen;