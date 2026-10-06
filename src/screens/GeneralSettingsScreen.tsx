import React, { useState } from 'react';

import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import MaterialIcons from '@react-native-vector-icons/material-icons';

const GeneralSettingsScreen = ({ navigation }: any) => {
    const [theme, setTheme] = useState<'Light' | 'Dark' | 'System'>('Light');

    const [language, setLanguage] = useState('English');

    const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');

    const [timeFormat, setTimeFormat] = useState('12 Hour');

    const [currency, setCurrency] = useState('INR (₹)');

    const [leaveNotifications, setLeaveNotifications] = useState(true);
    const [attendanceNotifications, setAttendanceNotifications] =
        useState(true);
    const [payrollNotifications, setPayrollNotifications] = useState(true);

    const [hasChanges, setHasChanges] = useState(false);

    const markChanged = () => {
        setHasChanges(true);
    };

    const handleSave = () => {
        Alert.alert(
            'Confirm Changes',
            'Are you sure you want to save these general settings?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Save',
                    onPress: () => {
                        setHasChanges(false);

                        console.log('General settings saved');
                    },
                },
            ],
        );
    };

    const handleThemeChange = (
        value: 'Light' | 'Dark' | 'System',
    ) => {
        setTheme(value);
        markChanged();
    };

    const handleDateFormatChange = (
        value: string,
    ) => {
        setDateFormat(value);
        markChanged();
    };

    const handleTimeFormatChange = (
        value: string,
    ) => {
        setTimeFormat(value);
        markChanged();
    };

    const handleCurrencyChange = (
        value: string,
    ) => {
        setCurrency(value);
        markChanged();
    };

    const renderOption = (
        label: string,
        value: string,
        selected: boolean,
        onPress: () => void,
    ) => {
        return (
            <TouchableOpacity
                style={[
                    styles.optionButton,
                    selected && styles.selectedOption,
                ]}
                onPress={onPress}
                activeOpacity={0.7}>
                <Text
                    style={[
                        styles.optionText,
                        selected && styles.selectedOptionText,
                    ]}>
                    {label}
                </Text>

                {selected && (
                    <MaterialIcons
                        name="check"
                        size={18}
                        color="#2563EB"
                    />
                )}
            </TouchableOpacity>
        );
    };

    const renderNotificationRow = (
        title: string,
        description: string,
        value: boolean,
        onValueChange: (value: boolean) => void,
    ) => {
        return (
            <View style={styles.notificationRow}>
                <View style={styles.notificationContent}>
                    <Text style={styles.notificationTitle}>
                        {title}
                    </Text>

                    <Text style={styles.notificationDescription}>
                        {description}
                    </Text>
                </View>

                <Switch
                    value={value}
                    onValueChange={value => {
                        onValueChange(value);
                        markChanged();
                    }}
                    trackColor={{
                        false: '#D1D5DB',
                        true: '#93C5FD',
                    }}
                    thumbColor={
                        value ? '#2563EB' : '#F3F4F6'
                    }
                />
            </View>
        );
    };

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
                    General Settings
                </Text>

                <View style={styles.headerSpacer} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}>

                {/* Appearance */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Appearance
                    </Text>

                    <Text style={styles.sectionDescription}>
                        Choose how the HRMS application should appear.
                    </Text>

                    <View style={styles.card}>
                        {renderOption(
                            'Light',
                            'Light',
                            theme === 'Light',
                            () => handleThemeChange('Light'),
                        )}

                        {renderOption(
                            'Dark',
                            'Dark',
                            theme === 'Dark',
                            () => handleThemeChange('Dark'),
                        )}

                        {renderOption(
                            'System Default',
                            'System',
                            theme === 'System',
                            () => handleThemeChange('System'),
                        )}
                    </View>
                </View>

                {/* Language */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Language
                    </Text>

                    <Text style={styles.sectionDescription}>
                        Select the language used throughout the application.
                    </Text>

                    <View style={styles.card}>
                        {renderOption(
                            'English',
                            'English',
                            language === 'English',
                            () => {
                                setLanguage('English');
                                markChanged();
                            },
                        )}
                    </View>
                </View>

                {/* Date & Time */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Date & Time
                    </Text>

                    <View style={styles.card}>
                        <Text style={styles.settingLabel}>
                            Date Format
                        </Text>

                        <View style={styles.optionGroup}>
                            {renderOption(
                                'DD/MM/YYYY',
                                'DD/MM/YYYY',
                                dateFormat === 'DD/MM/YYYY',
                                () =>
                                    handleDateFormatChange(
                                        'DD/MM/YYYY',
                                    ),
                            )}

                            {renderOption(
                                'MM/DD/YYYY',
                                'MM/DD/YYYY',
                                dateFormat === 'MM/DD/YYYY',
                                () =>
                                    handleDateFormatChange(
                                        'MM/DD/YYYY',
                                    ),
                            )}

                            {renderOption(
                                'YYYY-MM-DD',
                                'YYYY-MM-DD',
                                dateFormat === 'YYYY-MM-DD',
                                () =>
                                    handleDateFormatChange(
                                        'YYYY-MM-DD',
                                    ),
                            )}
                        </View>

                        <View style={styles.divider} />

                        <Text style={styles.settingLabel}>
                            Time Format
                        </Text>

                        <View style={styles.optionGroup}>
                            {renderOption(
                                '12 Hour',
                                '12 Hour',
                                timeFormat === '12 Hour',
                                () =>
                                    handleTimeFormatChange(
                                        '12 Hour',
                                    ),
                            )}

                            {renderOption(
                                '24 Hour',
                                '24 Hour',
                                timeFormat === '24 Hour',
                                () =>
                                    handleTimeFormatChange(
                                        '24 Hour',
                                    ),
                            )}
                        </View>
                    </View>
                </View>

                {/* Currency */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Currency
                    </Text>

                    <Text style={styles.sectionDescription}>
                        Currency used for salary, payroll and financial
                        calculations.
                    </Text>

                    <View style={styles.card}>
                        {renderOption(
                            'INR (₹)',
                            'INR',
                            currency === 'INR (₹)',
                            () =>
                                handleCurrencyChange(
                                    'INR (₹)',
                                ),
                        )}

                        {renderOption(
                            'USD ($)',
                            'USD',
                            currency === 'USD ($)',
                            () =>
                                handleCurrencyChange(
                                    'USD ($)',
                                ),
                        )}

                        {renderOption(
                            'EUR (€)',
                            'EUR',
                            currency === 'EUR (€)',
                            () =>
                                handleCurrencyChange(
                                    'EUR (€)',
                                ),
                        )}
                    </View>
                </View>

                {/* Notifications */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Notifications
                    </Text>

                    <Text style={styles.sectionDescription}>
                        Control which HRMS activities can generate
                        notifications.
                    </Text>

                    <View style={styles.card}>
                        {renderNotificationRow(
                            'Leave Requests',
                            'Notify when a leave request is submitted or updated.',
                            leaveNotifications,
                            setLeaveNotifications,
                        )}

                        <View style={styles.divider} />

                        {renderNotificationRow(
                            'Attendance',
                            'Notify about important attendance activities.',
                            attendanceNotifications,
                            setAttendanceNotifications,
                        )}

                        <View style={styles.divider} />

                        {renderNotificationRow(
                            'Payroll',
                            'Notify about payroll processing and updates.',
                            payrollNotifications,
                            setPayrollNotifications,
                        )}
                    </View>
                </View>

                {/* Save */}
                <TouchableOpacity
                    style={[
                        styles.saveButton,
                        !hasChanges && styles.disabledSaveButton,
                    ]}
                    disabled={!hasChanges}
                    onPress={handleSave}
                    activeOpacity={0.8}>
                    <MaterialIcons
                        name="save"
                        size={19}
                        color="#FFFFFF"
                    />

                    <Text style={styles.saveButtonText}>
                        Save Changes
                    </Text>
                </TouchableOpacity>

                <Text style={styles.note}>
                    These settings will apply throughout the HRMS
                    application.
                </Text>

            </ScrollView>
        </SafeAreaView>
    );
};

export default GeneralSettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },

    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTitle: {
        flex: 1,
        fontSize: 21,
        fontWeight: '700',
        color: '#111827',
        marginLeft: 6,
    },

    headerSpacer: {
        width: 40,
    },

    content: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },

    section: {
        marginBottom: 24,
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 5,
    },

    sectionDescription: {
        fontSize: 12,
        color: '#6B7280',
        lineHeight: 18,
        marginBottom: 10,
    },

    card: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
    },

    optionGroup: {
        paddingVertical: 4,
    },

    optionButton: {
        minHeight: 45,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    selectedOption: {
        backgroundColor: '#EFF6FF',
    },

    optionText: {
        fontSize: 13,
        color: '#374151',
    },

    selectedOptionText: {
        color: '#2563EB',
        fontWeight: '600',
    },

    settingLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: '#374151',
        paddingHorizontal: 14,
        paddingTop: 14,
        paddingBottom: 5,
    },

    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginHorizontal: 14,
    },

    notificationRow: {
        minHeight: 70,
        paddingHorizontal: 14,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    notificationContent: {
        flex: 1,
        paddingRight: 10,
    },

    notificationTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },

    notificationDescription: {
        fontSize: 11,
        color: '#6B7280',
        lineHeight: 16,
        marginTop: 3,
    },

    saveButton: {
        height: 46,
        backgroundColor: '#2563EB',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },

    disabledSaveButton: {
        backgroundColor: '#9CA3AF',
    },

    saveButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
        marginLeft: 8,
    },

    note: {
        fontSize: 11,
        color: '#9CA3AF',
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 16,
    },
});