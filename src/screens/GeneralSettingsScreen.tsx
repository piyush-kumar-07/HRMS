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
import {
    useTheme,
    type AppearanceMode,
} from '../context/ThemeContext';

const GeneralSettingsScreen = ({ navigation }: any) => {
    const { appearance: theme, isDark, setAppearance } = useTheme();

    const colors = {
        background: isDark ? '#111827' : '#FFFFFF',
        card: isDark ? '#1F2937' : '#FFFFFF',
        text: isDark ? '#F9FAFB' : '#111827',
        secondaryText: isDark ? '#9CA3AF' : '#6B7280',
        border: isDark ? '#374151' : '#E5E7EB',
        selected: isDark ? '#263D5C' : '#EFF6FF',
        divider: isDark ? '#374151' : '#F3F4F6',
        icon: isDark ? '#F9FAFB' : '#111827',
        input: isDark ? '#111827' : '#FFFFFF',
    };

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

    const handleThemeChange = (value: AppearanceMode) => {
        void setAppearance(value);
        markChanged();
    };

    const handleDateFormatChange = (value: string) => {
        setDateFormat(value);
        markChanged();
    };

    const handleTimeFormatChange = (value: string) => {
        setTimeFormat(value);
        markChanged();
    };

    const handleCurrencyChange = (value: string) => {
        setCurrency(value);
        markChanged();
    };

    const renderOption = (
        label: string,
        value: string,
        selected: boolean,
        onPress: () => void,
    ) => (
        <TouchableOpacity
            key={value}
            style={[
                styles.optionButton,
                {
                    backgroundColor: selected ? colors.selected : colors.card,
                },
            ]}
            onPress={onPress}
            activeOpacity={0.7}>
            <Text
                style={[
                    styles.optionText,
                    {
                        color: selected ? '#3B82F6' : colors.text,
                        fontWeight: selected ? '600' : '400',
                    },
                ]}>
                {label}
            </Text>

            {selected && (
                <MaterialIcons
                    name="check"
                    size={18}
                    color="#3B82F6"
                />
            )}
        </TouchableOpacity>
    );

    const renderNotificationRow = (
        title: string,
        description: string,
        value: boolean,
        onValueChange: (value: boolean) => void,
    ) => (
        <View
            style={[
                styles.notificationRow,
                { backgroundColor: colors.card },
            ]}>
            <View style={styles.notificationContent}>
                <Text
                    style={[
                        styles.notificationTitle,
                        { color: colors.text },
                    ]}>
                    {title}
                </Text>

                <Text
                    style={[
                        styles.notificationDescription,
                        { color: colors.secondaryText },
                    ]}>
                    {description}
                </Text>
            </View>

            <Switch
                value={value}
                onValueChange={nextValue => {
                    onValueChange(nextValue);
                    markChanged();
                }}
                trackColor={{
                    false: '#6B7280',
                    true: '#93C5FD',
                }}
                thumbColor={value ? '#2563EB' : '#F3F4F6'}
            />
        </View>
    );

    const renderCard = (children: React.ReactNode) => (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                },
            ]}>
            {children}
        </View>
    );

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: colors.background },
            ]}>
            <View
                style={[
                    styles.header,
                    {
                        backgroundColor: colors.background,
                        borderBottomColor: colors.border,
                    },
                ]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}>
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color={colors.icon}
                    />
                </TouchableOpacity>

                <Text
                    style={[
                        styles.headerTitle,
                        { color: colors.text },
                    ]}>
                    General Settings
                </Text>

                <View style={styles.headerSpacer} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}>
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        Appearance
                    </Text>

                    <Text
                        style={[
                            styles.sectionDescription,
                            { color: colors.secondaryText },
                        ]}>
                        Choose how the HRMS application should appear.
                    </Text>

                    {renderCard(
                        <>
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
                        </>,
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        Language
                    </Text>

                    <Text
                        style={[
                            styles.sectionDescription,
                            { color: colors.secondaryText },
                        ]}>
                        Select the language used throughout the application.
                    </Text>

                    {renderCard(
                        renderOption(
                            'English',
                            'English',
                            language === 'English',
                            () => {
                                setLanguage('English');
                                markChanged();
                            },
                        ),
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        Date & Time
                    </Text>

                    {renderCard(
                        <>
                            <Text
                                style={[
                                    styles.settingLabel,
                                    { color: colors.text },
                                ]}>
                                Date Format
                            </Text>

                            <View style={styles.optionGroup}>
                                {renderOption(
                                    'DD/MM/YYYY',
                                    'DD/MM/YYYY',
                                    dateFormat === 'DD/MM/YYYY',
                                    () => handleDateFormatChange('DD/MM/YYYY'),
                                )}
                                {renderOption(
                                    'MM/DD/YYYY',
                                    'MM/DD/YYYY',
                                    dateFormat === 'MM/DD/YYYY',
                                    () => handleDateFormatChange('MM/DD/YYYY'),
                                )}
                                {renderOption(
                                    'YYYY-MM-DD',
                                    'YYYY-MM-DD',
                                    dateFormat === 'YYYY-MM-DD',
                                    () => handleDateFormatChange('YYYY-MM-DD'),
                                )}
                            </View>

                            <View
                                style={[
                                    styles.divider,
                                    { backgroundColor: colors.divider },
                                ]}
                            />

                            <Text
                                style={[
                                    styles.settingLabel,
                                    { color: colors.text },
                                ]}>
                                Time Format
                            </Text>

                            <View style={styles.optionGroup}>
                                {renderOption(
                                    '12 Hour',
                                    '12 Hour',
                                    timeFormat === '12 Hour',
                                    () => handleTimeFormatChange('12 Hour'),
                                )}
                                {renderOption(
                                    '24 Hour',
                                    '24 Hour',
                                    timeFormat === '24 Hour',
                                    () => handleTimeFormatChange('24 Hour'),
                                )}
                            </View>
                        </>,
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        Currency
                    </Text>

                    <Text
                        style={[
                            styles.sectionDescription,
                            { color: colors.secondaryText },
                        ]}>
                        Currency used for salary, payroll and financial calculations.
                    </Text>

                    {renderCard(
                        renderOption(
                            'INR (₹)',
                            'INR',
                            currency === 'INR (₹)',
                            () => handleCurrencyChange('INR (₹)'),
                        ),
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        Notifications
                    </Text>

                    <Text
                        style={[
                            styles.sectionDescription,
                            { color: colors.secondaryText },
                        ]}>
                        Control which HRMS activities can generate notifications.
                    </Text>

                    {renderCard(
                        <>
                            {renderNotificationRow(
                                'Leave Requests',
                                'Notify when a leave request is submitted or updated.',
                                leaveNotifications,
                                setLeaveNotifications,
                            )}

                            <View
                                style={[
                                    styles.divider,
                                    { backgroundColor: colors.divider },
                                ]}
                            />

                            {renderNotificationRow(
                                'Attendance',
                                'Notify about important attendance activities.',
                                attendanceNotifications,
                                setAttendanceNotifications,
                            )}

                            <View
                                style={[
                                    styles.divider,
                                    { backgroundColor: colors.divider },
                                ]}
                            />

                            {renderNotificationRow(
                                'Payroll',
                                'Notify about payroll processing and updates.',
                                payrollNotifications,
                                setPayrollNotifications,
                            )}
                        </>,
                    )}
                </View>

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

                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>

                <Text
                    style={[
                        styles.note,
                        { color: colors.secondaryText },
                    ]}>
                    Appearance changes apply immediately. Other settings are currently
                    managed locally in this screen.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default GeneralSettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
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
        marginBottom: 5,
    },
    sectionDescription: {
        fontSize: 12,
        lineHeight: 18,
        marginBottom: 10,
    },
    card: {
        borderWidth: 1,
        borderRadius: 12,
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
    optionText: {
        fontSize: 13,
    },
    settingLabel: {
        fontSize: 13,
        fontWeight: '700',
        paddingHorizontal: 14,
        paddingTop: 14,
        paddingBottom: 5,
    },
    divider: {
        height: 1,
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
    },
    notificationDescription: {
        fontSize: 11,
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
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 16,
    },
});