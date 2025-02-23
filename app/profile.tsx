import { Avatar } from '@rneui/themed';
import { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import BackButton from '@/src/components/ui/BackButton';
import HeaderComponent from '@/src/components/ui/HeaderComponent';

export default function ProfileScreen() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        Name: 'VietNam',
        Email: 'VietNam',
        PhoneNumber: 'VietNam',
        Gender: 'VietNam'
    });

    const handleChange = (key: keyof typeof profile, value: string) => {
        setProfile({ ...profile, [key]: value });
    };

    return (
        <ScrollView className="flex-1 bg-white">
            <SafeAreaView>
                <BackButton />
                <HeaderComponent title="Profile" hasBackButton={false} />
                <View className="w-full px-6 pt-4">
                    <View className="mt-6 items-center">
                        <Avatar
                            size={100}
                            rounded
                            source={{ uri: 'https://i.pravatar.cc/150' }}
                            avatarStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                        />
                        <TouchableOpacity className="absolute bottom-0 right-0 rounded-full bg-white p-1">
                            <Icon name="camera" size={18} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className="mt-8 space-y-4">
                        {Object.keys(profile).map((key) => (
                            <View key={key}>
                                <Text className="text-sm text-gray-500">{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
                                <TextInput
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-base"
                                    value={profile[key as keyof typeof profile]}
                                    onChangeText={(text) => handleChange(key as keyof typeof profile, text)}
                                    editable={isEditing}
                                />
                            </View>
                        ))}
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}
