import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

type OtherIncome = {
    id: string;
    name: string;
    description: string;
};

const PayrollEarningsScreen = ({ navigation }: any) => {
    const [basicSalary, setBasicSalary] = useState(true);
    const [overtime, setOvertime] = useState(true);
    const [bonus, setBonus] = useState(true);
    const [otherIncome, setOtherIncome] = useState(true);

    const [incomeName, setIncomeName] = useState('');
    const [incomeDescription, setIncomeDescription] = useState('');

    const [otherIncomeList, setOtherIncomeList] = useState<OtherIncome[]>(
        [],
    );

    const addOtherIncome = () => {
        if (!incomeName.trim()) {
            Alert.alert('Required', 'Please enter an income name.');
            return;
        }

        const newIncome: OtherIncome = {
            id: Date.now().toString(),
            name: incomeName.trim(),
            description:
                incomeDescription.trim() || 'Additional employee income.',
        };

        setOtherIncomeList([...otherIncomeList, newIncome]);

        setIncomeName('');
        setIncomeDescription('');
    };

    const deleteOtherIncome = (id: string) => {
        Alert.alert(
            'Delete Income Component',
            'Are you sure you want to delete this earning component?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setOtherIncomeList(
                            otherIncomeList.filter(item => item.id !== id),
                        );
                    },
                },
            ],
        );
    };

    const handleSave = () => {
        Alert.alert(
            'Save Earnings Settings',
            'Are you sure you want to save these earnings settings?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Save',
                    onPress: () => {
                        Alert.alert(
                            'Saved',
                            'Earnings settings have been saved successfully.',
                        );
                    },
                },
            ],
        );
    };

    const renderSwitchRow = (
        title: string,
        description: string,
        value: boolean,
        onChange: (value: boolean) => void,
    ) => {
        return (
            <View style={styles.settingRow}>
                <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>{title}</Text>

                    <Text style={styles.settingDescription}>
                        {description}
                    </Text>
                </View>

                <Switch
                    value={value}
                    onValueChange={onChange}
                    trackColor={{
                        false: '#D1D5DB',
                        true: '#93C5FD',
                    }}
                    thumbColor={value ? '#2563EB' : '#F3F4F6'}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color="#111827"
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Earnings</Text>

                <View style={styles.headerSpace} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>

                {/* Intro */}
                <View style={styles.infoCard}>
                    <View style={styles.infoIcon}>
                        <MaterialIcons
                            name="add-circle-outline"
                            size={23}
                            color="#2563EB"
                        />
                    </View>

                    <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>
                            Earnings Configuration
                        </Text>

                        <Text style={styles.infoText}>
                            Select the earning components that can be included
                            when calculating employee payroll.
                        </Text>
                    </View>
                </View>

                {/* Standard Earnings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Standard Earnings
                    </Text>

                    <View style={styles.card}>
                        {renderSwitchRow(
                            'Basic Salary',
                            'Employee base salary used in payroll calculation.',
                            basicSalary,
                            setBasicSalary,
                        )}

                        <View style={styles.divider} />

                        {renderSwitchRow(
                            'Overtime',
                            'Additional earnings generated from approved overtime.',
                            overtime,
                            setOvertime,
                        )}

                        <View style={styles.divider} />

                        {renderSwitchRow(
                            'Bonus',
                            'Additional bonus payments provided to employees.',
                            bonus,
                            setBonus,
                        )}

                        <View style={styles.divider} />

                        {renderSwitchRow(
                            'Other Income',
                            'Additional configurable income components.',
                            otherIncome,
                            setOtherIncome,
                        )}
                    </View>
                </View>

                {/* Other Income */}
                {otherIncome && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Other Income Components
                        </Text>

                        <Text style={styles.sectionDescription}>
                            Add configurable earning components such as
                            incentives, allowances or additional payments.
                        </Text>

                        <View style={styles.card}>
                            <Text style={styles.fieldLabel}>
                                Income Name
                            </Text>

                            <TextInput
                                value={incomeName}
                                onChangeText={setIncomeName}
                                placeholder="Example: Transport Allowance"
                                placeholderTextColor="#9CA3AF"
                                style={styles.input}
                            />

                            <Text style={styles.fieldLabel}>
                                Description
                            </Text>

                            <TextInput
                                value={incomeDescription}
                                onChangeText={setIncomeDescription}
                                placeholder="Describe this earning component"
                                placeholderTextColor="#9CA3AF"
                                multiline
                                textAlignVertical="top"
                                style={[styles.input, styles.textArea]}
                            />

                            <TouchableOpacity
                                style={styles.addButton}
                                activeOpacity={0.8}
                                onPress={addOtherIncome}>
                                <MaterialIcons
                                    name="add"
                                    size={21}
                                    color="#FFFFFF"
                                />

                                <Text style={styles.addButtonText}>
                                    Add Income Component
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Existing components */}
                        {otherIncomeList.length > 0 && (
                            <View style={styles.listCard}>
                                <Text style={styles.listTitle}>
                                    Configured Components
                                </Text>

                                {otherIncomeList.map((item, index) => (
                                    <View key={item.id}>
                                        <View style={styles.incomeRow}>
                                            <View style={styles.incomeIcon}>
                                                <MaterialIcons
                                                    name="payments"
                                                    size={20}
                                                    color="#2563EB"
                                                />
                                            </View>

                                            <View style={styles.incomeContent}>
                                                <Text style={styles.incomeName}>
                                                    {item.name}
                                                </Text>

                                                <Text style={styles.incomeDescription}>
                                                    {item.description}
                                                </Text>
                                            </View>

                                            <TouchableOpacity
                                                style={styles.deleteButton}
                                                onPress={() =>
                                                    deleteOtherIncome(item.id)
                                                }>
                                                <MaterialIcons
                                                    name="delete-outline"
                                                    size={21}
                                                    color="#DC2626"
                                                />
                                            </TouchableOpacity>
                                        </View>

                                        {index <
                                            otherIncomeList.length - 1 && (
                                                <View style={styles.divider} />
                                            )}
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                )}

                {/* Calculation Information */}
                <View style={styles.noteCard}>
                    <MaterialIcons
                        name="info-outline"
                        size={21}
                        color="#2563EB"
                    />

                    <Text style={styles.noteText}>
                        Earnings are added to the applicable base salary
                        during payroll processing. Actual employee-specific
                        amounts will be entered when payroll is prepared.
                    </Text>
                </View>

                {/* Save */}
                <TouchableOpacity
                    style={styles.saveButton}
                    activeOpacity={0.8}
                    onPress={handleSave}>
                    <MaterialIcons
                        name="save"
                        size={21}
                        color="#FFFFFF"
                    />

                    <Text style={styles.saveButtonText}>
                        Save Earnings Settings
                    </Text>
                </TouchableOpacity>
            </ScrollView>
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
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerSpace: {
        width: 40,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },

    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },

    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#EFF6FF',
        borderWidth: 1,
        borderColor: '#DBEAFE',
        borderRadius: 12,
        padding: 14,
        marginBottom: 22,
    },

    infoIcon: {
        width: 42,
        height: 42,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    infoContent: {
        flex: 1,
    },

    infoTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E3A8A',
        marginBottom: 4,
    },

    infoText: {
        fontSize: 12,
        lineHeight: 18,
        color: '#475569',
    },

    section: {
        marginBottom: 22,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 5,
    },

    sectionDescription: {
        fontSize: 12,
        lineHeight: 18,
        color: '#6B7280',
        marginBottom: 10,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 14,
    },

    settingRow: {
        minHeight: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    settingContent: {
        flex: 1,
        paddingRight: 12,
    },

    settingTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 3,
    },

    settingDescription: {
        fontSize: 12,
        lineHeight: 17,
        color: '#6B7280',
    },

    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 12,
    },

    fieldLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 7,
    },

    input: {
        height: 46,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 14,
        color: '#111827',
        backgroundColor: '#FFFFFF',
        marginBottom: 14,
    },

    textArea: {
        height: 80,
        paddingTop: 12,
    },

    addButton: {
        height: 46,
        borderRadius: 8,
        backgroundColor: '#2563EB',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    addButtonText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '700',
        marginLeft: 7,
    },

    listCard: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 14,
        marginTop: 10,
    },

    listTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#374151',
        marginBottom: 4,
    },

    incomeRow: {
        minHeight: 64,
        flexDirection: 'row',
        alignItems: 'center',
    },

    incomeIcon: {
        width: 40,
        height: 40,
        borderRadius: 9,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 11,
    },

    incomeContent: {
        flex: 1,
        paddingRight: 8,
    },

    incomeName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 3,
    },

    incomeDescription: {
        fontSize: 11,
        lineHeight: 16,
        color: '#6B7280',
    },

    deleteButton: {
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
    },

    noteCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        padding: 13,
        marginBottom: 18,
    },

    noteText: {
        flex: 1,
        fontSize: 12,
        lineHeight: 18,
        color: '#6B7280',
        marginLeft: 9,
    },

    saveButton: {
        height: 52,
        borderRadius: 10,
        backgroundColor: '#2563EB',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },

    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
        marginLeft: 8,
    },
});

export default PayrollEarningsScreen;