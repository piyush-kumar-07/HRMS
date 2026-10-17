import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    DarkTheme,
    DefaultTheme,
    type Theme as NavigationTheme,
} from '@react-navigation/native';

export type AppearanceMode = 'Light' | 'Dark' | 'System';

export type AppColors = {
    background: string;
    surface: string;
    card: string;
    text: string;
    secondaryText: string;
    mutedText: string;
    border: string;
    divider: string;
    primary: string;
    primaryText: string;
    selected: string;
    inputBackground: string;
    placeholder: string;
    danger: string;
    success: string;
    warning: string;
    overlay: string;
    tabBar: string;
};

type ThemeContextType = {
    appearance: AppearanceMode;
    isDark: boolean;
    colors: AppColors;
    navigationTheme: NavigationTheme;
    setAppearance: (mode: AppearanceMode) => Promise<void>;
};

const APPEARANCE_KEY = '@hrms_appearance';

const lightColors: AppColors = {
    background: '#F9FAFB',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    text: '#111827',
    secondaryText: '#4B5563',
    mutedText: '#6B7280',
    border: '#E5E7EB',
    divider: '#F3F4F6',
    primary: '#2563EB',
    primaryText: '#FFFFFF',
    selected: '#EFF6FF',
    inputBackground: '#FFFFFF',
    placeholder: '#9CA3AF',
    danger: '#DC2626',
    success: '#16A34A',
    warning: '#D97706',
    overlay: 'rgba(0,0,0,0.4)',
    tabBar: '#FFFFFF',
};

const darkColors: AppColors = {
    background: '#111827',
    surface: '#1F2937',
    card: '#1F2937',
    text: '#F9FAFB',
    secondaryText: '#D1D5DB',
    mutedText: '#9CA3AF',
    border: '#374151',
    divider: '#374151',
    primary: '#60A5FA',
    primaryText: '#111827',
    selected: '#263D5C',
    inputBackground: '#111827',
    placeholder: '#9CA3AF',
    danger: '#F87171',
    success: '#4ADE80',
    warning: '#FBBF24',
    overlay: 'rgba(0,0,0,0.65)',
    tabBar: '#1F2937',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const systemColorScheme = useColorScheme();

    const [appearance, setAppearanceState] =
        useState<AppearanceMode>('Light');

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadAppearance = async () => {
            try {
                const saved = await AsyncStorage.getItem(APPEARANCE_KEY);

                if (
                    saved === 'Light' ||
                    saved === 'Dark' ||
                    saved === 'System'
                ) {
                    setAppearanceState(saved);
                }
            } catch (error) {
                console.warn('Could not load appearance setting.', error);
            } finally {
                setLoaded(true);
            }
        };

        void loadAppearance();
    }, []);

    const setAppearance = async (mode: AppearanceMode) => {
        setAppearanceState(mode);

        try {
            await AsyncStorage.setItem(APPEARANCE_KEY, mode);
        } catch (error) {
            console.warn('Could not save appearance setting.', error);
        }
    };

    const isDark =
        appearance === 'Dark' ||
        (appearance === 'System' && systemColorScheme === 'dark');

    const colors = isDark ? darkColors : lightColors;

    const navigationTheme = useMemo<NavigationTheme>(() => {
        const base = isDark ? DarkTheme : DefaultTheme;

        return {
            ...base,
            dark: isDark,
            colors: {
                ...base.colors,
                primary: colors.primary,
                background: colors.background,
                card: colors.surface,
                text: colors.text,
                border: colors.border,
                notification: colors.danger,
            },
        };
    }, [isDark, colors]);

    const contextValue = useMemo(
        () => ({
            appearance,
            isDark,
            colors,
            navigationTheme,
            setAppearance,
        }),
        [appearance, isDark, colors, navigationTheme],
    );

    if (!loaded) {
        return null;
    }

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used inside ThemeProvider.');
    }

    return context;
};