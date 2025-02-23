import { useMutation, useQuery } from '@tanstack/react-query';

import {
    changePassword as changePasswordApi,
    forgotPassword as forgotPasswordApi,
    login as loginApi,
    logout as logoutApi,
    resendOtpEmail as resendOtpEmailApi,
    resendOtpResetPassword as resendOtpResetPasswordApi,
    resetPassword as resetPasswordApi,
    signUp as signUpApi,
    verifyOtpEmail as verifyOtpEmailApi,
    verifyOtpResetPassword as verifyOtpResetPasswordApi
} from '../services/api-auth';
import { getCurrentUser } from '../services/api-user';
import type {
    ChangePasswordREQ,
    ResetPasswordREQ,
    SignupREQ,
    VerifyOtpEmailREQ,
    VerifyOtpResetPasswordREQ
} from '../services/types';

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
export function useSignUp() {
    const { mutate: signUp, isPending } = useMutation({
        mutationFn: (signUpReq: SignupREQ) => signUpApi(signUpReq),
        onSuccess: () => {
            console.log('Sign up successfully!');
        },
        onError: (err) => {
            console.error(err.message);
        }
    });

    return { signUp, isPending };
}

export function useVerifyOtpEmail() {
    const { mutate: verifyOtpEmail, isPending } = useMutation({
        mutationFn: (verifyOtpEmailReq: VerifyOtpEmailREQ) => verifyOtpEmailApi(verifyOtpEmailReq),
        onSuccess: () => {},
        onError: (err) => {
            console.error(err.message);
        }
    });

    return { verifyOtpEmail, isPending };
}

export function useResendOtpEmail() {
    const { mutate: resendOtpEmail, isPending } = useMutation({
        mutationFn: (email: string) => resendOtpEmailApi(email),
        onSuccess: () => {},
        onError: (err) => {
            console.error(err.message);
        }
    });

    return { resendOtpEmail, isPending };
}

export function useForgotPassword() {
    const { mutate: forgotPassword, isPending } = useMutation({
        mutationFn: (usernameOrEmail: string) => forgotPasswordApi(usernameOrEmail),
        onSuccess: () => {},
        onError: (err) => {
            console.error(err.message);
        }
    });

    return { forgotPassword, isPending };
}

export function useVerifyOtpResetPassword() {
    const { mutate: verifyOtpResetPassword, isPending } = useMutation({
        mutationFn: (verifyOtpResetPasswordReq: VerifyOtpResetPasswordREQ) =>
            verifyOtpResetPasswordApi(verifyOtpResetPasswordReq),
        onSuccess: () => {},
        onError: (err) => {
            console.error(err.message);
        }
    });

    return { verifyOtpResetPassword, isPending };
}

export function useResendOtpResetPassword() {
    const { mutate: resendOtpResetPassword, isPending } = useMutation({
        mutationFn: (usernameOrEmail: string) => resendOtpResetPasswordApi(usernameOrEmail),
        onSuccess: () => {},
        onError: (err) => {
            console.error(err.message);
        }
    });

    return { resendOtpResetPassword, isPending };
}

export function useResetPassword() {
    const { mutate: resetPassword, isPending } = useMutation({
        mutationFn: (resetPasswordReq: ResetPasswordREQ) => resetPasswordApi(resetPasswordReq),
        onSuccess: () => {},
        onError: (err) => {
            console.error(err.message);
        }
    });

    return { resetPassword, isPending };
}

export function useChangePassword() {
    const { mutate: changePassword, isPending } = useMutation({
        mutationFn: (changePasswordReq: ChangePasswordREQ) => changePasswordApi(changePasswordReq),
        onSuccess: () => {},
        onError: (err) => {
            console.error(err.message);
        }
    });

    return { changePassword, isPending };
}

export function useLogout() {
    const { mutate: logout, isPending } = useMutation({
        mutationFn: () => logoutApi(),
        onSuccess: () => {},
        onError: (err) => {
            console.error(err.message);
        }
    });

    return { logout, isPending };
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
