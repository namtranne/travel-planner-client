// @@iconify-code-gen

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font'; // Static import
import { Slot } from 'expo-router';
import { NativeWindStyleSheet } from 'nativewind';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Toast, { ErrorToast } from 'react-native-toast-message';

import { Inter, InterItalic } from '@/assets';

import { initI18n } from '../src/i18n';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 5 * 1000
        }
    }
});

NativeWindStyleSheet.setOutput({
    default: 'native'
});

const toastConfig = {
    error: (props: any) => (
        <SafeAreaInsetsContext.Consumer>
            {(insets) => (
                <ErrorToast
                    {...props}
                    style={{
                        marginTop: insets?.top ?? 10, // safe distance from top
                        marginHorizontal: 16,
                        borderLeftColor: 'red'
                    }}
                    text1Style={{ fontWeight: 'bold' }}
                    text2Style={{ flexWrap: 'wrap' }}
                    text2NumberOfLines={0}
                />
            )}
        </SafeAreaInsetsContext.Consumer>
    )
};

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Inter,
        'Inter-Italic': InterItalic
    });

    useEffect(() => {
        const initialize = async () => {
            await initI18n();
        };

        initialize();
    }, []);

    // Show loading state while fonts are loading
    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <QueryClientProvider client={queryClient}>
            <View className="h-full w-full bg-[#FAFAFA]">
                <Slot />
                <Toast config={toastConfig} />
            </View>
        </QueryClientProvider>
    );
}
