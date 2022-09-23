import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL ? `${import.meta.env.VITE_BASE_URL}/api` : '/api';

const HEADERS_TO_TYPE: {[type: string]: string} = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'application/xlsx',
};

const CLIENT_API = import.meta.env.BASE_URL === '/client/' ? `${API_URL}/client` : API_URL;

const http = axios.create({
    baseURL: CLIENT_API,
    withCredentials: CLIENT_API === `${location.origin}/api`,
    headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Accept: 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
    },
});

type AxiosResponseError = AxiosError<
    {
        message?: string;
        errors?: {
            [property: string]: string[];
        };
    },
    unknown
>;

type RequestMiddlewareFunc = (response: AxiosRequestConfig) => void;
type ResponseMiddlewareFunc = (response: AxiosResponse) => void;
type ResponseErrorMiddlewareFunc = (error: AxiosResponseError) => void;

const requestMiddleware: RequestMiddlewareFunc[] = [];
const responseMiddleware: ResponseMiddlewareFunc[] = [];
const responseErrorMiddleware: ResponseErrorMiddlewareFunc[] = [];

http.interceptors.request.use(request => {
    for (const middleware of requestMiddleware) middleware(request);

    return request;
});

http.interceptors.response.use(
    response => {
        for (const middleware of responseMiddleware) middleware(response);

        return response;
    },
    // eslint-disable-next-line promise/prefer-await-to-callbacks
    error => {
        if (!axios.isAxiosError(error)) return Promise.reject(error);

        for (const middleware of responseErrorMiddleware) middleware(error as AxiosResponseError);

        return Promise.reject(error);
    },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRequest = <T = any>(endpoint: string, options?: AxiosRequestConfig) => http.get<T>(endpoint, options);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postRequest = <T = any>(endpoint: string, data: unknown, options?: AxiosRequestConfig) =>
    http.post<T>(endpoint, data, options);

export const deleteRequest = (endpoint: string) => http.delete(endpoint);

/**
 * Download a file from the backend
 * type should be resolved automagically, if not, then you can pass the type
 */
export const downloadRequest = async (endpoint: string, documentName: string, type?: string) => {
    const response = await http.get(endpoint, {responseType: 'blob'});
    const {data, headers} = response;
    const actualType = type || HEADERS_TO_TYPE[headers['content-type']] || headers['content-type'];
    if (!actualType) throw new Error('No content type found');

    const blob = new Blob([data], {type: actualType});
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = documentName;
    link.click();
    return response;
};

export const registerRequestMiddleware = (middlewareFunc: RequestMiddlewareFunc) => {
    requestMiddleware.push(middlewareFunc);
};

export const registerResponseMiddleware = (middlewareFunc: ResponseMiddlewareFunc) => {
    responseMiddleware.push(middlewareFunc);
};

export const registerResponseErrorMiddleware = (middlewareFunc: ResponseErrorMiddlewareFunc) =>
    responseErrorMiddleware.push(middlewareFunc);
