import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import MaterialIcons from '@react-native-vector-icons/material-icons';

const PayrollSettingsScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color="#111827"
                    />
                </TouchableOpacity>

                <Text style={styles.title}>Payroll Settings</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.comingSoon}>
                    Payroll settings
                </Text>
            </View>
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

    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginLeft: 16,
    },

    content: {
        padding: 20,
    },

    comingSoon: {
        fontSize: 14,
        color: '#6B7280',
    },
});

export default PayrollSettingsScreen;