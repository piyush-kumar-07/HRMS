import React, { useState } from 'react';

import {
    SafeAreaView,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Keyboard,
    Modal,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { employees } from './EmployeeScreen';

type AttendanceStatus = 'present' | 'leave' | 'absent';

const HomeScreen = () => {
    const navigation = useNavigation<any>();

    const pendingRequests = 3;

    const [search, setSearch] = useState('');

    const [quickStatus, setQuickStatus] =
        useState<AttendanceStatus | null>(null);

    // --------------------------------
    // Dashboard Search
    // --------------------------------

    const searchEmployees = () => {
        const searchText = search.trim();

        Keyboard.dismiss();

        if (!searchText) {
            navigation.navigate('Employees');
            return;
        }

        navigation.navigate('Employees', {
            screen: 'EmployeeList',
            params: {
                search: searchText,
            },
        });
    };

    // --------------------------------
    // View All Employees
    // --------------------------------

    const openEmployees = () => {
        Keyboard.dismiss();

        navigation.navigate('Employees');
    };

    // --------------------------------
    // Attendance Card - Normal Tap
    // --------------------------------

    const openStatusEmployees = (
        status: AttendanceStatus,
    ) => {
        Keyboard.dismiss();

        navigation.getParent()?.navigate('Employees', {
            screen: 'EmployeeList',
            params: {
                filter: status,
            },
        });
    };

    // --------------------------------
    // Attendance Card - Long Press
    // --------------------------------

    const openQuickStatus = (
        status: AttendanceStatus,
    ) => {
        Keyboard.dismiss();

        setQuickStatus(status);
    };

    // --------------------------------
    // Close Floating Panel
    // --------------------------------

    const closeQuickStatus = () => {
        setQuickStatus(null);
    };

    // --------------------------------
    // Employees for Floating Panel
    // --------------------------------

    const quickEmployees = quickStatus
        ? employees.filter(
            employee => employee.status === quickStatus,
        )
        : [];

    // --------------------------------
    // Floating Panel Title
    // --------------------------------

    const quickStatusTitle =
        quickStatus === 'present'
            ? 'Present Employees'
            : quickStatus === 'leave'
                ? 'Employees On Leave'
                : 'Absent Employees';

    // --------------------------------
    // Floating Panel Color
    // --------------------------------

    const quickStatusColor =
        quickStatus === 'present'
            ? '#22C55E'
            : quickStatus === 'leave'
                ? '#EAB308'
                : '#EF4444';

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">

                {/* -------------------------------- */}
                {/* Header */}
                {/* -------------------------------- */}

                <View style={styles.header}>

                    <View style={styles.companySection}>

                        <View style={styles.logoContainer}>

                            <Image
                                source={require('../assets/logo.png')}
                                style={styles.logo}
                            />

                        </View>

                        <Text style={styles.companyName}>
                            BARC Security Solution
                        </Text>

                    </View>

                    <TouchableOpacity
                        style={styles.notificationButton}
                        activeOpacity={0.75}
                        onPress={() =>
                            navigation.navigate('ActiveRequests')
                        }>

                        <Text style={styles.notificationIcon}>
                            🔔
                        </Text>

                        {pendingRequests > 0 && (
                            <View style={styles.notificationBadge}>

                                {pendingRequests < 4 ? (
                                    <Text
                                        style={
                                            styles.notificationBadgeText
                                        }>
                                        {pendingRequests}
                                    </Text>
                                ) : null}

                            </View>
                        )}

                    </TouchableOpacity>

                </View>

                {/* -------------------------------- */}
                {/* Dashboard Title */}
                {/* -------------------------------- */}

                <Text style={styles.dashboardTitle}>
                    Dashboard
                </Text>

                {/* -------------------------------- */}
                {/* Search */}
                {/* -------------------------------- */}

                <View style={styles.searchContainer}>

                    <Text style={styles.searchIcon}>
                        🔍
                    </Text>

                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search employees..."
                        placeholderTextColor="#6B7280"
                        value={search}
                        onChangeText={setSearch}
                        returnKeyType="search"
                        onSubmitEditing={searchEmployees}
                    />

                    {search.length > 0 && (
                        <TouchableOpacity
                            onPress={() => setSearch('')}
                            style={styles.clearButton}>

                            <Text style={styles.clearText}>
                                ×
                            </Text>

                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={searchEmployees}>

                        <Text style={styles.searchButtonText}>
                            Search
                        </Text>

                    </TouchableOpacity>

                </View>

                {/* -------------------------------- */}
                {/* Today's Attendance */}
                {/* -------------------------------- */}

                <View style={styles.sectionHeader}>

                    <Text style={styles.sectionTitle}>
                        Today's Attendance
                    </Text>

                    <TouchableOpacity onPress={openEmployees}>

                        <Text style={styles.viewAll}>
                            View All
                        </Text>

                    </TouchableOpacity>

                </View>

                {/* -------------------------------- */}
                {/* Attendance Cards */}
                {/* -------------------------------- */}

                <View style={styles.attendanceRow}>

                    {/* Present */}
                    <TouchableOpacity
                        style={styles.attendanceCard}
                        activeOpacity={0.8}
                        onPress={() =>
                            openStatusEmployees('present')
                        }
                        onLongPress={() =>
                            openQuickStatus('present')
                        }
                        delayLongPress={500}>

                        <View style={styles.cardHeader}>

                            <Text style={styles.cardTitle}>
                                Present
                            </Text>

                            <View
                                style={
                                    styles.presentIndicator
                                }
                            />

                        </View>

                        <Text style={styles.cardNumber}>
                            42
                        </Text>

                        <Text style={styles.cardTotal}>
                            / 50 Employees
                        </Text>

                    </TouchableOpacity>

                    {/* On Leave */}

                    <TouchableOpacity
                        style={styles.attendanceCard}
                        activeOpacity={0.8}
                        onPress={() =>
                            openStatusEmployees('leave')
                        }
                        onLongPress={() =>
                            openQuickStatus('leave')
                        }
                        delayLongPress={500}>

                        <View style={styles.cardHeader}>

                            <Text style={styles.cardTitle}>
                                On Leave
                            </Text>

                            <View
                                style={
                                    styles.leaveIndicator
                                }
                            />

                        </View>

                        <Text style={styles.cardNumber}>
                            5
                        </Text>

                        <Text style={styles.cardTotal}>
                            Employees
                        </Text>

                    </TouchableOpacity>

                </View>

                {/* Absent */}

                <TouchableOpacity
                    style={styles.absentCard}
                    activeOpacity={0.8}
                    onPress={() =>
                        openStatusEmployees('absent')
                    }
                    onLongPress={() =>
                        openQuickStatus('absent')
                    }
                    delayLongPress={500}>

                    <View style={styles.cardHeader}>

                        <Text style={styles.cardTitle}>
                            Absent
                        </Text>

                        <View
                            style={
                                styles.absentIndicator
                            }
                        />

                    </View>

                    <Text style={styles.cardNumber}>
                        6
                    </Text>

                    <Text style={styles.cardTotal}>
                        Employees
                    </Text>

                </TouchableOpacity>

                {/* -------------------------------- */}
                {/* Active Requests */}
                {/* -------------------------------- */}

                <View style={styles.sectionHeader}>

                    <Text style={styles.sectionTitle}>
                        Active Requests
                    </Text>

                    <Text style={styles.requestCount}>
                        1
                    </Text>

                </View>

                <TouchableOpacity
                    style={styles.requestCard}
                    activeOpacity={0.75}
                    onPress={() =>
                        navigation.navigate(
                            'ActiveRequests',
                        )
                    }>

                    <View style={styles.requestIconContainer}>

                        <Text style={styles.requestIcon}>
                            🟡
                        </Text>

                    </View>

                    <View style={styles.requestContent}>

                        <Text style={styles.requestTitle}>
                            Leave Request
                        </Text>

                        <Text style={styles.requestEmployee}>
                            Rahul Kumar
                        </Text>

                        <Text style={styles.requestDetails}>
                            2 days • Casual Leave
                        </Text>

                    </View>

                    <Text style={styles.reviewText}>
                        Review →
                    </Text>

                </TouchableOpacity>

                {/* -------------------------------- */}
                {/* Recent Activity */}
                {/* -------------------------------- */}

                <Text style={styles.sectionTitle}>
                    Recent Activity
                </Text>

                <View style={styles.activityCard}>

                    <Text style={styles.activityItem}>
                        • New employee added
                    </Text>

                    <Text style={styles.activityItem}>
                        • Leave request submitted
                    </Text>

                    <Text style={styles.activityItem}>
                        • Employee profile updated
                    </Text>

                </View>

            </ScrollView>

            {/* ================================== */}
            {/* QUICK EMPLOYEE FLOATING PANEL */}
            {/* ================================== */}

            <Modal
                visible={quickStatus !== null}
                transparent
                animationType="fade"
                onRequestClose={closeQuickStatus}>

                <View style={styles.modalOverlay}>

                    <View style={styles.quickPanel}>

                        {/* Panel Header */}

                        <View
                            style={
                                styles.quickPanelHeader
                            }>

                            <View
                                style={
                                    styles.quickTitleContainer
                                }>

                                <View
                                    style={[
                                        styles.quickStatusDot,
                                        {
                                            backgroundColor:
                                                quickStatusColor,
                                        },
                                    ]}
                                />

                                <View>

                                    <Text
                                        style={
                                            styles.quickPanelTitle
                                        }>
                                        {quickStatusTitle}
                                    </Text>

                                    <Text
                                        style={
                                            styles.quickPanelCount
                                        }>
                                        {quickEmployees.length}{' '}
                                        employees
                                    </Text>

                                </View>

                            </View>

                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={
                                    closeQuickStatus
                                }>

                                <Text
                                    style={
                                        styles.closeButtonText
                                    }>
                                    ×
                                </Text>

                            </TouchableOpacity>

                        </View>

                        {/* Employee List */}

                        <ScrollView
                            showsVerticalScrollIndicator={
                                false
                            }
                            contentContainerStyle={
                                styles.quickEmployeeList
                            }>

                            {quickEmployees.map(
                                employee => (
                                    <TouchableOpacity
                                        key={employee.id}
                                        style={
                                            styles.quickEmployeeCard
                                        }
                                        activeOpacity={0.75}
                                        onPress={() => {
                                            closeQuickStatus();

                                            navigation.navigate(
                                                'Employees',
                                                {
                                                    screen:
                                                        'EmployeeList',
                                                    params: {
                                                        search:
                                                            employee.id,
                                                    },
                                                },
                                            );
                                        }}>

                                        <View
                                            style={
                                                styles.quickEmployeeInfo
                                            }>

                                            <Text
                                                style={
                                                    styles.quickEmployeeName
                                                }>
                                                {
                                                    employee.name
                                                }
                                            </Text>

                                            <Text
                                                style={
                                                    styles.quickEmployeeId
                                                }>
                                                {
                                                    employee.id
                                                }
                                            </Text>

                                            <Text
                                                style={
                                                    styles.quickEmployeeDesignation
                                                }>
                                                {
                                                    employee.designation
                                                }
                                            </Text>

                                        </View>

                                        <View
                                            style={
                                                styles.quickEmployeeStatus
                                            }>

                                            <View
                                                style={[
                                                    styles.quickStatusIndicator,
                                                    {
                                                        backgroundColor:
                                                            quickStatusColor,
                                                    },
                                                ]}
                                            />

                                        </View>

                                    </TouchableOpacity>
                                ),
                            )}

                        </ScrollView>

                        {/* Panel Footer */}

                        <TouchableOpacity
                            style={
                                styles.quickPanelFooter
                            }
                            activeOpacity={0.75}
                            onPress={() => {
                                const status =
                                    quickStatus;

                                closeQuickStatus();

                                if (status) {
                                    openStatusEmployees(
                                        status,
                                    );
                                }
                            }}>

                            <Text
                                style={
                                    styles.quickPanelFooterText
                                }>
                                View All Employees →
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>

            </Modal>

        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    content: {
        paddingHorizontal: 15,
        paddingBottom: 130,
    },

    // --------------------------------
    // Header
    // --------------------------------

    header: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 2,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        marginBottom: 10,
        borderRadius: 10,
        paddingTop: 6,
    },

    companySection: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    logoContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },

    companyName: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
    },

    notificationButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    notificationIcon: {
        fontSize: 21,
    },

    notificationBadge: {
        position: 'absolute',
        top: 3,
        right: 3,
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#EF4444',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 3,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },

    notificationBadgeText: {
        fontSize: 9,
        fontWeight: '700',
        color: '#FFFFFF',
    },

    // --------------------------------
    // Dashboard
    // --------------------------------

    dashboardTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
        marginTop: 20,
        marginBottom: 18,
    },

    // --------------------------------
    // Search
    // --------------------------------

    searchContainer: {
        height: 50,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: 25,
    },

    searchIcon: {
        fontSize: 18,
        marginRight: 8,
    },

    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#111827',
    },

    clearButton: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },

    clearText: {
        fontSize: 22,
        color: '#6B7280',
        lineHeight: 22,
    },

    searchButton: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 7,
        backgroundColor: '#2563EB',
    },

    searchButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },

    // --------------------------------
    // Section
    // --------------------------------

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 12,
    },

    viewAll: {
        fontSize: 14,
        color: '#2563EB',
        fontWeight: '600',
    },

    // --------------------------------
    // Attendance
    // --------------------------------

    attendanceRow: {
        flexDirection: 'row',
    },

    attendanceCard: {
        flex: 1,
        minHeight: 120,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 16,
        marginRight: 10,
    },

    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    cardTitle: {
        fontSize: 14,
        color: '#2563EB',
        fontWeight: '600',
    },

    cardNumber: {
        fontSize: 30,
        fontWeight: '700',
        color: '#111827',
        marginTop: 12,
    },

    cardTotal: {
        fontSize: 12,
        color: '#2563EB',
        marginTop: 2,
    },

    absentCard: {
        minHeight: 120,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        marginTop: 12,
        marginBottom: 25,
        padding: 16,
    },

    presentIndicator: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: '#22C55E',
    },

    leaveIndicator: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: '#EAB308',
    },

    absentIndicator: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: '#EF4444',
    },

    // --------------------------------
    // Active Requests
    // --------------------------------

    requestCount: {
        fontSize: 14,
        fontWeight: '700',
        color: '#D97706',
        backgroundColor: '#FEF3C7',
        paddingHorizontal: 9,
        paddingVertical: 4,
        borderRadius: 12,
    },

    requestCard: {
        minHeight: 90,
        borderWidth: 1,
        borderColor: '#FDE68A',
        backgroundColor: '#FFFBEB',
        borderRadius: 12,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },

    requestIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FEF3C7',
        alignItems: 'center',
        justifyContent: 'center',
    },

    requestIcon: {
        fontSize: 18,
    },

    requestContent: {
        flex: 1,
        marginLeft: 12,
    },

    requestTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#92400E',
    },

    requestEmployee: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        marginTop: 3,
    },

    requestDetails: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },

    reviewText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2563EB',
    },

    // --------------------------------
    // Recent Activity
    // --------------------------------

    activityCard: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 16,
    },

    activityItem: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 12,
    },

    // =================================
    // QUICK EMPLOYEE MODAL
    // =================================

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    quickPanel: {
        width: '100%',
        maxHeight: '75%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 15,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 12,
    },

    quickPanelHeader: {
        minHeight: 75,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },

    quickTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    quickStatusDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 10,
    },

    quickPanelTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111827',
    },

    quickPanelCount: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 3,
    },

    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
    },

    closeButtonText: {
        fontSize: 25,
        lineHeight: 27,
        color: '#374151',
    },

    quickEmployeeList: {
        paddingHorizontal: 14,
        paddingVertical: 10,
    },

    quickEmployeeCard: {
        minHeight: 70,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    quickEmployeeInfo: {
        flex: 1,
    },

    quickEmployeeName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
    },

    quickEmployeeId: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 3,
    },

    quickEmployeeDesignation: {
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 2,
    },

    quickEmployeeStatus: {
        paddingLeft: 10,
    },

    quickStatusIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },

    quickPanelFooter: {
        height: 52,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
    },

    quickPanelFooterText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2563EB',
    },
});