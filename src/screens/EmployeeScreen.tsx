import React, { useMemo, useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Modal,
    Pressable,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

type EmployeeStatus = 'present' | 'absent' | 'leave';

type Employee = {
    id: string;
    name: string;
    designation: string;
    department: string;
    status: EmployeeStatus;
};

type RecruitmentStage =
    | 'Resume Collection'
    | 'First Round Interview'
    | 'Final Round Interview'
    | 'Director Round Interview'
    | 'Offer Letter'
    | 'Acceptance by Selected Candidates'
    | 'Appointment Letter Distribution'
    | 'Department Allocation';

type Candidate = {
    id: string;
    name: string;
    designation: string;
    stage: RecruitmentStage;
};

const recruitmentStages: RecruitmentStage[] = [
    'Resume Collection',
    'First Round Interview',
    'Final Round Interview',
    'Director Round Interview',
    'Offer Letter',
    'Acceptance by Selected Candidates',
    'Appointment Letter Distribution',
    'Department Allocation',
];

export const employees: Employee[] = [
    {
        id: 'BARC001',
        name: 'Rahul Kumar',
        designation: 'Security Guard',
        department: 'Security',
        status: 'present',
    },
    {
        id: 'BARC002',
        name: 'Amit Kumar',
        designation: 'Security Guard',
        department: 'Accounts',
        status: 'absent',
    },
    {
        id: 'BARC003',
        name: 'Suresh Kumar',
        designation: 'Supervisor',
        department: 'Security',
        status: 'present',
    },
    {
        id: 'BARC004',
        name: 'Ravi Sharma',
        designation: 'Security Guard',
        department: 'Kitchen',
        status: 'leave',
    },
    {
        id: 'BARC005',
        name: 'Vikash Kumar',
        designation: 'Security Guard',
        department: 'Security',
        status: 'present',
    },
    {
        id: 'BARC006',
        name: 'Manoj Singh',
        designation: 'Supervisor',
        department: 'Sales & Marketing',
        status: 'present',
    },
    {
        id: 'BARC007',
        name: 'Rajesh Kumar',
        designation: 'Security Guard',
        department: 'Security',
        status: 'absent',
    },
    {
        id: 'BARC008',
        name: 'Ankit Sharma',
        designation: 'Security Guard',
        department: 'Security',
        status: 'present',
    },
    {
        id: 'BARC009',
        name: 'Deepak Kumar',
        designation: 'Security Guard',
        department: 'Operations',
        status: 'leave',
    },
    {
        id: 'BARC010',
        name: 'Pankaj Singh',
        designation: 'Supervisor',
        department: 'Operations',
        status: 'present',
    },
    {
        id: 'BARC011',
        name: 'Rohit Kumar',
        designation: 'Security Guard',
        department: 'Security',
        status: 'present',
    },
    {
        id: 'BARC012',
        name: 'Sunil Yadav',
        designation: 'Security Guard',
        department: 'Security',
        status: 'absent',
    },
    {
        id: 'BARC013',
        name: 'Arun Kumar',
        designation: 'Security Guard',
        department: 'Operations',
        status: 'present',
    },
    {
        id: 'BARC014',
        name: 'Naveen Sharma',
        designation: 'Security Guard',
        department: 'Security',
        status: 'present',
    },
    {
        id: 'BARC015',
        name: 'Karan Singh',
        designation: 'Supervisor',
        department: 'Security',
        status: 'present',
    },
    {
        id: 'BARC016',
        name: 'Rakesh Kumar',
        designation: 'Security Guard',
        department: 'Security',
        status: 'present',
    },
    {
        id: 'BARC017',
        name: 'Mohit Sharma',
        designation: 'Security Guard',
        department: 'Operations',
        status: 'absent',
    },
    {
        id: 'BARC018',
        name: 'Vijay Kumar',
        designation: 'Security Guard',
        department: 'Security',
        status: 'present',
    },
    {
        id: 'BARC019',
        name: 'Ajay Singh',
        designation: 'Security Guard',
        department: 'Security',
        status: 'leave',
    },
    {
        id: 'BARC020',
        name: 'Santosh Kumar',
        designation: 'Supervisor',
        department: 'Operations',
        status: 'present',
    },
    {
        id: 'BARC021',
        name: 'Nitin Kumar',
        designation: 'Security Guard',
        department: 'Security',
        status: 'present',
    },
    {
        id: 'BARC022',
        name: 'Pradeep Singh',
        designation: 'Security Guard',
        department: 'Security',
        status: 'absent',
    },
    {
        id: 'BARC023',
        name: 'Ashok Kumar',
        designation: 'Security Guard',
        department: 'Operations',
        status: 'present',
    },
    {
        id: 'BARC024',
        name: 'Sumit Sharma',
        designation: 'Security Guard',
        department: 'Security',
        status: 'present',
    },
    {
        id: 'BARC025',
        name: 'Ramesh Kumar',
        designation: 'Supervisor',
        department: 'Security',
        status: 'leave',
    },
    {
        id: 'BARC026',
        name: 'Gaurav Singh',
        designation: 'Security Guard',
        department: 'Operations',
        status: 'present',
    },
    {
        id: 'BARC027',
        name: 'Tarun Kumar',
        designation: 'Security Guard',
        department: 'Security',
        status: 'absent',
    },
    {
        id: 'BARC028',
        name: 'Harish Sharma',
        designation: 'Security Guard',
        department: 'Security',
        status: 'present',
    },
    {
        id: 'BARC029',
        name: 'Mukul Kumar',
        designation: 'Security Guard',
        department: 'Operations',
        status: 'present',
    },
    {
        id: 'BARC030',
        name: 'Dinesh Singh',
        designation: 'Supervisor',
        department: 'Security',
        status: 'leave',
    },
];

const candidates: Candidate[] = [
    {
        id: 'CAN001',
        name: 'Rohit Sharma',
        designation: 'Security Guard',
        stage: 'Resume Collection',
    },
    {
        id: 'CAN002',
        name: 'Vivek Kumar',
        designation: 'Security Guard',
        stage: 'First Round Interview',
    },
    {
        id: 'CAN003',
        name: 'Arjun Singh',
        designation: 'Supervisor',
        stage: 'Final Round Interview',
    },
    {
        id: 'CAN004',
        name: 'Manish Kumar',
        designation: 'Security Guard',
        stage: 'Director Round Interview',
    },
    {
        id: 'CAN005',
        name: 'Sanjay Sharma',
        designation: 'Security Guard',
        stage: 'Offer Letter',
    },
    {
        id: 'CAN006',
        name: 'Akash Singh',
        designation: 'Supervisor',
        stage: 'Acceptance by Selected Candidates',
    },
];

const EmployeesScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    const [activeSection, setActiveSection] = useState<
        'employees' | 'recruitment'
    >('employees');

    const [employeeSearch, setEmployeeSearch] = useState('');

    useEffect(() => {
        const searchFromDashboard = route.params?.search;

        if (typeof searchFromDashboard === 'string') {
            setEmployeeSearch(searchFromDashboard);
            setActiveSection('employees');
        }
    }, [route.params?.search]);
    const [candidateSearch, setCandidateSearch] = useState('');

    const [selectedFilter, setSelectedFilter] = useState<
        'all' | EmployeeStatus
    >('all');

    const [selectedRecruitmentStage, setSelectedRecruitmentStage] =
        useState<'all' | RecruitmentStage>('all');

    const [isStageDropdownOpen, setIsStageDropdownOpen] =
        useState(false);

    // -----------------------------
    // Employee Filtering
    // -----------------------------

    const filteredEmployees = useMemo(() => {
        return employees.filter(employee => {
            const search = employeeSearch.toLowerCase();

            const matchesSearch =
                employee.name.toLowerCase().includes(search) ||
                employee.id.toLowerCase().includes(search) ||
                employee.designation.toLowerCase().includes(search);

            const matchesFilter =
                selectedFilter === 'all' ||
                employee.status === selectedFilter;

            return matchesSearch && matchesFilter;
        });
    }, [employeeSearch, selectedFilter]);

    // -----------------------------
    // Candidate Filtering
    // -----------------------------

    const filteredCandidates = useMemo(() => {
        return candidates.filter(candidate => {
            const search = candidateSearch.toLowerCase();

            const matchesSearch =
                candidate.name.toLowerCase().includes(search) ||
                candidate.id.toLowerCase().includes(search) ||
                candidate.designation.toLowerCase().includes(search) ||
                candidate.stage.toLowerCase().includes(search);

            const matchesStage =
                selectedRecruitmentStage === 'all' ||
                candidate.stage === selectedRecruitmentStage;

            return matchesSearch && matchesStage;
        });
    }, [candidateSearch, selectedRecruitmentStage]);

    // -----------------------------
    // Status Helpers
    // -----------------------------

    const getStatusColor = (status: EmployeeStatus) => {
        if (status === 'present') {
            return '#22C55E';
        }

        if (status === 'absent') {
            return '#EF4444';
        }

        return '#EAB308';
    };

    const getStatusText = (status: EmployeeStatus) => {
        if (status === 'present') {
            return 'Present';
        }

        if (status === 'absent') {
            return 'Absent';
        }

        return 'On Leave';
    };

    // -----------------------------
    // Employee Card
    // -----------------------------

    const renderEmployee = ({ item }: { item: Employee }) => {
        return (
            <TouchableOpacity
                style={styles.employeeCard}
                onPress={() =>
                    navigation.navigate('EmployeeProfile', {
                        employee: item,
                    })
                }>

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

                    <Text style={styles.employeeDepartment}>
                        {item.department}
                    </Text>
                </View>

                <View style={styles.employeeStatus}>
                    <View
                        style={[
                            styles.statusIndicator,
                            {
                                backgroundColor:
                                    getStatusColor(item.status),
                            },
                        ]}
                    />

                    <Text style={styles.statusText}>
                        {getStatusText(item.status)}
                    </Text>
                </View>

            </TouchableOpacity>
        );
    };

    // -----------------------------
    // Candidate Card
    // -----------------------------

    const renderCandidate = ({ item }: { item: Candidate }) => {
        return (
            <TouchableOpacity
                style={styles.candidateCard}
                onPress={() =>
                    navigation.navigate('CandidateProfile', {
                        candidate: item,
                    })
                }>

                <View style={styles.candidateInfo}>
                    <Text style={styles.candidateName}>
                        {item.name}
                    </Text>

                    <Text style={styles.candidateId}>
                        {item.id}
                    </Text>

                    <Text style={styles.candidateDesignation}>
                        {item.designation}
                    </Text>
                </View>

                <View style={styles.stageContainer}>
                    <Text style={styles.stageLabel}>
                        Current Stage
                    </Text>

                    <Text style={styles.stageText}>
                        {item.stage}
                    </Text>
                </View>

            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* Header */}

            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Employees
                </Text>
            </View>

            {/* Section Switch */}

            <View style={styles.sectionSwitch}>

                <TouchableOpacity
                    style={[
                        styles.sectionButton,
                        activeSection === 'employees' &&
                        styles.activeSectionButton,
                    ]}
                    onPress={() => {
                        setActiveSection('employees');
                        setIsStageDropdownOpen(false);
                    }}>

                    <Text
                        style={[
                            styles.sectionButtonText,
                            activeSection === 'employees' &&
                            styles.activeSectionButtonText,
                        ]}>
                        Employees
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.sectionButton,
                        activeSection === 'recruitment' &&
                        styles.activeSectionButton,
                    ]}
                    onPress={() =>
                        setActiveSection('recruitment')
                    }>

                    <Text
                        style={[
                            styles.sectionButtonText,
                            activeSection === 'recruitment' &&
                            styles.activeSectionButtonText,
                        ]}>
                        Recruitment
                    </Text>

                </TouchableOpacity>

            </View>

            {/* Employees Section */}

            {activeSection === 'employees' ? (
                <>

                    {/* Employee Search */}

                    <View style={styles.searchContainer}>

                        <Text style={styles.searchIcon}>
                            🔍
                        </Text>

                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search employee"
                            placeholderTextColor="#9CA3AF"
                            value={employeeSearch}
                            onChangeText={setEmployeeSearch}
                        />

                    </View>

                    {/* Employee Filters */}

                    <View style={styles.filterRow}>

                        {/* All */}

                        <TouchableOpacity
                            style={[
                                styles.filterButton,
                                selectedFilter === 'all' &&
                                styles.activeFilter,
                            ]}
                            onPress={() =>
                                setSelectedFilter('all')
                            }>

                            <Text
                                style={[
                                    styles.filterText,
                                    selectedFilter === 'all' &&
                                    styles.activeFilterText,
                                ]}>
                                All
                            </Text>

                        </TouchableOpacity>

                        {/* Present */}

                        <TouchableOpacity
                            style={[
                                styles.filterButton,
                                selectedFilter === 'present' &&
                                styles.activeFilter,
                            ]}
                            onPress={() =>
                                setSelectedFilter('present')
                            }>

                            <View
                                style={[
                                    styles.smallIndicator,
                                    styles.presentIndicator,
                                ]}
                            />

                            <Text
                                style={[
                                    styles.filterText,
                                    selectedFilter === 'present' &&
                                    styles.activeFilterText,
                                ]}>
                                Present
                            </Text>

                        </TouchableOpacity>

                        {/* Absent */}

                        <TouchableOpacity
                            style={[
                                styles.filterButton,
                                selectedFilter === 'absent' &&
                                styles.activeFilter,
                            ]}
                            onPress={() =>
                                setSelectedFilter('absent')
                            }>

                            <View
                                style={[
                                    styles.smallIndicator,
                                    styles.absentIndicator,
                                ]}
                            />

                            <Text
                                style={[
                                    styles.filterText,
                                    selectedFilter === 'absent' &&
                                    styles.activeFilterText,
                                ]}>
                                Absent
                            </Text>

                        </TouchableOpacity>

                        {/* Leave */}

                        <TouchableOpacity
                            style={[
                                styles.filterButton,
                                selectedFilter === 'leave' &&
                                styles.activeFilter,
                            ]}
                            onPress={() =>
                                setSelectedFilter('leave')
                            }>

                            <View
                                style={[
                                    styles.smallIndicator,
                                    styles.leaveIndicator,
                                ]}
                            />

                            <Text
                                style={[
                                    styles.filterText,
                                    selectedFilter === 'leave' &&
                                    styles.activeFilterText,
                                ]}>
                                Leave
                            </Text>

                        </TouchableOpacity>

                    </View>

                    {/* Employee List */}

                    <FlatList
                        data={filteredEmployees}
                        keyExtractor={item => item.id}
                        renderItem={renderEmployee}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContainer}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>
                                No employees found
                            </Text>
                        }
                    />

                </>
            ) : (
                <>

                    {/* Candidate Search */}

                    <View style={styles.searchContainer}>

                        <Text style={styles.searchIcon}>
                            🔍
                        </Text>

                        <TextInput
                            style={styles.searchInput}
                            placeholder="Find candidates"
                            placeholderTextColor="#9CA3AF"
                            value={candidateSearch}
                            onChangeText={setCandidateSearch}
                        />

                    </View>

                    {/* Recruitment Stage Dropdown */}

                    <TouchableOpacity
                        style={styles.dropdownButton}
                        onPress={() =>
                            setIsStageDropdownOpen(true)
                        }>

                        <Text
                            style={[
                                styles.dropdownText,
                                selectedRecruitmentStage === 'all' &&
                                styles.dropdownPlaceholder,
                            ]}>

                            {selectedRecruitmentStage === 'all'
                                ? 'All Recruitment Stages'
                                : selectedRecruitmentStage}

                        </Text>

                        <Text style={styles.dropdownArrow}>
                            ▼
                        </Text>

                    </TouchableOpacity>

                    {/* Candidate List */}

                    <FlatList
                        data={filteredCandidates}
                        keyExtractor={item => item.id}
                        renderItem={renderCandidate}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContainer}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>
                                No candidates found
                            </Text>
                        }
                    />

                    {/* Recruitment Stage Modal */}

                    <Modal
                        visible={isStageDropdownOpen}
                        transparent
                        animationType="fade"
                        onRequestClose={() =>
                            setIsStageDropdownOpen(false)
                        }>

                        <Pressable
                            style={styles.modalOverlay}
                            onPress={() =>
                                setIsStageDropdownOpen(false)
                            }>

                            <Pressable
                                style={styles.dropdownModal}
                                onPress={event =>
                                    event.stopPropagation()
                                }>

                                <Text style={styles.dropdownTitle}>
                                    Recruitment Stage
                                </Text>

                                {/* All */}

                                <TouchableOpacity
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setSelectedRecruitmentStage(
                                            'all',
                                        );
                                        setIsStageDropdownOpen(false);
                                    }}>

                                    <Text
                                        style={[
                                            styles.dropdownItemText,
                                            selectedRecruitmentStage ===
                                            'all' &&
                                            styles.selectedDropdownItemText,
                                        ]}>
                                        All Recruitment Stages
                                    </Text>

                                </TouchableOpacity>

                                {/* Stages */}

                                {recruitmentStages.map(stage => (
                                    <TouchableOpacity
                                        key={stage}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedRecruitmentStage(
                                                stage,
                                            );
                                            setIsStageDropdownOpen(false);
                                        }}>

                                        <Text
                                            style={[
                                                styles.dropdownItemText,
                                                selectedRecruitmentStage ===
                                                stage &&
                                                styles.selectedDropdownItemText,
                                            ]}>
                                            {stage}
                                        </Text>

                                    </TouchableOpacity>
                                ))}

                            </Pressable>

                        </Pressable>

                    </Modal>

                </>
            )}

        </SafeAreaView>
    );
};

export default EmployeesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
    },

    /* Header */

    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',

    },

    /* Section Switch */

    sectionSwitch: {
        height: 48,
        flexDirection: 'row',
        backgroundColor: '#eaedf5',
        borderRadius: 10,
        padding: 4,
        marginBottom: 15,
        marginTop: 10,
    },

    sectionButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 80,
    },

    activeSectionButton: {
        backgroundColor: '#FFFFFF',
        elevation: 2,
    },

    sectionButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
    },

    activeSectionButtonText: {
        color: '#0f5bfd',
    },

    /* Search */

    searchContainer: {
        height: 50,
        borderWidth: 1,
        borderColor: '#bbbdbf',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        marginBottom: 14,
    },

    searchIcon: {
        fontSize: 17,
        marginRight: 10,
    },

    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#111827',
    },

    /* Employee Filters */

    filterRow: {
        flexDirection: 'row',
        marginBottom: 15,
        gap: 4,
    },

    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 20,
        paddingHorizontal: 11,
        paddingVertical: 7,
        marginRight: 7,
    },

    activeFilter: {
        backgroundColor: '#e2eeff',
        borderColor: '#BFDBFE',
    },

    filterText: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '500',
    },

    activeFilterText: {
        color: '#2563EB',
        fontWeight: '600',
    },

    smallIndicator: {
        width: 7,
        height: 7,
        borderRadius: 4,
        marginRight: 5,
    },

    presentIndicator: {
        backgroundColor: '#22C55E',
    },

    absentIndicator: {
        backgroundColor: '#EF4444',
    },

    leaveIndicator: {
        backgroundColor: '#EAB308',
    },

    /* Recruitment Dropdown */

    dropdownButton: {
        height: 50,
        borderWidth: 1,
        borderColor: '#bbbdbf',
        borderRadius: 10,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        marginBottom: 14,
    },

    dropdownText: {
        flex: 1,
        fontSize: 14,
        color: '#111827',
        fontWeight: '500',
    },

    dropdownPlaceholder: {
        color: '#6B7280',
    },

    dropdownArrow: {
        fontSize: 12,
        color: '#6B7280',
        marginLeft: 10,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        justifyContent: 'center',
        paddingHorizontal: 25,
    },

    dropdownModal: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingVertical: 8,
        maxHeight: '75%',
        elevation: 8,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },

    dropdownTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },

    dropdownItem: {
        minHeight: 45,
        paddingHorizontal: 16,
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },

    dropdownItemText: {
        fontSize: 13,
        color: '#374151',
    },

    selectedDropdownItemText: {
        color: '#2563EB',
        fontWeight: '600',
    },

    /* Lists */

    listContainer: {
        paddingBottom: 25,
    },

    emptyText: {
        textAlign: 'center',
        color: '#9CA3AF',
        marginTop: 30,
        fontSize: 14,
    },

    /* Employee Card */

    employeeCard: {
        minHeight: 90,
        borderWidth: 1,
        borderColor: '#bbbdbf',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    employeeInfo: {
        flex: 1,
    },

    employeeName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },

    employeeId: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 3,
    },

    employeeDesignation: {
        fontSize: 13,
        color: '#374151',
        marginTop: 5,
    },

    employeeDepartment: {
        fontSize: 12,
        color: '#6d6e70',
        marginTop: 2,
    },

    employeeStatus: {
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingTop: 2,
    },

    statusIndicator: {
        width: 11,
        height: 11,
        borderRadius: 6,
        marginBottom: 5,
    },

    statusText: {
        fontSize: 11,
        color: '#2563Eb',
    },

    /* Candidate Card */

    candidateCard: {
        minHeight: 90,
        borderWidth: 1,
        borderColor: '#bbbdbf',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    candidateInfo: {
        flex: 1,
    },

    candidateName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },

    candidateId: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 3,
    },

    candidateDesignation: {
        fontSize: 13,
        color: '#374151',
        marginTop: 5,
    },

    stageContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingTop: 2,
        maxWidth: 140,
    },

    stageLabel: {
        fontSize: 10,
        color: '#2563Eb',
        marginBottom: 5,
    },

    stageText: {
        fontSize: 11,
        color: '#2563EB',
        textAlign: 'right',
        fontWeight: '600',
    },
});