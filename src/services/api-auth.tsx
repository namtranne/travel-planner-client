import AsyncStorage from '@react-native-async-storage/async-storage';

import authAxios from '../utils/axios';

export const login = async ({ username, password }: { username: string; password: string }) => {
    const data = await authAxios
        .post('/auth/login', { username, password })
        .then((response) => {
            AsyncStorage.setItem('token', JSON.stringify(response.data.data.accessToken));
        })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
};
