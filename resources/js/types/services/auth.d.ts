import {Component} from 'vue';
import {Item} from 'types/types';
import {User} from 'types/models/user';

export type AuthComponents = {
    login: Component;
    resetPassword: Component;
    forgotPassword?: Component;
    setPassword?: Component;
};

export interface LoginCredentials {
    /** the email to login with */
    email: string;
    /** the password to login with */
    password: string;
    /** if you want a persistent login */
    rememberMe: boolean;
}

export interface RegisterCredentials extends LoginCredentials {
    firstName: string;
    lastName: string;
    family: string;
    repeatPassword: string;
}

export type ResetPasswordData = {
    password: string;
    repeatPassword: string;
};

export interface LoggedInUser extends Item {
    firstName: string;
    lastName: string;
    email: string;
    family: string;
    familyMembers: User[];
}
