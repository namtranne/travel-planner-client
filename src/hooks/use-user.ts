import { useMutation } from '@tanstack/react-query';

import { getUsers as getUsersApi, updateCurrentUser as updateCurrentUserApi } from '../services/api-user';
import type { UpdateUserREQ } from '../services/types';

export function useSearchUsers() {
    const {
        mutate: searchUsers,
        data: response,
        isPending,
        error
    } = useMutation({
        mutationFn: (data: { page?: number; limit?: number; usernameOrEmail: string }) =>
            getUsersApi({ page: data.page, limit: data.limit, usernameOrEmail: data.usernameOrEmail })
    });

    return {
        searchUsers,
        response,
        isPending,
        error
    };
}

export function useUpdateCurrentUser() {
    const { mutate: updateCurrentUser, isPending } = useMutation({
        mutationFn: (updateUserReq: UpdateUserREQ) => updateCurrentUserApi(updateUserReq),
        onSuccess: () => {},
        onError: (err) => {
            console.error(err.message);
        }
    });

    return { updateCurrentUser, isPending };
}
