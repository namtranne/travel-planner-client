// import { useTranslation } from 'react-i18next';
import { Icon } from '@rneui/base';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import HeaderComponent from '@/src/components/ui/HeaderComponent';

const languages = [
    { code: 'en', label: 'English' },
    { code: 'vi', label: 'Vietnamese' },
    { code: 'zh', label: 'Chinese' }
];

export default function LanguageSettings() {
    const { i18n, t } = useTranslation();
    const [selectedLang, setSelectedLang] = useState(i18n.language);

    const handleSelect = async (code: string) => {
        setSelectedLang(code);
        await i18n.changeLanguage(code);
        await SecureStore.setItemAsync('user-language', code);
    };

    return (
        <ScrollView className="flex-1 bg-white px-4 pt-4">
            <SafeAreaView>
                <HeaderComponent title={t('Languages')} hasBackButton backPath="/settings" />
                <Text className="mb-2 mt-4 text-base font-semibold">{t('Language')}</Text>
                <View className="mt-4 space-y-4 rounded-xl px-4 py-3">
                    {languages.map((lang) => (
                        <TouchableOpacity
                            key={lang.code}
                            onPress={() => handleSelect(lang.code)}
                            className="flex-row items-center justify-between"
                        >
                            <Text className="text-base">{t(lang.label)}</Text>
                            {selectedLang === lang.code && <Icon name="check" color="#60ABEF" />}
                        </TouchableOpacity>
                    ))}
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}
