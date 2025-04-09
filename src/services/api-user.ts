import authAxios, { getToken } from '../utils/axios';
import type { UpdateUserREQ } from './types';

export const getUsers = async ({
    page,
    limit,
    usernameOrEmail
}: {
    page?: number;
    limit?: number;
    usernameOrEmail: string;
}) => {
    try {
        const { data } = await authAxios.get('/users', {
            params: { page, limit, usernameOrEmail }
        });
        return data.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};
export const getCurrentUser = async () => {
    try {
        const token = await getToken();
        if (!token) return null;
        const { data } = await authAxios.get('/users/me');
        return data.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};

export const updateCurrentUser = async (profile: UpdateUserREQ) => {
    try {
        const formData = new FormData();

        if (profile.name) formData.append('name', profile.name);
        if (profile.phoneNumber) formData.append('phoneNumber', profile.phoneNumber);
        if (profile.gender) formData.append('gender', profile.gender);

        if (profile.avatar) {
            const filename = profile.avatar.split('/').pop();
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image`;
            formData.append('avatar', JSON.parse(JSON.stringify({ uri: profile.avatar, name: filename, type })));
        }

        const response = await authAxios.patch('/users', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};
