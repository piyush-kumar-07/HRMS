import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';

type CandidateProfileProps = {
    route: any;
    navigation: any;
};

const CandidateProfileScreen = ({
    route,
    navigation,
}: CandidateProfileProps) => {
    const candidate = route.params.candidate;

    // Optional previous employment details
    const previousWork = candidate.previousWork ?? null;

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
                        Candidate Profile
                    </Text>

                    <View style={styles.headerSpace} />
                </View>

                {/* Candidate Header */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {candidate.name.charAt(0)}
                        </Text>
                    </View>

                    <Text style={styles.candidateName}>
                        {candidate.name}
                    </Text>

                    <Text style={styles.candidateId}>
                        {candidate.id}
                    </Text>

                    <Text style={styles.candidateDesignation}>
                        {candidate.designation}
                    </Text>
                </View>

                {/* Recruitment Status */}
                <Text style={styles.sectionTitle}>
                    Recruitment Status
                </Text>

                <View style={styles.card}>
                    <DetailRow
                        label="Current Stage"
                        value={candidate.stage}
                    />
                </View>
                <TouchableOpacity
                    style={styles.actionCard}
                    activeOpacity={0.75}
                    onPress={() => {
                        navigation.navigate('RecruitmentWorkflowScreen', {
                            candidate: candidate,
                        });
                    }
                    }>
                    <View>
                        <Text style={styles.actionTitle}>Manage Recruitment Phases</Text>
                        <Text style={styles.actionSubtitle}>
                            Assign conductors, record results, and view final decision
                        </Text>
                    </View>
                    <Text style={styles.arrow}>→</Text>
                </TouchableOpacity>

                {/* Candidate Details */}
                <Text style={styles.sectionTitle}>
                    Candidate Details
                </Text>

                <View style={styles.card}>
                    <DetailRow
                        label="Full Name"
                        value={candidate.name}
                    />

                    <DetailRow
                        label="Candidate ID"
                        value={candidate.id}
                    />

                    <DetailRow
                        label="Designation"
                        value={candidate.designation}
                    />
                </View>

                {/* Previous Work */}
                <Text style={styles.sectionTitle}>
                    Previous Work
                </Text>

                <View style={styles.card}>
                    {previousWork &&
                        (previousWork.companyName ||
                            previousWork.period ||
                            previousWork.role) ? (
                        <>
                            <DetailRow
                                label="Last Worked Company Name"
                                value={
                                    previousWork.companyName || 'Not provided'
                                }
                            />

                            <DetailRow
                                label="Period"
                                value={
                                    previousWork.period || 'Not provided'
                                }
                            />

                            <DetailRow
                                label="Role"
                                value={
                                    previousWork.role || 'Not provided'
                                }
                            />
                        </>
                    ) : (
                        <View style={styles.emptyWork}>
                            <Text style={styles.emptyWorkTitle}>
                                No Previous Work Experience
                            </Text>

                            <Text style={styles.emptyWorkSubtitle}>
                                Previous employment details have not been
                                added for this candidate.
                            </Text>
                        </View>
                    )}
                </View>

                {/* Documents */}
                <Text style={styles.sectionTitle}>
                    Documents
                </Text>

                <TouchableOpacity
                    style={styles.actionCard}
                    activeOpacity={0.75}>

                    <View>
                        <Text style={styles.actionTitle}>
                            Candidate Documents
                        </Text>

                        <Text style={styles.actionSubtitle}>
                            View candidate documents
                        </Text>
                    </View>

                    <Text style={styles.arrow}>→</Text>
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
}) => (
    <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

export default CandidateProfileScreen;

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
        marginTop: 40,
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

    candidateName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
    },

    candidateId: {
        fontSize: 13,
        color: '#2563EB',
        marginTop: 4,
    },

    candidateDesignation: {
        fontSize: 13,
        color: '#2563EB',
        marginTop: 5,
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
        color: '#2B61BD',
    },

    detailValue: {
        fontSize: 14,
        color: '#111827',
        fontWeight: '500',
        marginTop: 3,
    },

    emptyWork: {
        paddingVertical: 20,
    },

    emptyWorkTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
    },

    emptyWorkSubtitle: {
        fontSize: 12,
        lineHeight: 18,
        color: '#9CA3AF',
        marginTop: 5,
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
