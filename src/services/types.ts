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

export type UpdateUserREQ = {
    name?: string;
    gender?: string;
    username?: string;
    phoneNumber?: string;
    nationality?: string;
    avatar?: any;
};

export type CreateTripREQ = {
    locationId: number;
    startDate?: string;
    endDate?: string;
};

export type UpdateTripREQ = {
    title?: string;
    startDate?: string;
    endDate?: string;
};

export type CreateTripOverviewSectionREQ = {
    title: string;
    description?: string;
    sectionType: SectionType;
};

export enum SectionType {
    COMMON = 'COMMON',
    RESERVATION = 'RESERVATION',
    ATTACHMENT = 'ATTACHMENT'
}

export type UpdateTripOverviewSectionREQ = {
    title?: string;
    description?: string;
};

export type CreatePlaceToVisitREQ = {
    placeId: number;
    startDate?: string;
    endDate?: string;
    expense?: number;
};

export type UpdatePlaceToVisitREQ = {
    startDate?: string;
    endDate?: string;
    expense?: number;
};

export type CreateNoteREQ = {
    content: string;
};

export type UpdateNoteREQ = {
    content?: string;
};

export type CreateCheckListREQ = {
    title: string;
};

export type UpdateCheckListREQ = {
    title?: string;
};

export type CreateCheckListItemREQ = {
    title: string;
    isChecked?: boolean;
};

export type UpdateCheckListItemREQ = {
    title?: string;
    isChecked?: boolean;
};

export type UpdateTripItineraryDayREQ = {
    subHeading?: string;
    description?: string;
};

export type AutofillItineraryREQ = {
    startDate: string;
    endDate: string;
};

export type UpdateTripBudgetREQ = {
    budget?: number;
    currency?: string;
};

export type CreateTripExpenseREQ = {
    expense: number;
    tripExpenseSplitType: TripExpenseSplitType;
    tripExpenseType: TripExpenseType;
    payerId: number;
    details?: string;
    date?: string;
    tripExpenseIndividuals?: number[];
};

export type UpdateTripExpenseREQ = {
    expense?: number;
    tripExpenseSplitType?: TripExpenseSplitType;
    tripExpenseType?: TripExpenseType;
    payerId?: number;
    details?: string;
    date?: string;
    tripExpenseIndividuals?: number[];
};

export enum TripExpenseSplitType {
    INDIVIDUALS = 'INDIVIDUALS',
    EVERYONE = 'EVERYONE',
    NONE = 'NONE'
}

export enum TripExpenseType {
    TRANSPORTATION = 'TRANSPORTATION',
    LODGING = 'LODGING',
    FOOD_AND_DRINK = 'FOOD_AND_DRINK',
    SIGHTSEEING = 'SIGHTSEEING',
    ACTIVITIES = 'ACTIVITIES',
    SHOPPING = 'SHOPPING',
    GROCERIES = 'GROCERIES',
    OTHER = 'OTHER'
}
