import { useMutation } from '@tanstack/react-query';

import { updateCurrentUser as updateCurrentUserApi } from '../services/api-user';
import type { UpdateUserREQ } from '../services/types';

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
