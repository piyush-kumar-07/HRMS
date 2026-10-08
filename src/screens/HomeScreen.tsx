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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation<any>();
    const pendingRequests = 3;

    const [search, setSearch] = useState('');
    const openEmployees = () => {
        Keyboard.dismiss();

        navigation.navigate('Employees');
    };

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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>

                {/* Header */}
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
                        onPress={() => navigation.navigate('ActiveRequests')}>

                        <Text style={styles.notificationIcon}>🔔</Text>

                        {pendingRequests > 0 && (
                            <View style={styles.notificationBadge}>
                                {pendingRequests < 4 ? (
                                    <Text style={styles.notificationBadgeText}>
                                        {pendingRequests}
                                    </Text>
                                ) : null}
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Dashboard Title */}
                <Text style={styles.dashboardTitle}>
                    Dashboard
                </Text>

                {/* Search */}
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>

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
                            <Text style={styles.clearText}>×</Text>
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

                {/* Today's Attendance */}
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

                {/* Attendance Cards */}
                <View style={styles.attendanceRow}>

                    {/* Present */}
                    <View style={styles.attendanceCard}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>
                                Present
                            </Text>

                            <View style={styles.presentIndicator} />
                        </View>

                        <Text style={styles.cardNumber}>
                            42
                        </Text>

                        <Text style={styles.cardTotal}>
                            / 50 Employees
                        </Text>
                    </View>

                    {/* On Leave */}
                    <View style={styles.attendanceCard}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>
                                On Leave
                            </Text>

                            <View style={styles.leaveIndicator} />
                        </View>

                        <Text style={styles.cardNumber}>
                            5
                        </Text>

                        <Text style={styles.cardTotal}>
                            Employees
                        </Text>
                    </View>
                </View>

                {/* Absent */}
                <View style={styles.absentCard}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>
                            Absent
                        </Text>

                        <View style={styles.absentIndicator} />
                    </View>

                    <Text style={styles.cardNumber}>
                        3
                    </Text>

                    <Text style={styles.cardTotal}>
                        Employees
                    </Text>
                </View>

                {/* Active Requests */}
                {/* Active Requests */}

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
                    onPress={() => navigation.navigate('ActiveRequests')}>

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
                {/* Recent Activity */}
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
        paddingBottom: 30,
    },

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

    dashboardTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
        marginTop: 20,
        marginBottom: 18,
    },

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
});