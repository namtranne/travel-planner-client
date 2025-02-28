export type SignupREQ = {
    email: string;
    name: string;
    username: string;
    password: string;
    passwordConfirm: string;
};

export type VerifyOtpEmailREQ = {
    email: string;
    otp: string;
};

export type VerifyOtpResetPasswordREQ = {
    usernameOrEmail: string;
    otp: string;
};

export type ResetPasswordREQ = {
    usernameOrEmail: string;
    password: string;
    passwordConfirm: string;
};

export type ChangePasswordREQ = {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
};
