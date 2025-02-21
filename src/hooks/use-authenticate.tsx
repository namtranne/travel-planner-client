import { useMutation, useQuery } from '@tanstack/react-query';

import { login as loginApi } from '../services/api-auth';
import { getCurrentUser } from '../services/api-user';

export function useLogin() {
    const { mutate: login, isPending } = useMutation({
        mutationFn: ({ username, password }: { username: string; password: string }) =>
            loginApi({ username, password }),
        onSuccess: () => {
            console.log('Sign in successfully!');
        },
        onError: (err) => {
            console.error(err.message);
        }
    });

    return { login, isPending };
}

export function useUser() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser
    });
    if (error) {
        console.log('error', error);
    }

    return { isLoading, user: data, error };
}
