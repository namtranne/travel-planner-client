import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import BackButton from '@/src/components/ui/BackButton';
import HeaderComponent from '@/src/components/ui/HeaderComponent';
import OptionItem from '@/src/components/ui/OptionItem';

const SettingsScreen = ({ navigation }: any) => {
    return (
        <View className="h-full w-full bg-white">
            <ScrollView showsHorizontalScrollIndicator={false}>
                <SafeAreaView>
                    <BackButton />
                    <HeaderComponent title="Settings" hasBackButton={false} />
                    <View className="w-full flex-1 px-6 pt-4">
                        {/* Settings Section */}
                        <View className="space-y-4">
                            <OptionItem
                                icon="mdi:translate"
                                title="Language"
                                handlePress={() => navigation.push('Profile')}
                            />
                            <OptionItem
                                icon="mdi:history"
                                title="Activity History"
                                handlePress={() => navigation.push('Profile')}
                            />
                            <OptionItem
                                icon="mdi-light:bell"
                                title="Notification Preferences"
                                handlePress={() => navigation.push('Profile')}
                            />
                            <OptionItem
                                icon="carbon:password"
                                title="Password & Security"
                                handlePress={() => navigation.push('ChangePassword')}
                            />
                        </View>
                        {/* Help & Feedback Section */}
                        <View className="mt-8 space-y-4">
                            <Text className="text-xl font-semibold">Help & Feedback</Text>
                            <OptionItem
                                icon="material-symbols:help-outline"
                                title="Support and Help"
                                handlePress={() => navigation.push('Profile')}
                            />
                            <OptionItem
                                icon="mdi-light:comment"
                                title="Feedback"
                                handlePress={() => navigation.push('Profile')}
                            />
                            <OptionItem
                                icon="solar:shield-line-duotone"
                                title="Privacy Policy"
                                handlePress={() => navigation.push('Profile')}
                            />
                            <OptionItem
                                icon="akar-icons:file"
                                title="Terms of Service"
                                handlePress={() => navigation.push('Profile')}
                            />
                        </View>
                        {/* Social Media Section */}
                        <View className="mt-8 space-y-4">
                            <Text className="text-xl font-semibold">Social Media</Text>
                            <OptionItem
                                icon="devicon:facebook"
                                title="Facebook"
                                handlePress={() => navigation.push('Profile')}
                            />
                            <OptionItem
                                icon="skill-icons:instagram"
                                title="Instagram"
                                handlePress={() => navigation.push('Profile')}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default SettingsScreen;
