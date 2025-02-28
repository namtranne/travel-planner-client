import authAxios, { getToken } from '../utils/axios';

export const getCurrentUser = async () => {
    try {
        if (!getToken()) return null;
        const { data } = await authAxios.get('/users');
        return data.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};
