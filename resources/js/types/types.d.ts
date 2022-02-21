import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Ref} from 'vue';

export type RequestMiddleware = (request: AxiosRequestConfig) => void;
export type ResponseMiddleware = (response: AxiosResponse) => void;
export type ResponseErrorMiddleware = (error: AxiosError) => void;

export interface Item {
    id: number;
}

type ErrorBag = {[property: string]: string[]};
export type ErrorBagRef = Ref<ErrorBag>;

export type State<T extends Item> = Ref<{[id: number]: Readonly<T>}>;

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
