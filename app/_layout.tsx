// @@iconify-code-gen

import { useFonts } from 'expo-font'; // Static import
import { Slot } from 'expo-router';
import { NativeWindStyleSheet } from 'nativewind';
import { ActivityIndicator, View } from 'react-native';

import { Inter, InterItalic } from '@/assets';

NativeWindStyleSheet.setOutput({
    default: 'native'
});

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Inter,
        'Inter-Italic': InterItalic
    });

    // Show loading state while fonts are loading
    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View className="h-full w-full bg-[#FAFAFA]">
            <Slot />
        </View>
    );
}
