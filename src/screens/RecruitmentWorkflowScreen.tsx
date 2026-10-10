
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

const STAGES = [
    'Resume Collection',
    'First Round Interview',
    'Final Round Interview',
    'Director Round Interview',
    'Offer Letter',
    'Acceptance by Selected Candidates',
    'Appointment Letter Distribution',
    'Department Allocation',
] as const;

type StageRecord = {
    conductor: string;
    date: string;
    result: string;
    remarks: string;
    completed: boolean;
};

type Candidate = {
    id: string;
    name: string;
    designation: string;
    stage: string;
};

const RecruitmentWorkflowScreen = ({ route, navigation }: any) => {
    const candidate: Candidate = route.params.candidate;

    const [records, setRecords] = useState<Record<string, StageRecord>>({});
    const [activeStage, setActiveStage] = useState<string>(STAGES[0]);
    const [conductor, setConductor] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [result, setResult] = useState('Pending');
    const [remarks, setRemarks] = useState('');
    const [finalDecision, setFinalDecision] = useState('Pending');

    const currentRecord = records[activeStage];

    const loadStage = (stage: string) => {
        setActiveStage(stage);
        const saved = records[stage];
        setConductor(saved?.conductor ?? '');
        setDate(saved?.date ?? new Date().toISOString().slice(0, 10));
        setResult(saved?.result ?? 'Pending');
        setRemarks(saved?.remarks ?? '');
    };

    const saveStage = () => {
        if (!conductor.trim()) {
            Alert.alert('Conductor Required', 'Enter the name of the person conducting this phase.');
            return;
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            Alert.alert('Invalid Date', 'Use YYYY-MM-DD format.');
            return;
        }

        const record: StageRecord = {
            conductor: conductor.trim(),
            date,
            result,
            remarks: remarks.trim(),
            completed: result !== 'Pending',
        };

        setRecords(previous => ({ ...previous, [activeStage]: record }));
        Alert.alert('Saved', `${activeStage} details saved for this session.`);
    };

    const completedCount = STAGES.filter(
        stage => records[stage]?.completed,
    ).length;

    const allCompleted = completedCount === STAGES.length;

    const chooseDecision = (decision: string) => {
        if (!allCompleted) {
            Alert.alert(
                'Stages Incomplete',
                'Complete all eight recruitment phases before setting the final decision.',
            );
            return;
        }
        setFinalDecision(decision);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={25} color="#111827" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Recruitment Workflow</Text>
                <View style={{ width: 25 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.candidateCard}>
                    <Text style={styles.candidateName}>{candidate.name}</Text>
                    <Text style={styles.muted}>{candidate.id}</Text>
                    <Text style={styles.muted}>{candidate.designation}</Text>
                    <Text style={styles.progress}>
                        {completedCount} of {STAGES.length} phases completed
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>Recruitment Phases</Text>

                {STAGES.map((stage, index) => {
                    const saved = records[stage];
                    const selected = activeStage === stage;

                    return (
                        <TouchableOpacity
                            key={stage}
                            style={[styles.stageCard, selected && styles.selectedStage]}
                            onPress={() => loadStage(stage)}>
                            <View style={styles.stageNumber}>
                                <Text style={styles.stageNumberText}>{index + 1}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.stageName}>{stage}</Text>
                                <Text style={styles.muted}>
                                    {saved?.conductor
                                        ? `Conductor: ${saved.conductor}`
                                        : 'Conductor not assigned'}
                                </Text>
                            </View>
                            <MaterialIcons
                                name={saved?.completed ? 'check-circle' : 'chevron-right'}
                                size={22}
                                color={saved?.completed ? '#16A34A' : '#64748B'}
                            />
                        </TouchableOpacity>
                    );
                })}

                <Text style={styles.sectionTitle}>Manage Selected Phase</Text>
                <View style={styles.formCard}>
                    <Text style={styles.fieldLabel}>{activeStage}</Text>

                    <Text style={styles.label}>Conductor name</Text>
                    <TextInput
                        value={conductor}
                        onChangeText={setConductor}
                        style={styles.input}
                        placeholder="Enter conductor's full name"
                        placeholderTextColor="#9CA3AF"
                    />

                    <Text style={styles.label}>Phase date (YYYY-MM-DD)</Text>
                    <TextInput
                        value={date}
                        onChangeText={setDate}
                        style={styles.input}
                        placeholder="2026-10-10"
                        placeholderTextColor="#9CA3AF"
                    />

                    <Text style={styles.label}>Result</Text>
                    <View style={styles.options}>
                        {['Pending', 'Passed', 'Failed', 'On Hold'].map(option => (
                            <TouchableOpacity
                                key={option}
                                onPress={() => setResult(option)}
                                style={[
                                    styles.option,
                                    result === option && styles.selectedOption,
                                ]}>
                                <Text
                                    style={[
                                        styles.optionText,
                                        result === option && styles.selectedOptionText,
                                    ]}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.label}>Remarks</Text>
                    <TextInput
                        value={remarks}
                        onChangeText={setRemarks}
                        style={[styles.input, styles.multiline]}
                        placeholder="Enter assessment or remarks"
                        placeholderTextColor="#9CA3AF"
                        multiline
                        textAlignVertical="top"
                    />

                    <TouchableOpacity style={styles.primaryButton} onPress={saveStage}>
                        <Text style={styles.primaryButtonText}>Save Phase Details</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Final Recruitment Summary</Text>
                <View style={styles.formCard}>
                    {STAGES.map(stage => {
                        const record = records[stage];
                        return (
                            <View key={stage} style={styles.summaryRow}>
                                <Text style={styles.summaryStage}>{stage}</Text>
                                <Text style={styles.summaryValue}>
                                    {record
                                        ? `${record.result} · ${record.conductor}`
                                        : 'Not completed'}
                                </Text>
                                {record?.remarks ? (
                                    <Text style={styles.muted}>Remarks: {record.remarks}</Text>
                                ) : null}
                            </View>
                        );
                    })}

                    <Text style={styles.label}>Final Decision</Text>
                    <View style={styles.options}>
                        {['Selected', 'Rejected', 'On Hold'].map(option => (
                            <TouchableOpacity
                                key={option}
                                onPress={() => chooseDecision(option)}
                                style={[
                                    styles.option,
                                    finalDecision === option && styles.selectedOption,
                                ]}>
                                <Text
                                    style={[
                                        styles.optionText,
                                        finalDecision === option && styles.selectedOptionText,
                                    ]}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.finalDecision}>
                        Current decision: {finalDecision}
                    </Text>
                    {!allCompleted && (
                        <Text style={styles.muted}>
                            Complete every phase to enable the final decision.
                        </Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default RecruitmentWorkflowScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    header: {
        minHeight: 58,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    headerTitle: { fontSize: 17, fontWeight: '700', color: '#111827' },
    content: { padding: 16, paddingBottom: 35 },
    candidateCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 13,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    candidateName: { fontSize: 18, fontWeight: '700', color: '#111827' },
    muted: { fontSize: 12, color: '#6B7280', marginTop: 5 },
    progress: { fontSize: 13, fontWeight: '700', color: '#2563EB', marginTop: 12 },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111827',
        marginTop: 23,
        marginBottom: 11,
    },
    stageCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 11,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 11,
        padding: 12,
        marginBottom: 8,
    },
    selectedStage: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
    stageNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#E0EAFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stageNumberText: { color: '#2563EB', fontWeight: '700' },
    stageName: { fontSize: 13, fontWeight: '700', color: '#111827' },
    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        padding: 15,
    },
    fieldLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#2563EB',
        marginBottom: 15,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 7,
        marginTop: 8,
    },
    input: {
        minHeight: 45,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 9,
        paddingHorizontal: 11,
        color: '#111827',
        fontSize: 14,
    },
    multiline: { height: 85, paddingTop: 10 },
    options: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
    option: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 3,
    },
    selectedOption: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
    optionText: { fontSize: 12, color: '#374151', fontWeight: '600' },
    selectedOptionText: { color: '#FFFFFF' },
    primaryButton: {
        backgroundColor: '#2563EB',
        borderRadius: 9,
        minHeight: 47,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 17,
    },
    primaryButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
    summaryRow: {
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        paddingVertical: 10,
    },
    summaryStage: { fontSize: 13, fontWeight: '600', color: '#111827' },
    summaryValue: { fontSize: 12, color: '#2563EB', marginTop: 4 },
    finalDecision: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111827',
        marginTop: 13,
    },
});
