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
    first_name: string;
    last_name: string;
    family: string;
    repeat_password: string;
}

export type ResetPasswordData = {
    password: string;
    repeat_password: string;
};

export interface LoggedInUser extends Item {
    first_name: string;
    last_name: string;
    email: string;
    family: string;
    family_users: User[];
}
