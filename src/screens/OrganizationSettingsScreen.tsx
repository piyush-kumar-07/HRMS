import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';

import MaterialIcons from '@react-native-vector-icons/material-icons';
import { launchImageLibrary } from 'react-native-image-picker';

const OrganizationSettingsScreen = ({ navigation }: any) => {
    const [companyName, setCompanyName] = useState(
        'BARC Security Solution',
    );
    const [registrationId, setRegistrationId] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');

    const handleSave = () => {
        Alert.alert(
            'Confirm Changes',
            'Are you sure you want to save these organization changes?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Save',
                    onPress: () => {
                        console.log('Organization details saved');
                    },
                },
            ],
        );
    };
    const [companyLogo, setCompanyLogo] = useState<string | null>(null);
    const handleChangeLogo = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
            quality: 1,
        });

        if (result.didCancel) {
            return;
        }

        if (result.errorCode) {
            Alert.alert(
                'Unable to Select Image',
                result.errorMessage || 'Something went wrong.',
            );
            return;
        }

        const uri = result.assets?.[0]?.uri;

        if (uri) {
            setCompanyLogo(uri);
        }
    };

    const renderInput = (
        label: string,
        value: string,
        onChangeText: (text: string) => void,
        placeholder: string,
        keyboardType:
            | 'default'
            | 'email-address'
            | 'phone-pad'
            | 'numeric' = 'default',
    ) => {
        return (
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{label}</Text>

                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    keyboardType={keyboardType}
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

                <Text style={styles.headerTitle}>Organization</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>

                {/* Company Information */}
                <Text style={styles.sectionTitle}>
                    COMPANY INFORMATION
                </Text>
                <View style={styles.logoCard}>
                    <View style={styles.logoContainer}>
                        {companyLogo ? (
                            <Image
                                source={{ uri: companyLogo }}
                                style={styles.logoImage}
                            />
                        ) : (
                            <MaterialIcons
                                name="business"
                                size={32}
                                color="#2563EB"
                            />
                        )}
                    </View>

                    <View style={styles.logoContent}>
                        <Text style={styles.logoTitle}>
                            Company Logo
                        </Text>

                        <Text style={styles.logoDescription}>
                            Add or change the organization logo
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.changeButton}
                        onPress={handleChangeLogo}
                        activeOpacity={0.7}>
                        <Text style={styles.changeButtonText}>
                            {companyLogo ? 'Change' : 'Add'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {renderInput(
                    'Company Name',
                    companyName,
                    setCompanyName,
                    'Enter company name',
                )}

                {renderInput(
                    'Registration / Organization ID',
                    registrationId,
                    setRegistrationId,
                    'Enter registration ID',
                )}

                {/* Address */}
                <Text style={styles.sectionTitle}>
                    ADDRESS
                </Text>

                {renderInput(
                    'Address',
                    address,
                    setAddress,
                    'Enter company address',
                )}

                <View style={styles.row}>
                    <View style={styles.halfInput}>
                        {renderInput(
                            'City',
                            city,
                            setCity,
                            'Enter city',
                        )}
                    </View>

                    <View style={styles.halfInput}>
                        {renderInput(
                            'State',
                            state,
                            setState,
                            'Enter state',
                        )}
                    </View>
                </View>

                {renderInput(
                    'PIN Code',
                    pinCode,
                    setPinCode,
                    'Enter PIN code',
                    'numeric',
                )}

                {/* Contact Information */}
                <Text style={styles.sectionTitle}>
                    CONTACT INFORMATION
                </Text>

                {renderInput(
                    'Phone Number',
                    phone,
                    setPhone,
                    'Enter phone number',
                    'phone-pad',
                )}

                {renderInput(
                    'Email',
                    email,
                    setEmail,
                    'Enter email address',
                    'email-address',
                )}

                {renderInput(
                    'Website',
                    website,
                    setWebsite,
                    'Enter website',
                )}

                {/* Save */}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                    activeOpacity={0.8}>

                    <MaterialIcons
                        name="save"
                        size={20}
                        color="#FFFFFF"
                    />

                    <Text style={styles.saveButtonText}>
                        Save Changes
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },

    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginTop: 20,

    },

    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 40,
    },

    sectionTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: '#6B7280',
        marginTop: 16,
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    logoImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },

    logoCard: {
        minHeight: 78,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#BBBDBF',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: 16,
    },

    logoContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    logoContent: {
        flex: 1,
    },

    logoTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },

    logoDescription: {
        fontSize: 11,
        color: '#6B7280',
        marginTop: 3,
    },

    changeButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 7,
        backgroundColor: '#EFF6FF',
    },

    changeButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#2563EB',
    },

    inputGroup: {
        marginBottom: 14,
    },

    inputLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#2563EB',
        marginBottom: 6,
    },

    input: {
        height: 46,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 13,
        color: '#111827',
    },

    row: {
        flexDirection: 'row',
        gap: 10,
    },

    halfInput: {
        flex: 1,
    },

    saveButton: {
        height: 48,
        backgroundColor: '#2563EB',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
    },

    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
});

export default OrganizationSettingsScreen;