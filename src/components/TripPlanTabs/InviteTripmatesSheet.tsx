import { Avatar, CheckBox } from '@rneui/base';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

import { useAddTripParticipant } from '@/src/hooks/use-trip';
import { useSearchUsers } from '@/src/hooks/use-user';

enum TripmatePermission {
    CanEdit = 'Can edit',
    CanView = 'Can view'
}

type AddedUser = {
    user: any;
    permission: TripmatePermission;
};

export const InviteTripmatesSheet = ({ tripId, joinedParticipants }: { tripId: number; joinedParticipants: any[] }) => {
    const [permission, setPermission] = useState<TripmatePermission>(TripmatePermission.CanView);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [addedUsers, setAddedUsers] = useState<AddedUser[]>([]);

    const { searchUsers, response, isPending: isLoadingUsers, error } = useSearchUsers();
    const { isPending: isPendingAddTripParticipant, addTripParticipant } = useAddTripParticipant();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);
    useEffect(() => {
        if (debouncedQuery) {
            searchUsers({ usernameOrEmail: debouncedQuery });
        }
    }, [debouncedQuery, searchUsers]);

    return (
        <View className="bg-white px-4">
            <View className="relative mt-2 flex-row items-center justify-center">
                <Text className="text-base font-bold">Invite tripmates</Text>
                {addedUsers.length > 0 && (
                    <TouchableOpacity
                        onPress={() => {
                            addTripParticipant(
                                {
                                    tripId,
                                    participants: addedUsers.map((addedUser) => ({
                                        userId: addedUser.user.id,
                                        isAllowedToEdit: addedUser.permission === TripmatePermission.CanEdit
                                    }))
                                },
                                {
                                    onSuccess: () => {
                                        setAddedUsers([]);
                                        setSearchQuery('');
                                        setDebouncedQuery('');
                                        Alert.alert('Invitations sent', '', []);
                                    },
                                    onError: (err: { message: string }) => {
                                        Alert.alert('Failed to send invitations', err.message, [
                                            {
                                                text: 'Try Again',
                                                onPress: () => console.log('User retries send invitations')
                                            },
                                            { text: 'Cancel', style: 'cancel' }
                                        ]);
                                    }
                                }
                            );
                        }}
                        className="absolute right-2"
                        disabled={isPendingAddTripParticipant}
                    >
                        <View className="relative">
                            <Iconify icon="codicon:send" size={20} className="text-[#60ABEF]" />
                            <View className="absolute -right-1 -top-1 h-3 w-3 items-center justify-center rounded-full bg-[#60ABEF]">
                                <Text className="text-[8px] font-bold text-white">{addedUsers.length}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
            <View className="mt-4">
                <View className="flex-row items-center justify-between rounded-xl bg-gray-100 px-4 py-2">
                    <View className="flex-1 flex-row items-center">
                        <Iconify icon="flowbite:user-add-solid" size={20} className="mr-2 text-gray-500" />
                        <TextInput
                            placeholder="Invite by username, email"
                            placeholderTextColor="#6b7280"
                            className="flex-1 text-sm text-gray-700"
                            multiline={false}
                            textAlignVertical="top"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    {permission === TripmatePermission.CanEdit ? (
                        <TouchableOpacity
                            className="ml-2 flex-row items-center"
                            onPress={() => setPermission(TripmatePermission.CanView)}
                            disabled={isPendingAddTripParticipant}
                        >
                            <Iconify icon="mdi:pencil" size={16} className="text-gray-500" />
                            <Text className="mr-1 text-sm font-bold text-gray-500">Can edit</Text>
                            <Iconify icon="mdi:chevron-down" size={16} className="text-gray-500" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            className="ml-2 flex-row items-center"
                            onPress={() => setPermission(TripmatePermission.CanEdit)}
                            disabled={isPendingAddTripParticipant}
                        >
                            <Iconify icon="mdi:eye-outline" size={16} className="text-gray-500" />
                            <Text className="mr-1 text-sm font-bold text-gray-500">Can view</Text>
                            <Iconify icon="mdi:chevron-down" size={16} className="text-gray-500" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View className="mt-4">
                {/* Loading Indicator and Error messages */}
                {isLoadingUsers && (
                    <View className="mt-4 flex items-center">
                        <ActivityIndicator size="small" color="#60ABEF" />
                    </View>
                )}
                {/* User List */}
                {!isLoadingUsers && response && response.users.length > 0 && searchQuery ? (
                    <ScrollView className="my-4 max-h-[500px]" keyboardShouldPersistTaps="always">
                        {error && (
                            <View className="mt-4 flex items-center">
                                <Text className="text-red-500">{error.message}</Text>
                            </View>
                        )}

                        {response.users
                            .filter(
                                (user: any) =>
                                    !joinedParticipants.some((participant: any) => participant.user.id === user.id)
                            )
                            .map((user: any) => (
                                <View key={user.id} className="mt-3 flex-row items-center justify-between">
                                    <View className="flex-row items-center">
                                        <Avatar
                                            rounded
                                            size={40}
                                            source={user.avatarUrl ? { uri: user.avatarUrl } : undefined}
                                            titleStyle={{ fontSize: 12 }}
                                            containerStyle={{
                                                borderWidth: 2,
                                                borderColor: 'white',
                                                backgroundColor: 'gray'
                                            }}
                                        />
                                        <View className="ml-2">
                                            <Text className="text-base font-semibold">{user.name}</Text>
                                            <Text className="text-xs text-gray-400">@{user.username}</Text>
                                        </View>
                                    </View>
                                    <CheckBox
                                        center
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        checkedColor="#60ABEF"
                                        checked={addedUsers.some((addedUser) => addedUser.user.id === user.id)}
                                        onPress={() => {
                                            if (addedUsers.some((addedUser) => addedUser.user.id === user.id)) {
                                                setAddedUsers(
                                                    addedUsers.filter((addedUser) => addedUser.user.id !== user.id)
                                                );
                                            } else {
                                                setAddedUsers([...addedUsers, { user, permission }]);
                                            }
                                            setSearchQuery('');
                                            setDebouncedQuery('');
                                        }}
                                    />
                                </View>
                            ))}
                    </ScrollView>
                ) : (
                    <View className="mt-2">
                        {addedUsers.length !== 0 && (
                            <Text className="text-sm font-bold text-gray-600">Added tripmate</Text>
                        )}
                        {addedUsers.length === 0 && (
                            <View className="mt-4 flex items-center">
                                <Text className="text-sm text-gray-500">No tripmate added</Text>
                            </View>
                        )}
                        <ScrollView className="my-4 max-h-[500px]" keyboardShouldPersistTaps="always">
                            {addedUsers.map((addedUser: any) => (
                                <View
                                    key={addedUser.user.id}
                                    className="mb-2 rounded-lg border border-gray-200 bg-white px-1 py-3"
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            setAddedUsers(
                                                addedUsers.filter((user) => user.user.id !== addedUser.user.id)
                                            );
                                        }}
                                        className="absolute right-2 top-2 z-10"
                                        disabled={isPendingAddTripParticipant}
                                    >
                                        <Iconify icon="mdi:close" size={18} className="text-gray-400" />
                                    </TouchableOpacity>
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center">
                                            <Avatar
                                                rounded
                                                size={40}
                                                source={
                                                    addedUser.user.avatarUrl
                                                        ? { uri: addedUser.user.avatarUrl }
                                                        : undefined
                                                }
                                                titleStyle={{ fontSize: 12 }}
                                                containerStyle={{
                                                    borderWidth: 2,
                                                    borderColor: 'white',
                                                    backgroundColor: 'gray'
                                                }}
                                            />
                                            <View className="ml-2">
                                                <Text className="text-base font-semibold">{addedUser.user.name}</Text>
                                                {addedUser.permission === TripmatePermission.CanEdit ? (
                                                    <TouchableOpacity
                                                        className="flex-row items-center"
                                                        onPress={() =>
                                                            setAddedUsers(
                                                                addedUsers.map((user) =>
                                                                    user.user.id === addedUser.user.id
                                                                        ? {
                                                                              ...user,
                                                                              permission: TripmatePermission.CanView
                                                                          }
                                                                        : user
                                                                )
                                                            )
                                                        }
                                                        disabled={isPendingAddTripParticipant}
                                                    >
                                                        <Iconify
                                                            icon="mdi:pencil"
                                                            size={16}
                                                            className="text-gray-400"
                                                        />
                                                        <Text className="ml-1 text-xs font-bold text-gray-400">
                                                            Can edit
                                                        </Text>
                                                    </TouchableOpacity>
                                                ) : (
                                                    <TouchableOpacity
                                                        className="flex-row items-center"
                                                        onPress={() =>
                                                            setAddedUsers(
                                                                addedUsers.map((user) =>
                                                                    user.user.id === addedUser.user.id
                                                                        ? {
                                                                              ...user,
                                                                              permission: TripmatePermission.CanEdit
                                                                          }
                                                                        : user
                                                                )
                                                            )
                                                        }
                                                        disabled={isPendingAddTripParticipant}
                                                    >
                                                        <Iconify
                                                            icon="mdi:eye-outline"
                                                            size={16}
                                                            className="text-gray-400"
                                                        />
                                                        <Text className="ml-1 text-xs font-bold text-gray-400">
                                                            Can view
                                                        </Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>
        </View>
    );
};
