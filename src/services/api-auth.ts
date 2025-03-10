import * as SecureStore from 'expo-secure-store';

import authAxios from '../utils/axios';
import type {
    ChangePasswordREQ,
    ResetPasswordREQ,
    SignupREQ,
    VerifyOtpEmailREQ,
    VerifyOtpResetPasswordREQ
} from './types';

export const login = async ({ username, password }: { username: string; password: string }) => {
    const data = await authAxios
        .post('/auth/login', { username, password })
        .then(async (response) => {
            await SecureStore.setItemAsync('token', JSON.stringify(response.data.data.accessToken));
        })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
};

export const loginGoogle = async (idToken: string) => {
    const data = await authAxios
        .post('/auth/login/google', { idToken })
        .then(async (response) => {
            await SecureStore.setItemAsync('token', JSON.stringify(response.data.data.accessToken));
        })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
};

export const signUp = async (signUpReq: SignupREQ) => {
    const data = await authAxios
        .post('/auth/register', signUpReq)
        .then((response) => {
            console.log('response', JSON.stringify(response));
        })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
};

export const verifyOtpEmail = async (verifyOtpEmailReq: VerifyOtpEmailREQ) => {
    const data = await authAxios
        .post('/auth/verify-otp-email', verifyOtpEmailReq)
        .then((response) => {
            console.log('response', JSON.stringify(response));
        })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
};

export const resendOtpEmail = async (email: string) => {
    const data = await authAxios
        .post('/auth/resend-otp-email', { email })
        .then((response) => {
            console.log('response', JSON.stringify(response));
        })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
};

export const forgotPassword = async (usernameOrEmail: string) => {
    const data = await authAxios
        .post('/auth/forgot-password', { username: usernameOrEmail })
        .then((response) => {
            console.log('response', JSON.stringify(response));
        })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
};

export const verifyOtpResetPassword = async (verifyOtpResetPasswordReq: VerifyOtpResetPasswordREQ) => {
    const data = await authAxios
        .post('/auth/verify-otp-reset-password', {
            username: verifyOtpResetPasswordReq.usernameOrEmail,
            otp: verifyOtpResetPasswordReq.otp
        })
        .then((response) => {
            console.log('response', JSON.stringify(response));
        })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
};

export const resendOtpResetPassword = async (usernameOrEmail: string) => {
    const data = await authAxios
        .post('/auth/resend-otp-reset-password', { username: usernameOrEmail })
        .then((response) => {
            console.log('response', JSON.stringify(response));
        })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
};

export const resetPassword = async (resetPasswordReq: ResetPasswordREQ) => {
    const data = await authAxios
        .post('/auth/reset-password', {
            username: resetPasswordReq.usernameOrEmail,
            password: resetPasswordReq.password,
            passwordConfirm: resetPasswordReq.passwordConfirm
        })
        .then((response) => {
            console.log('response', JSON.stringify(response));
        })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
};

export const changePassword = async (changePasswordReq: ChangePasswordREQ) => {
    const data = await authAxios
        .post('/auth/change-password', changePasswordReq)
        .then((response) => {
            console.log('response', JSON.stringify(response));
        })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
};

export const logout = async () => {
    const data = await authAxios
        .post('/auth/logout')
        .then((response) => {
            console.log('response', JSON.stringify(response));
        })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
};
