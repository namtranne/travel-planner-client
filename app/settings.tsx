import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import HeaderComponent from '@/src/components/ui/HeaderComponent';
import OptionItem from '@/src/components/ui/OptionItem';

const SettingsScreen = () => {
    const { t } = useTranslation();
    return (
        <View className="h-full w-full bg-white">
            <ScrollView showsHorizontalScrollIndicator={false}>
                <SafeAreaView>
                    <HeaderComponent title={t('Settings')} hasBackButton backPath="/home-tabs/account" />
                    <View className="w-full flex-1 px-6 pt-4">
                        {/* Settings Section */}
                        <View className="space-y-4">
                            <OptionItem
                                icon="mdi:translate"
                                title={t('Language')}
                                handlePress={() => router.push('/language-settings')}
                            />
                            <OptionItem
                                icon="mdi:history"
                                title={t('Activity History')}
                                handlePress={() => router.push('/profile')}
                            />
                            <OptionItem
                                icon="mdi-light:bell"
                                title={t('Notification Preferences')}
                                handlePress={() => router.push('/profile')}
                            />
                            <OptionItem
                                icon="carbon:password"
                                title={t('Password & Security')}
                                handlePress={() => router.push('/change-password')}
                            />
                        </View>
                        {/* Help & Feedback Section */}
                        <View className="mt-8 space-y-4">
                            <Text className="text-xl font-semibold">{t('Help & Feedback')}</Text>
                            <OptionItem
                                icon="material-symbols:help-outline"
                                title={t('Support and Help')}
                                handlePress={() => router.push('/profile')}
                            />
                            <OptionItem
                                icon="mdi-light:comment"
                                title={t('Feedback')}
                                handlePress={() => router.push('/profile')}
                            />
                            <OptionItem
                                icon="solar:shield-line-duotone"
                                title={t('Privacy Policy')}
                                handlePress={() => router.push('/profile')}
                            />
                            <OptionItem
                                icon="akar-icons:file"
                                title={t('Terms of Service')}
                                handlePress={() => router.push('/profile')}
                            />
                        </View>
                        {/* Social Media Section */}
                        <View className="mt-8 space-y-4">
                            <Text className="text-xl font-semibold">{t('Social Media')}</Text>
                            <OptionItem
                                icon="devicon:facebook"
                                title="Facebook"
                                handlePress={() => router.push('/profile')}
                            />
                            <OptionItem
                                icon="skill-icons:instagram"
                                title="Instagram"
                                handlePress={() => router.push('/profile')}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default SettingsScreen;
