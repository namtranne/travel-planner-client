import type { AxiosError, AxiosInstance, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

export const getToken = async (): Promise<string> => {
    try {
        const token = await SecureStore.getItemAsync('token');
        return token ? JSON.parse(token) : '';
    } catch (error) {
        console.error('Error getting token from SecureStore:', error);
        return '';
    }
};

const authAxios: AxiosInstance = axios.create({
    baseURL: Constants.expoConfig?.extra?.API_URL_LOCAL
});

authAxios.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = await getToken();
        if (token) {
            const newConfig = {
                ...config,
                headers: { ...config.headers, Authorization: `Bearer ${token}` } as AxiosRequestHeaders
            };
            return newConfig;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

authAxios.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            try {
                authAxios.defaults.headers.common.Authorization = null;
                // return await SecureStore.deleteItemAsync('token');
            } catch (storageError) {
                console.error('Error removing token from SecureStore:', storageError);
            }
        }
        return Promise.reject(error);
    }
);

export default authAxios;
