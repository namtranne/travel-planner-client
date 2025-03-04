import { Avatar } from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Button from '@/src/components/ui/CommonButton';
import HeaderComponent from '@/src/components/ui/HeaderComponent';
import { useUser } from '@/src/hooks/use-authenticate';
import { useUpdateCurrentUser } from '@/src/hooks/use-user';

export default function ProfileScreen() {
    const { user, isLoading } = useUser();
    const { updateCurrentUser, isPending } = useUpdateCurrentUser();
    const initialProfile = {
        Name: user?.name || '',
        Email: user?.email || '',
        PhoneNumber: user?.phoneNumber || '',
        Gender: user?.gender || '',
        AvatarUrl: user?.avatarUrl || ''
    };

    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(initialProfile);

    useEffect(() => {
        if (user) {
            setProfile({
                Name: user.name,
                Email: user.email,
                PhoneNumber: user.phoneNumber,
                Gender: user.gender,
                AvatarUrl: user.avatarUrl || ''
            });
        }
    }, [user]);

    const handleChange = (key: keyof typeof profile, value: string) => {
        setProfile({ ...profile, [key]: value });
    };

    const handleSave = async () => {
        try {
            updateCurrentUser({
                name: profile.Name,
                phoneNumber: profile.PhoneNumber,
                gender: profile.Gender,
                avatar: profile.AvatarUrl
            });
            setIsEditing(false);
        } catch (error: any) {
            console.error('Error saving profile:', error);
        }
    };

    const handleCancel = () => {
        setProfile(initialProfile);
        setIsEditing(false);
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#60ABEF" />
            </View>
        );
    }

    const handleChoosePhoto = async () => {
        Alert.alert('Upload Photo', 'Choose image source', [
            {
                text: 'Take a photo',
                onPress: async () => {
                    const { status } = await ImagePicker.requestCameraPermissionsAsync();
                    if (status !== 'granted') {
                        Alert.alert('Permission Denied', 'Camera access is required to take a photo.');
                        return;
                    }

                    const result = await ImagePicker.launchCameraAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        quality: 0.8
                    });

                    if (!result.canceled) {
                        if (result.assets && result.assets.length > 0) {
                            setProfile((prev) => ({ ...prev, AvatarUrl: result?.assets[0]?.uri || '' }));
                        }
                    }
                }
            },
            {
                text: 'Choose from library',
                onPress: async () => {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (status !== 'granted') {
                        Alert.alert('Permission Denied', 'Gallery access is required to choose a photo.');
                        return;
                    }

                    const result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [4, 3],
                        quality: 1
                    });

                    if (!result.canceled) {
                        setProfile((prev) => ({ ...prev, AvatarUrl: result?.assets[0]?.uri || '' }));
                    }
                }
            },
            { text: 'Cancel', style: 'cancel' }
        ]);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView className="flex-1 bg-gray-50">
                <SafeAreaView>
                    <HeaderComponent title="Profile" hasBackButton />
                    <View className="w-full px-6 pt-4">
                        <View className="relative mt-6 items-center">
                            <Avatar
                                size={150}
                                rounded
                                source={{
                                    uri:
                                        profile.AvatarUrl ||
                                        'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
                                }}
                                avatarStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                containerStyle={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 4
                                }}
                            />
                            {isEditing && (
                                <TouchableOpacity
                                    onPress={handleChoosePhoto}
                                    className="absolute bottom-[-20px] -translate-x-1/2 rounded-full bg-white p-2 shadow-md"
                                >
                                    <Icon name="camera" size={22} color="#60ABEF" />
                                </TouchableOpacity>
                            )}
                        </View>

                        <View className="mt-8 space-y-6">
                            {Object.keys(profile)
                                .filter((key) => key !== 'AvatarUrl') // Không hiển thị field AvatarUrl ở đây
                                .map((key) => (
                                    <View key={key} className="space-y-2">
                                        <Text className="text-sm font-semibold text-gray-600">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </Text>
                                        {isEditing ? (
                                            <TextInput
                                                className="rounded-md border border-gray-300 bg-white p-2 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                value={profile[key as keyof typeof profile]}
                                                onChangeText={(text) => handleChange(key as keyof typeof profile, text)}
                                                style={{ textAlignVertical: 'center' }}
                                            />
                                        ) : (
                                            <Text className="text-base text-gray-800">
                                                {profile[key as keyof typeof profile]}
                                            </Text>
                                        )}
                                    </View>
                                ))}
                        </View>

                        <View className="mt-8 flex-row justify-between">
                            {isEditing ? (
                                <>
                                    <Button
                                        text="Cancel"
                                        onPress={handleCancel}
                                        additionalStyle="bg-gray-500 w-[150px]"
                                    />
                                    <Button
                                        text="Save"
                                        onPress={handleSave}
                                        additionalStyle="bg-[#60ABEF] w-[150px]"
                                        isPending={isPending}
                                    />
                                </>
                            ) : (
                                <Button
                                    text="Edit"
                                    onPress={() => setIsEditing(true)}
                                    additionalStyle="bg-[#60ABEF] w-[150px]"
                                />
                            )}
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
