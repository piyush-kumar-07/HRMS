import React, { useEffect, useState } from 'react';

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

    Alert,

} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { employees } from './EmployeeScreen';

import {

    getAttendanceActivities,

    subscribeToAttendanceActivities,

    type AttendanceActivity,

} from '../utils/attendanceActivity';



type AttendanceStatus = 'present' | 'leave' | 'absent';



type Announcement = {

    id: string;

    title: string;

    message: string;

    department: string;

    recipients: number;

    createdAt: string;

};



const HomeScreen = () => {

    const navigation = useNavigation<any>();

    const pendingRequests = 3;



    const [search, setSearch] = useState('');

    const [attendanceActivities, setAttendanceActivities] =

        useState<AttendanceActivity[]>(getAttendanceActivities());



    const [quickStatus, setQuickStatus] =

        useState<AttendanceStatus | null>(null);



    const [notificationModalVisible, setNotificationModalVisible] =

        useState(false);

    const [composeVisible, setComposeVisible] = useState(false);

    const [notificationTitle, setNotificationTitle] = useState('');

    const [notificationMessage, setNotificationMessage] = useState('');

    const [announcements, setAnnouncements] = useState<Announcement[]>([]);



    useEffect(() => {

        const unsubscribe = subscribeToAttendanceActivities(items => {

            setAttendanceActivities(items);

        });



        return () => {

            unsubscribe();

        };

    }, []);



    const searchEmployees = () => {

        const searchText = search.trim();

        Keyboard.dismiss();



        if (!searchText) {

            navigation.navigate('Employees');

            return;

        }



        navigation.navigate('Employees', {

            screen: 'EmployeeList',

            params: { search: searchText },

        });

    };



    const openEmployees = () => {

        Keyboard.dismiss();

        navigation.navigate('Employees');

    };



    const openStatusEmployees = (status: AttendanceStatus) => {

        Keyboard.dismiss();



        navigation.getParent()?.navigate('Employees', {

            screen: 'EmployeeList',

            params: { filter: status },

        });

    };



    const openQuickStatus = (status: AttendanceStatus) => {

        Keyboard.dismiss();

        setQuickStatus(status);

    };

    const [selectedDepartment, setSelectedDepartment] =

        useState('All Departments');



    const [departmentDropdownVisible, setDepartmentDropdownVisible] =

        useState(false);

    const departments = [

        'All Departments',

        ...Array.from(

            new Set(

                employees

                    .map(employee => employee.department)

                    .filter(

                        (department): department is string =>

                            typeof department === 'string' &&

                            department.trim().length > 0,

                    ),

            ),

        ),

    ];



    const recipientEmployees =

        selectedDepartment === 'All Departments'

            ? employees

            : employees.filter(

                employee =>

                    employee.department === selectedDepartment,

            );



    const closeQuickStatus = () => setQuickStatus(null);



    const quickEmployees = quickStatus

        ? employees.filter(employee => employee.status === quickStatus)

        : [];



    const quickStatusTitle =

        quickStatus === 'present'

            ? 'Present Employees'

            : quickStatus === 'leave'

                ? 'Employees On Leave'

                : 'Absent Employees';



    const quickStatusColor =

        quickStatus === 'present'

            ? '#22C55E'

            : quickStatus === 'leave'

                ? '#EAB308'

                : '#EF4444';

    const sendAnnouncement = () => {

        const trimmedTitle = notificationTitle.trim();

        const trimmedMessage = notificationMessage.trim();



        if (!trimmedTitle || !trimmedMessage) {

            Alert.alert(

                'Missing Information',

                'Enter both an announcement title and message.',

            );

            return;

        }



        if (recipientEmployees.length === 0) {

            Alert.alert(

                'No Employees',

                'No employees were found in this department.',

            );

            return;

        }



        Alert.alert(

            'Confirm Announcement',

            " `Send to ${selectedDepartment} (${recipientEmployees.length} employees)?",

            [

                { text: 'Cancel', style: 'cancel' },

                {

                    text: 'Send',

                    onPress: () => {

                        const announcement: Announcement = {

                            id: Date.now().toString(),

                            title: trimmedTitle,

                            message: trimmedMessage,

                            department: selectedDepartment,

                            recipients: recipientEmployees.length,

                            createdAt: new Date().toLocaleString(),

                        };



                        setAnnouncements(previous => [

                            announcement,

                            ...previous,

                        ]);



                        setNotificationTitle('');

                        setNotificationMessage('');

                        setSelectedDepartment('All Departments');

                        setComposeVisible(false);



                        Alert.alert(

                            'Announcement Created',

                            " Recorded for ${announcement.recipients} employees.",

                        );

                    },

                },

            ],

        );

    };



    return (

        <SafeAreaView style={styles.container}>

            <ScrollView

                contentContainerStyle={styles.content}

                showsVerticalScrollIndicator={false}

                keyboardShouldPersistTaps="handled"

            >



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

                        onPress={() => setNotificationModalVisible(true)}

                    >

                        <Text style={styles.notificationIcon}>🔔</Text>



                        {pendingRequests > 0 && (

                            <View style={styles.notificationBadge}>

                                <Text style={styles.notificationBadgeText}>

                                    {pendingRequests}

                                </Text>

                            </View>

                        )}

                    </TouchableOpacity>

                </View>



                <Text style={styles.dashboardTitle}>Dashboard</Text>





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

                            style={styles.clearButton}

                        >

                            <Text style={styles.clearText}>×</Text>

                        </TouchableOpacity>

                    )}



                    <TouchableOpacity

                        style={styles.searchButton}

                        onPress={searchEmployees}

                    >

                        <Text style={styles.searchButtonText}>Search</Text>

                    </TouchableOpacity>

                </View>





                <View style={styles.sectionHeader}>

                    <Text style={styles.sectionTitle}>Today's Attendance</Text>

                    <TouchableOpacity onPress={openEmployees}>

                        <Text style={styles.viewAll}>View All</Text>

                    </TouchableOpacity>

                </View>



                <View style={styles.attendanceRow}>

                    <TouchableOpacity

                        style={styles.attendanceCard}

                        activeOpacity={0.8}

                        onPress={() => openStatusEmployees('present')}

                        onLongPress={() => openQuickStatus('present')}

                        delayLongPress={500}

                    >

                        <View style={styles.cardHeader}>

                            <Text style={styles.cardTitle}>Present</Text>

                            <View style={styles.presentIndicator} />

                        </View>

                        <Text style={styles.cardNumber}>42</Text>

                        <Text style={styles.cardTotal}>/ 50 Employees</Text>

                    </TouchableOpacity>



                    <TouchableOpacity

                        style={styles.attendanceCard}

                        activeOpacity={0.8}

                        onPress={() => openStatusEmployees('leave')}

                        onLongPress={() => openQuickStatus('leave')}

                        delayLongPress={500}

                    >

                        <View style={styles.cardHeader}>

                            <Text style={styles.cardTitle}>On Leave</Text>

                            <View style={styles.leaveIndicator} />

                        </View>

                        <Text style={styles.cardNumber}>5</Text>

                        <Text style={styles.cardTotal}>Employees</Text>

                    </TouchableOpacity>

                </View>



                <TouchableOpacity

                    style={styles.absentCard}

                    activeOpacity={0.8}

                    onPress={() => openStatusEmployees('absent')}

                    onLongPress={() => openQuickStatus('absent')}

                    delayLongPress={500}

                >

                    <View style={styles.cardHeader}>

                        <Text style={styles.cardTitle}>Absent</Text>

                        <View style={styles.absentIndicator} />

                    </View>

                    <Text style={styles.cardNumber}>6</Text>

                    <Text style={styles.cardTotal}>Employees</Text>

                </TouchableOpacity>





                <View style={styles.sectionHeader}>

                    <Text style={styles.sectionTitle}>Active Requests</Text>

                    <Text style={styles.requestCount}>1</Text>

                </View>



                <TouchableOpacity

                    style={styles.requestCard}

                    activeOpacity={0.75}

                    onPress={() => navigation.navigate('ActiveRequests')}

                >

                    <View style={styles.requestIconContainer}>

                        <Text style={styles.requestIcon}>🟡</Text>

                    </View>



                    <View style={styles.requestContent}>

                        <Text style={styles.requestTitle}>Leave Request</Text>

                        <Text style={styles.requestEmployee}>Rahul Kumar</Text>

                        <Text style={styles.requestDetails}>

                            2 days • Casual Leave

                        </Text>

                    </View>



                    <Text style={styles.reviewText}>Review →</Text>

                </TouchableOpacity>





                <Text style={styles.sectionTitle}>Recent Activity</Text>



                <View style={styles.activityCard}>

                    {attendanceActivities.length > 0 ? (

                        attendanceActivities.map(activity => (

                            <View key={activity.id} style={styles.activityEntry}>

                                <Text style={styles.activityItem}>

                                    • {activity.employeeName} ({activity.employeeId}){' '}

                                    {activity.action}

                                </Text>

                                <Text style={styles.activityMeta}>

                                    By {activity.by} · {activity.timestamp}

                                </Text>

                            </View>

                        ))

                    ) : (

                        <>

                            <Text style={styles.activityItem}>• New employee added</Text>

                            <Text style={styles.activityItem}>

                                • Leave request submitted

                            </Text>

                            <Text style={styles.activityItem}>

                                • Employee profile updated

                            </Text>

                        </>

                    )}

                </View>

            </ScrollView>





            <Modal

                visible={notificationModalVisible}

                transparent

                animationType="slide"

                onRequestClose={() => {

                    setNotificationModalVisible(false);

                    setComposeVisible(false);

                }}

            >

                <View style={styles.modalOverlay}>

                    <View style={styles.notificationPanel}>

                        <View style={styles.panelHeader}>

                            <View style={styles.flex}>

                                <Text style={styles.panelTitle}>Notifications</Text>

                                <Text style={styles.panelSubtitle}>

                                    Admin announcements

                                </Text>

                            </View>



                            <TouchableOpacity

                                style={styles.closeButton}

                                onPress={() => {

                                    setNotificationModalVisible(false);

                                    setComposeVisible(false);

                                }}

                            >

                                <Text style={styles.closeButtonText}>×</Text>

                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity

                            style={styles.leaveRequestSection}

                            activeOpacity={0.8}

                            onPress={() => {

                                setNotificationModalVisible(false);

                                setComposeVisible(false);

                                navigation.navigate('ActiveRequests');

                            }}

                        >

                            <View style={styles.leaveRequestIcon}>

                                <Text style={styles.leaveIconText}>📩</Text>

                            </View>



                            <View style={styles.leaveRequestInfo}>

                                <Text style={styles.leaveRequestTitle}>

                                    Leave Requests

                                </Text>



                                <Text style={styles.leaveRequestSubtitle}>

                                    Review pending employee leave applications

                                </Text>

                            </View>



                            <View style={styles.leaveRequestBadge}>

                                <Text style={styles.leaveRequestBadgeText}>

                                    {pendingRequests}

                                </Text>

                            </View>



                            <Text style={styles.leaveRequestArrow}>›</Text>

                        </TouchableOpacity>



                        <TouchableOpacity

                            style={styles.sendAllButton}

                            activeOpacity={0.8}

                            onPress={() => setComposeVisible(true)}

                        >

                            <Text style={styles.sendAllIcon}>✉</Text>

                            <View style={styles.flex}>

                                <Text style={styles.sendAllTitle}>

                                    Send to All Employees

                                </Text>

                                <Text style={styles.sendAllSubtitle}>

                                    Create a company-wide announcement

                                </Text>

                            </View>

                            <Text style={styles.sendAllArrow}>›</Text>

                        </TouchableOpacity>



                        {composeVisible ? (

                            <ScrollView

                                keyboardShouldPersistTaps="handled"

                                showsVerticalScrollIndicator={false}

                            >

                                <Text style={styles.fieldLabel}>

                                    Send Announcement To

                                </Text>



                                <TouchableOpacity

                                    style={styles.departmentDropdown}

                                    activeOpacity={0.8}

                                    onPress={() => setDepartmentDropdownVisible(true)}

                                >

                                    <Text style={styles.departmentDropdownText}>

                                        {selectedDepartment}

                                    </Text>



                                    <Text style={styles.dropdownArrow}>▼</Text>

                                </TouchableOpacity>



                                <Text style={styles.recipientCount}>

                                    {recipientEmployees.length} employee(s) will receive this announcement

                                </Text>



                                <Modal

                                    visible={departmentDropdownVisible}

                                    transparent

                                    animationType="fade"

                                    onRequestClose={() => setDepartmentDropdownVisible(false)}

                                >

                                    <TouchableOpacity

                                        style={styles.dropdownOverlay}

                                        activeOpacity={1}

                                        onPress={() => setDepartmentDropdownVisible(false)}

                                    >

                                        <View style={styles.departmentDropdownList}>

                                            <Text style={styles.dropdownModalTitle}>

                                                Select Department

                                            </Text>



                                            <ScrollView>

                                                {departments.map(department => (

                                                    <TouchableOpacity

                                                        key={department}

                                                        style={styles.departmentOption}

                                                        onPress={() => {

                                                            setSelectedDepartment(department);

                                                            setDepartmentDropdownVisible(false);

                                                        }}

                                                    >

                                                        <Text

                                                            style={[

                                                                styles.departmentOptionText,

                                                                selectedDepartment === department &&

                                                                styles.selectedDepartmentText,

                                                            ]}

                                                        >

                                                            {department}

                                                        </Text>



                                                        {selectedDepartment === department && (

                                                            <Text style={styles.selectedCheck}>✓</Text>

                                                        )}

                                                    </TouchableOpacity>

                                                ))}

                                            </ScrollView>

                                        </View>

                                    </TouchableOpacity>

                                </Modal>

                                <Text style={styles.formHeading}>

                                    New announcement

                                </Text>



                                <Text style={styles.fieldLabel}>Title</Text>

                                <TextInput

                                    style={styles.formInput}

                                    placeholder="e.g. Holiday announcement"

                                    placeholderTextColor="#9CA3AF"

                                    value={notificationTitle}

                                    onChangeText={setNotificationTitle}

                                    maxLength={100}

                                />



                                <Text style={styles.fieldLabel}>Message</Text>

                                <TextInput

                                    style={[styles.formInput, styles.messageInput]}

                                    placeholder="Write your message for all employees..."

                                    placeholderTextColor="#9CA3AF"

                                    value={notificationMessage}

                                    onChangeText={setNotificationMessage}

                                    multiline

                                    numberOfLines={5}

                                    textAlignVertical="top"

                                    maxLength={2000}

                                />



                                <View style={styles.recipientInfo}>

                                    <Text style={styles.recipientIcon}>👥</Text>



                                    <View style={styles.flex}>

                                        <Text style={styles.recipientTitle}>

                                            {selectedDepartment}

                                        </Text>



                                        <Text style={styles.recipientSubtitle}>

                                            {recipientEmployees.length} recipients

                                        </Text>

                                    </View>

                                </View>



                                <TouchableOpacity

                                    style={styles.sendButton}

                                    onPress={sendAnnouncement}

                                >

                                    <Text style={styles.sendButtonText}>

                                        Send announcement

                                    </Text>

                                </TouchableOpacity>



                                <TouchableOpacity

                                    style={styles.cancelComposeButton}

                                    onPress={() => setComposeVisible(false)}

                                >

                                    <Text style={styles.cancelComposeText}>Cancel</Text>

                                </TouchableOpacity>

                            </ScrollView>

                        ) : (

                            <ScrollView

                                style={styles.announcementList}

                                showsVerticalScrollIndicator={false}

                            >

                                <Text style={styles.listHeading}>

                                    Recent announcements

                                </Text>



                                {announcements.length === 0 ? (

                                    <View style={styles.emptyAnnouncements}>

                                        <Text style={styles.emptyIcon}>📭</Text>

                                        <Text style={styles.emptyTitle}>

                                            No announcements yet

                                        </Text>

                                        <Text style={styles.emptyText}>

                                            Messages you create will appear here during this

                                            session.

                                        </Text>

                                    </View>

                                ) : (

                                    announcements.map(item => (

                                        <View key={item.id} style={styles.announcementCard}>

                                            <Text style={styles.announcementTitle}>

                                                {item.title}

                                            </Text>

                                            <Text style={styles.announcementMessage}>

                                                {item.message}

                                            </Text>

                                            <Text style={styles.announcementMeta}>

                                                Department: {item.department}

                                            </Text>



                                            <Text style={styles.announcementMeta}>

                                                Recipients: {item.recipients} employees

                                            </Text>



                                            <Text style={styles.announcementDate}>

                                                {item.createdAt}

                                            </Text>

                                        </View>

                                    ))

                                )}

                            </ScrollView>

                        )}

                    </View>

                </View>

            </Modal>



            /* Quick attendance employee panel */

            <Modal

                visible={quickStatus !== null}

                transparent

                animationType="fade"

                onRequestClose={closeQuickStatus}

            >

                <View style={styles.modalOverlay}>

                    <View style={styles.quickPanel}>

                        <View style={styles.quickPanelHeader}>

                            <View style={styles.quickTitleContainer}>

                                <View

                                    style={[

                                        styles.quickStatusDot,

                                        { backgroundColor: quickStatusColor },

                                    ]}

                                />

                                <View>

                                    <Text style={styles.quickPanelTitle}>

                                        {quickStatusTitle}

                                    </Text>

                                    <Text style={styles.quickPanelCount}>

                                        {quickEmployees.length} employees

                                    </Text>

                                </View>

                            </View>



                            <TouchableOpacity

                                style={styles.closeButton}

                                onPress={closeQuickStatus}

                            >

                                <Text style={styles.closeButtonText}>×</Text>

                            </TouchableOpacity>

                        </View>



                        <ScrollView

                            showsVerticalScrollIndicator={false}

                            contentContainerStyle={styles.quickEmployeeList}

                        >

                            {quickEmployees.map(employee => (

                                <TouchableOpacity

                                    key={employee.id}

                                    style={styles.quickEmployeeCard}

                                    activeOpacity={0.75}

                                    onPress={() => {

                                        closeQuickStatus();

                                        navigation.navigate('Employees', {

                                            screen: 'EmployeeList',

                                            params: { search: employee.id },

                                        });

                                    }}

                                >

                                    <View style={styles.quickEmployeeInfo}>

                                        <Text style={styles.quickEmployeeName}>

                                            {employee.name}

                                        </Text>

                                        <Text style={styles.quickEmployeeId}>

                                            {employee.id}

                                        </Text>

                                        <Text style={styles.quickEmployeeDesignation}>

                                            {employee.designation}

                                        </Text>

                                    </View>



                                    <View style={styles.quickEmployeeStatus}>

                                        <View

                                            style={[

                                                styles.quickStatusIndicator,

                                                { backgroundColor: quickStatusColor },

                                            ]}

                                        />

                                    </View>

                                </TouchableOpacity>

                            ))}

                        </ScrollView>



                        <TouchableOpacity

                            style={styles.quickPanelFooter}

                            activeOpacity={0.75}

                            onPress={() => {

                                const status = quickStatus;

                                closeQuickStatus();

                                if (status) openStatusEmployees(status);

                            }}

                        >

                            <Text style={styles.quickPanelFooterText}>

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

    container: { flex: 1, backgroundColor: '#FFFFFF' },

    content: { paddingHorizontal: 15, paddingBottom: 130 },

    flex: { flex: 1 },



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

        shadowOffset: { width: 0, height: 2 },

        shadowOpacity: 0.08,

        shadowRadius: 4,

        marginBottom: 10,

        borderRadius: 10,

        paddingTop: 6,

    },

    companySection: { flexDirection: 'row', alignItems: 'center' },

    logoContainer: {

        width: 40,

        height: 40,

        borderRadius: 20,

        overflow: 'hidden',

        alignItems: 'center',

        justifyContent: 'center',

    },

    logo: { width: 40, height: 40, resizeMode: 'contain' },

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

    notificationIcon: { fontSize: 21 },

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

    searchIcon: { fontSize: 18, marginRight: 8 },

    searchInput: { flex: 1, fontSize: 15, color: '#111827' },

    clearButton: {

        width: 28,

        height: 28,

        alignItems: 'center',

        justifyContent: 'center',

    },

    clearText: { fontSize: 22, color: '#6B7280', lineHeight: 22 },

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

    viewAll: { fontSize: 14, color: '#2563EB', fontWeight: '600' },

    attendanceRow: { flexDirection: 'row' },

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

    cardTitle: { fontSize: 14, color: '#2563EB', fontWeight: '600' },

    cardNumber: {

        fontSize: 30,

        fontWeight: '700',

        color: '#111827',

        marginTop: 12,

    },

    cardTotal: { fontSize: 12, color: '#2563EB', marginTop: 2 },

    presentIndicator: {

        width: 10,

        height: 10,

        borderRadius: 5,

        backgroundColor: '#22C55E',

    },

    leaveIndicator: {

        width: 10,

        height: 10,

        borderRadius: 5,

        backgroundColor: '#EAB308',

    },

    absentIndicator: {

        width: 10,

        height: 10,

        borderRadius: 5,

        backgroundColor: '#EF4444',

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



    requestCount: { color: '#2563EB', fontSize: 14, fontWeight: '700' },

    requestCard: {

        flexDirection: 'row',

        alignItems: 'center',

        backgroundColor: '#FFFFFF',

        borderWidth: 1,

        borderColor: '#E5E7EB',

        borderRadius: 12,

        padding: 14,

        marginBottom: 25,

    },

    requestIconContainer: { marginRight: 12 },

    requestIcon: { fontSize: 22 },

    requestContent: { flex: 1 },

    requestTitle: { fontSize: 14, fontWeight: '700', color: '#111827' },

    requestEmployee: { fontSize: 13, color: '#4B5563', marginTop: 4 },

    requestDetails: { fontSize: 12, color: '#6B7280', marginTop: 3 },

    reviewText: { color: '#2563EB', fontSize: 12, fontWeight: '600' },



    activityCard: {

        backgroundColor: '#FFFFFF',

        borderWidth: 1,

        borderColor: '#E5E7EB',

        borderRadius: 12,

        padding: 14,

        marginBottom: 20,

    },

    activityEntry: {

        paddingVertical: 7,

        borderBottomWidth: 1,

        borderBottomColor: '#F3F4F6',

    },

    activityItem: { color: '#374151', fontSize: 13, lineHeight: 20 },

    activityMeta: { color: '#9CA3AF', fontSize: 11, marginTop: 4 },



    modalOverlay: {

        flex: 1,

        justifyContent: 'flex-end',

        backgroundColor: 'rgba(20,30,45,0.4)',

    },

    notificationPanel: {

        maxHeight: '90%',

        minHeight: '55%',

        backgroundColor: '#FFFFFF',

        borderTopLeftRadius: 24,

        borderTopRightRadius: 24,

        paddingHorizontal: 20,

        paddingTop: 18,

        paddingBottom: 28,

    },

    panelHeader: {

        flexDirection: 'row',

        alignItems: 'center',

        marginBottom: 20,

    },

    fieldLabel: {

        fontSize: 14,

        fontWeight: '600',

        color: '#374151',

        marginBottom: 8,

    },



    departmentDropdown: {

        minHeight: 48,

        borderWidth: 1,

        borderColor: '#D1D5DB',

        borderRadius: 10,

        paddingHorizontal: 14,

        flexDirection: 'row',

        alignItems: 'center',

        justifyContent: 'space-between',

        marginBottom: 8,

    },



    departmentDropdownText: {

        fontSize: 14,

        color: '#111827',

    },



    dropdownArrow: {

        fontSize: 12,

        color: '#6B7280',

    },



    recipientCount: {

        fontSize: 12,

        color: '#6B7280',

        marginBottom: 16,

    },



    dropdownOverlay: {

        flex: 1,

        backgroundColor: 'rgba(0,0,0,0.4)',

        justifyContent: 'center',

        paddingHorizontal: 28,

    },



    departmentDropdownList: {

        backgroundColor: '#FFFFFF',

        borderRadius: 14,

        padding: 16,

        maxHeight: '70%',

    },



    dropdownModalTitle: {

        fontSize: 17,

        fontWeight: '700',

        color: '#111827',

        marginBottom: 12,

    },



    departmentOption: {

        minHeight: 46,

        borderBottomWidth: 1,

        borderBottomColor: '#F3F4F6',

        flexDirection: 'row',

        alignItems: 'center',

        justifyContent: 'space-between',

        paddingVertical: 10,

    },



    departmentOptionText: {

        fontSize: 14,

        color: '#374151',

    },



    selectedDepartmentText: {

        color: '#2563EB',

        fontWeight: '700',

    },



    selectedCheck: {

        fontSize: 17,

        color: '#2563EB',

        fontWeight: '700',

    },



    panelTitle: { fontSize: 22, fontWeight: '700', color: '#111827' },

    panelSubtitle: { fontSize: 12, color: '#6B7280', marginTop: 4 },

    closeButton: {

        width: 38,

        height: 38,

        alignItems: 'center',

        justifyContent: 'center',

    },

    closeButtonText: { fontSize: 27, color: '#374151', lineHeight: 29 },

    leaveRequestSection: {

        flexDirection: 'row',

        alignItems: 'center',

        padding: 13,

        borderWidth: 1,

        borderColor: '#FDE68A',

        backgroundColor: '#FFFBEB',

        borderRadius: 12,

        marginBottom: 16,

    },



    leaveRequestIcon: {

        width: 42,

        height: 42,

        borderRadius: 10,

        backgroundColor: '#FEF3C7',

        alignItems: 'center',

        justifyContent: 'center',

        marginRight: 11,

    },



    leaveIconText: {

        fontSize: 20,

    },



    leaveRequestInfo: {

        flex: 1,

    },



    leaveRequestTitle: {

        fontSize: 14,

        fontWeight: '700',

        color: '#111827',

    },



    leaveRequestSubtitle: {

        fontSize: 11,

        color: '#6B7280',

        marginTop: 4,

    },



    leaveRequestBadge: {

        minWidth: 24,

        height: 24,

        paddingHorizontal: 6,

        borderRadius: 12,

        backgroundColor: '#DC2626',

        alignItems: 'center',

        justifyContent: 'center',

    },



    leaveRequestBadgeText: {

        color: '#FFFFFF',

        fontSize: 11,

        fontWeight: '700',

    },



    leaveRequestArrow: {

        fontSize: 24,

        color: '#6B7280',

        marginLeft: 8,

    },

    sendAllButton: {

        flexDirection: 'row',

        alignItems: 'center',

        padding: 14,

        borderRadius: 13,

        backgroundColor: '#EFF6FF',

        borderWidth: 1,

        borderColor: '#DBEAFE',

        marginBottom: 20,

    },

    sendAllIcon: { fontSize: 23, color: '#2563EB', marginRight: 12 },

    sendAllTitle: { fontSize: 14, fontWeight: '700', color: '#1D4ED8' },

    sendAllSubtitle: { fontSize: 11, color: '#4B5563', marginTop: 4 },

    sendAllArrow: { fontSize: 27, color: '#2563EB', marginLeft: 8 },



    formHeading: {

        fontSize: 17,

        fontWeight: '700',

        color: '#111827',

        marginBottom: 18,

    },



    formInput: {

        minHeight: 48,

        borderWidth: 1,

        borderColor: '#D1D5DB',

        borderRadius: 10,

        paddingHorizontal: 12,

        paddingVertical: 12,

        fontSize: 14,

        color: '#111827',

        backgroundColor: '#FFFFFF',

    },

    messageInput: { minHeight: 120 },

    recipientInfo: {

        flexDirection: 'row',

        alignItems: 'center',

        backgroundColor: '#F9FAFB',

        borderRadius: 10,

        padding: 13,

        marginTop: 18,

    },

    recipientIcon: { fontSize: 21, marginRight: 12 },

    recipientTitle: { fontSize: 13, fontWeight: '700', color: '#374151' },

    recipientSubtitle: { fontSize: 12, color: '#6B7280', marginTop: 3 },

    sendButton: {

        minHeight: 50,

        borderRadius: 11,

        backgroundColor: '#2563EB',

        alignItems: 'center',

        justifyContent: 'center',

        marginTop: 18,

    },

    sendButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },

    cancelComposeButton: {

        minHeight: 44,

        alignItems: 'center',

        justifyContent: 'center',

        marginTop: 6,

    },

    cancelComposeText: { color: '#4B5563', fontSize: 14, fontWeight: '600' },



    announcementList: { flexGrow: 0 },

    listHeading: {

        fontSize: 15,

        fontWeight: '700',

        color: '#111827',

        marginBottom: 12,

    },

    emptyAnnouncements: {

        alignItems: 'center',

        justifyContent: 'center',

        paddingHorizontal: 20,

        paddingVertical: 28,

        backgroundColor: '#F9FAFB',

        borderRadius: 12,

    },

    emptyIcon: { fontSize: 28, marginBottom: 8 },

    emptyTitle: { fontSize: 14, fontWeight: '700', color: '#374151' },

    emptyText: {

        fontSize: 12,

        lineHeight: 18,

        textAlign: 'center',

        color: '#6B7280',

        marginTop: 6,

    },

    announcementCard: {

        borderWidth: 1,

        borderColor: '#E5E7EB',

        borderRadius: 12,

        padding: 13,

        marginBottom: 12,

    },

    announcementTitle: {

        fontSize: 14,

        fontWeight: '700',

        color: '#111827',

    },

    announcementMessage: {

        fontSize: 13,

        lineHeight: 20,

        color: '#4B5563',

        marginTop: 8,

    },

    announcementMeta: {

        fontSize: 11,

        fontWeight: '600',

        color: '#2563EB',

        marginTop: 10,

    },

    announcementDate: { fontSize: 10, color: '#9CA3AF', marginTop: 4 },



    quickPanel: {

        maxHeight: '80%',

        backgroundColor: '#FFFFFF',

        borderRadius: 20,

        marginHorizontal: 18,

        overflow: 'hidden',

    },

    quickPanelHeader: {

        flexDirection: 'row',

        alignItems: 'center',

        justifyContent: 'space-between',

        paddingHorizontal: 18,

        paddingTop: 15,

        paddingBottom: 12,

        borderBottomWidth: 1,

        borderBottomColor: '#F3F4F6',

    },

    quickTitleContainer: {

        flexDirection: 'row',

        alignItems: 'center',

        gap: 10,

    },

    quickStatusDot: { width: 10, height: 10, borderRadius: 5 },

    quickPanelTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },

    quickPanelCount: { fontSize: 12, color: '#6B7280', marginTop: 3 },

    quickEmployeeList: { paddingHorizontal: 14, paddingVertical: 10 },

    quickEmployeeCard: {

        minHeight: 70,

        borderBottomWidth: 1,

        borderBottomColor: '#F3F4F6',

        paddingHorizontal: 5,

        flexDirection: 'row',

        alignItems: 'center',

        justifyContent: 'space-between',

    },

    quickEmployeeInfo: { flex: 1 },

    quickEmployeeName: { fontSize: 15, fontWeight: '600', color: '#111827' },

    quickEmployeeId: { fontSize: 12, color: '#6B7280', marginTop: 3 },

    quickEmployeeDesignation: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },

    quickEmployeeStatus: { paddingLeft: 10 },

    quickStatusIndicator: { width: 10, height: 10, borderRadius: 5 },

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