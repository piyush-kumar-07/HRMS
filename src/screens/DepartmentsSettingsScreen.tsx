import React, { useMemo, useState } from 'react';
import {
    Alert,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import MaterialIcons from '@react-native-vector-icons/material-icons';

type Department = {
    id: string;
    name: string;
    description: string;
};

const DepartmentsSettingsScreen = ({ navigation }: any) => {
    const [departments, setDepartments] = useState<Department[]>([
        {
            id: 'DEP001',
            name: 'Admin',
            description: 'Administration and management',
        },
        {
            id: 'DEP002',
            name: 'Accounts',
            description: 'Accounting and financial operations',
        },
        {
            id: 'DEP003',
            name: 'Security',
            description: 'Security and guarding operations',
        },
        {
            id: 'DEP004',
            name: 'Kitchen',
            description: 'Kitchen and food operations',
        },
        {
            id: 'DEP005',
            name: 'Sales & Marketing',
            description: 'Sales and marketing operations',
        },
    ]);

    const [search, setSearch] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [editingDepartment, setEditingDepartment] =
        useState<Department | null>(null);

    const [departmentName, setDepartmentName] = useState('');
    const [departmentDescription, setDepartmentDescription] =
        useState('');

    const filteredDepartments = useMemo(() => {
        const searchText = search.toLowerCase().trim();

        if (!searchText) {
            return departments;
        }

        return departments.filter(
            department =>
                department.name.toLowerCase().includes(searchText) ||
                department.id.toLowerCase().includes(searchText),
        );
    }, [departments, search]);

    const openAddDepartment = () => {
        setDepartmentName('');
        setDepartmentDescription('');
        setEditingDepartment(null);
        setIsAdding(true);
    };

    const openEditDepartment = (department: Department) => {
        setDepartmentName(department.name);
        setDepartmentDescription(department.description);
        setEditingDepartment(department);
        setIsAdding(true);
    };

    const closeForm = () => {
        setIsAdding(false);
        setEditingDepartment(null);
        setDepartmentName('');
        setDepartmentDescription('');
    };

    const handleSaveDepartment = () => {
        if (!departmentName.trim()) {
            Alert.alert(
                'Department Name Required',
                'Please enter a department name.',
            );
            return;
        }

        if (editingDepartment) {
            Alert.alert(
                'Confirm Changes',
                `Are you sure you want to update "${editingDepartment.name}"?`,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Update',
                        onPress: () => {
                            setDepartments(previousDepartments =>
                                previousDepartments.map(department =>
                                    department.id === editingDepartment.id
                                        ? {
                                            ...department,
                                            name: departmentName.trim(),
                                            description:
                                                departmentDescription.trim(),
                                        }
                                        : department,
                                ),
                            );

                            closeForm();
                        },
                    },
                ],
            );
        } else {
            Alert.alert(
                'Confirm Department',
                `Are you sure you want to add "${departmentName.trim()}"?`,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Add',
                        onPress: () => {
                            const newDepartment: Department = {
                                id: `DEP${String(departments.length + 1).padStart(3, '0')}`,
                                name: departmentName.trim(),
                                description: departmentDescription.trim(),
                            };

                            setDepartments(previousDepartments => [
                                ...previousDepartments,
                                newDepartment,
                            ]);

                            closeForm();
                        },
                    },
                ],
            );
        }
    };

    const handleDeleteDepartment = (department: Department) => {
        Alert.alert(
            'Delete Department',
            `Are you sure you want to delete "${department.name}"?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setDepartments(previousDepartments =>
                            previousDepartments.filter(
                                item => item.id !== department.id,
                            ),
                        );
                    },
                },
            ],
        );
    };

    const renderDepartment = ({ item }: { item: Department }) => {
        return (
            <TouchableOpacity
                style={styles.departmentCard}
                activeOpacity={0.7}
                onPress={() =>
                    navigation.navigate('DepartmentDetails', {
                        department: item,
                    })
                }>
                <View style={styles.departmentIcon}>
                    <MaterialIcons
                        name="business"
                        size={22}
                        color="#2563EB"
                    />
                </View>

                <View style={styles.departmentInfo}>
                    <Text style={styles.departmentName}>{item.name}</Text>

                    <Text style={styles.departmentId}>{item.id}</Text>

                    <Text style={styles.departmentDescription}>
                        {item.description}
                    </Text>
                </View>

                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => openEditDepartment(item)}>
                        <MaterialIcons
                            name="edit"
                            size={19}
                            color="#2563EB"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleDeleteDepartment(item)}>
                        <MaterialIcons
                            name="delete-outline"
                            size={20}
                            color="#DC2626"
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    if (isAdding) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={closeForm}
                        style={styles.backButton}>
                        <MaterialIcons
                            name="arrow-back"
                            size={24}
                            color="#111827"
                        />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>
                        {editingDepartment
                            ? 'Edit Department'
                            : 'Add Department'}
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.inputLabel}>Department Name</Text>

                    <TextInput
                        style={styles.input}
                        value={departmentName}
                        onChangeText={setDepartmentName}
                        placeholder="Enter department name"
                        placeholderTextColor="#9CA3AF"
                    />

                    <Text style={styles.inputLabel}>
                        Description
                    </Text>

                    <TextInput
                        style={[
                            styles.input,
                            styles.descriptionInput,
                        ]}
                        value={departmentDescription}
                        onChangeText={setDepartmentDescription}
                        placeholder="Enter department description"
                        placeholderTextColor="#9CA3AF"
                        multiline
                        textAlignVertical="top"
                    />

                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSaveDepartment}
                        activeOpacity={0.8}>
                        <MaterialIcons
                            name="save"
                            size={20}
                            color="#FFFFFF"
                        />

                        <Text style={styles.saveButtonText}>
                            {editingDepartment
                                ? 'Update Department'
                                : 'Add Department'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}>
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color="#111827"
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Departments
                </Text>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={openAddDepartment}>
                    <MaterialIcons
                        name="add"
                        size={22}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
                <MaterialIcons
                    name="search"
                    size={20}
                    color="#6B7280"
                />

                <TextInput
                    style={styles.searchInput}
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search department"
                    placeholderTextColor="#9CA3AF"
                />
            </View>

            {/* Count */}
            <View style={styles.countContainer}>
                <Text style={styles.countText}>
                    {filteredDepartments.length} Departments
                </Text>
            </View>

            {/* Department List */}
            <FlatList
                data={filteredDepartments}
                renderItem={renderDepartment}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <MaterialIcons
                            name="business"
                            size={40}
                            color="#9CA3AF"
                        />

                        <Text style={styles.emptyTitle}>
                            No departments found
                        </Text>

                        <Text style={styles.emptyDescription}>
                            Try another search or add a new department.
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },

    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },

    backButton: {
        padding: 4,
    },

    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginLeft: 12,
    },

    addButton: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
    },

    searchContainer: {
        height: 44,
        marginHorizontal: 16,
        marginTop: 14,
        paddingHorizontal: 12,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#BBBDBF',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },

    searchInput: {
        flex: 1,
        height: 42,
        marginLeft: 8,
        fontSize: 13,
        color: '#111827',
    },

    countContainer: {
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 6,
    },

    countText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#6B7280',
    },

    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 30,
    },

    departmentCard: {
        minHeight: 82,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#BBBDBF',
        borderRadius: 10,
        padding: 12,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },

    departmentIcon: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    departmentInfo: {
        flex: 1,
    },

    departmentName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },

    departmentId: {
        fontSize: 10,
        color: '#2563EB',
        marginTop: 2,
    },

    departmentDescription: {
        fontSize: 11,
        color: '#6B7280',
        marginTop: 4,
    },

    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },

    actionButton: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
    },

    formContainer: {
        padding: 16,
    },

    inputLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 6,
        marginTop: 8,
    },

    input: {
        height: 44,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#BBBDBF',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 13,
        color: '#111827',
    },

    descriptionInput: {
        height: 100,
        paddingTop: 12,
    },

    saveButton: {
        height: 46,
        backgroundColor: '#2563EB',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
    },

    saveButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
        marginLeft: 8,
    },

    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 70,
    },

    emptyTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#374151',
        marginTop: 12,
    },

    emptyDescription: {
        fontSize: 11,
        color: '#6B7280',
        marginTop: 5,
        textAlign: 'center',
    },
});

export default DepartmentsSettingsScreen;