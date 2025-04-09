import { Avatar } from '@rneui/base';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

import { useUser } from '@/src/hooks/use-authenticate';
import { useGetTripParticipants, useRemoveTripParticipant } from '@/src/hooks/use-trip';

export const TripCollaboratorsSheet = ({
    tripId,
    ownerId,
    openInviteTripmatesSheet
}: {
    tripId: number;
    ownerId: number;
    openInviteTripmatesSheet: () => void;
}) => {
    const [isOwner, setIsOwner] = useState(false);

    const { isLoading: isLoadingUser, user } = useUser();
    const { isPending: isPendingRemoveTripParticipant, removeTripParticipant } = useRemoveTripParticipant();
    const { isLoading: isLoadingParticipants, tripParticipants: collaborators } = useGetTripParticipants(tripId);

    useEffect(() => {
        if (user) {
            setIsOwner(user.id === ownerId);
        }
    }, [user, ownerId]);

    if (isLoadingUser || isLoadingParticipants) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#60ABEF" />
            </View>
        );
    }
    return (
        <View className="bg-white px-4">
            <View className="flex-row items-center justify-center">
                <Text className="text-base font-bold">Trip Collaborators</Text>
            </View>
            <View className="mt-4">
                {collaborators.some(
                    (collaborator: any) => collaborator.user.id === user.id && collaborator.allowedToEdit
                ) && (
                    <TouchableOpacity className="ml-2 flex-row items-center" onPress={openInviteTripmatesSheet}>
                        <Iconify icon="flowbite:user-add-solid" size={20} className="text-black" />
                        <Text className="ml-3 text-base font-bold">Invite tripmate</Text>
                    </TouchableOpacity>
                )}
                <ScrollView>
                    {collaborators.map((collaborator: any) => (
                        <View key={collaborator.user.id} className="mt-3 flex-row items-center justify-between">
                            <View className="flex-row items-center">
                                <Avatar
                                    rounded
                                    size={40}
                                    source={
                                        collaborator.user.avatarUrl ? { uri: collaborator.user.avatarUrl } : undefined
                                    }
                                    titleStyle={{ fontSize: 12 }}
                                    containerStyle={{
                                        borderWidth: 2,
                                        borderColor: 'white',
                                        backgroundColor: 'gray'
                                    }}
                                />
                                <Text className="ml-2 text-base font-semibold">
                                    {collaborator.user.name} {collaborator.user.id === user.id && '(You)'}
                                </Text>
                            </View>
                            {isOwner && collaborator.user.id !== user.id && (
                                <TouchableOpacity
                                    className="flex-row items-center"
                                    onPress={() => {
                                        Alert.alert(
                                            'Remove Collaborator',
                                            `Are you sure you want to remove ${collaborator.user.name} from the trip ?`,
                                            [
                                                {
                                                    text: 'Cancel',
                                                    style: 'cancel'
                                                },
                                                {
                                                    text: 'Yes',
                                                    onPress: () =>
                                                        removeTripParticipant({
                                                            tripId,
                                                            participantId: collaborator.user.id
                                                        })
                                                }
                                            ]
                                        );
                                    }}
                                    disabled={isPendingRemoveTripParticipant}
                                >
                                    <Iconify icon="mdi:remove" size={18} className="font-bold text-gray-500" />
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};
