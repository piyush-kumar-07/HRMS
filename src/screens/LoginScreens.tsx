import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';

type LoginScreenProps = {
    setIsLoggedIn: (value: boolean) => void;
};

const LoginScreen = ({ setIsLoggedIn }: LoginScreenProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                {/* Logo */}
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                />

                {/* Heading */}
                <Text style={styles.title}>Welcome Back</Text>

                <Text style={styles.subtitle}>
                    Login to your account
                </Text>

                {/* Email / Employee ID */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email / Employee ID</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email or employee ID"
                        placeholderTextColor="#4B0082"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                </View>

                {/* Password */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor="#4B0082"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                {/* Login Button */}
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                {/* Forgot Password */}
                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>
                        Forgot Password?
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    content: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 80,
    },

    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginBottom: 30,
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 17,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 35,
    },

    inputContainer: {
        marginBottom: 20,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#460404',
        marginBottom: 8,
    },

    input: {
        height: 52,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 15,
        color: '#111827',
    },

    loginButton: {
        height: 52,
        backgroundColor: '#2563EB',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },

    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },

    forgotPassword: {
        textAlign: 'center',
        color: '#2563EB',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 20,
    },
});

export default LoginScreen;