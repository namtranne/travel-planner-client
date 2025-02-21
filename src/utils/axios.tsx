import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AxiosError, AxiosInstance, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import Constants from 'expo-constants';

export const getToken = async (): Promise<string> => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token ? JSON.parse(token) : '';
    } catch (error) {
        console.error('Error getting token from AsyncStorage:', error);
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
                await AsyncStorage.removeItem('token');
                authAxios.defaults.headers.common.Authorization = null;
            } catch (storageError) {
                console.error('Error removing token from AsyncStorage:', storageError);
            }
        }
        return Promise.reject(error);
    }
);

export default authAxios;
