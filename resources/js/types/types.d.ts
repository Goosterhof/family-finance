import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Component, Ref} from 'vue';

export type RequestMiddleware = (request: AxiosRequestConfig) => void;
export type ResponseMiddleware = (response: AxiosResponse) => void;
export type ResponseErrorMiddleware = (error: AxiosError) => void;

export type Cache = {[key: string]: number};

export interface Item {
    id: number;
}

type ErrorBag = {[property: string]: string[]};
export type ErrorBagRef = Ref<ErrorBag>;

export type State = Ref<{[id: number]: Readonly<Item>}>;

export type Translation = {singular: string; plural: string};
export type Translations = {[moduleName: string]: Translation};

export type ToastVariant =
    | 'danger'
    | 'success'
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'white'
    | 'transparent';

export type ToastMessage = {
    message: string;
    variant?: ToastVariant;
    duration: number;
    show: Ref<boolean>;
    timeoutId?: NodeJS.Timeout;
};
export type ToastMessages = Ref<ToastMessage[]>;

export type Modal = {
    id?: string;
    title?: string;
    titleTag?: string;
    titleClass?: string[];

    message?: string;

    okTitle?: string;
    okAction: () => void;

    cancelTitle?: string;
    cancelAction?: () => void;
};

export type Modals = Ref<Modal[]>;

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
    repeatPassword: string;
};

export type IsLoggedIn = Ref<boolean>;
export type LoggedInUser = Ref<Item>;

export const MSG_PACK_DATA_TYPE = 'msg-pack';
export type StaticDataTypes = readonly (string | {[staticDataName: string]: typeof MSG_PACK_DATA_TYPE})[];
