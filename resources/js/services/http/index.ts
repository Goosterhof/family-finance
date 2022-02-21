import axios, {AxiosRequestConfig} from 'axios';
import {RequestMiddleware, ResponseErrorMiddleware, ResponseMiddleware} from 'types/types';

const HEADERS_TO_TYPE: Record<string, string> = {
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'application/xlsx',
};

const baseURL = '/api';

const http = axios.create({
    baseURL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

const requestMiddleware: RequestMiddleware[] = [];
const responseMiddleware: ResponseMiddleware[] = [];
const responseErrorMiddleware: ResponseErrorMiddleware[] = [];

http.interceptors.request.use(request => {
    for (const middleware of requestMiddleware) middleware(request);
    return request;
});

http.interceptors.response.use(
    response => {
        for (const middleware of responseMiddleware) middleware(response);
        return response;
    },
    error => {
        if (!error.response) return Promise.reject(error);
        for (const middleware of responseErrorMiddleware) middleware(error);
        return Promise.reject(error);
    },
);

/**
 * send a get request to the given endpoint
 */
export const getRequest = async (endpoint: string, options?: AxiosRequestConfig) => http.get(endpoint, options);

/**
 * send a post request to the given endpoint with the given data
 */
export const postRequest = async (endpoint: string, data: unknown) => http.post(endpoint, data);

/**
 * send a put request to the given endpoint with the given data
 */
export const putRequest = async (endpoint: string, data: unknown) => http.put(endpoint, data);

/**
 * send a delete request to the given endpoint
 */
export const deleteRequest = async (endpoint: string) => http.delete(endpoint);

/**
 * download a file from the backend
 *
 * if you want a specific document name you can set document name
 * if it's not given, then it will try to resolve the filename from the response headers content-disposition
 *
 * type should be resolved automagically, if not, then you can pass the type
 */
export const download = async (endpoint: string, documentName?: string, type?: string) =>
    http.get(endpoint, {responseType: 'blob'}).then(response => {
        const contentType = response.headers['content-type'];
        if (!type && contentType in HEADERS_TO_TYPE) {
            type = HEADERS_TO_TYPE[contentType];
        }
        const blob = new Blob([response.data], {type});
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);

        // If documentName is given use that as the document name
        if (documentName) {
            link.download = documentName;
            link.click();
            return response;
        }

        const contentHeaders = response.headers['content-disposition'];

        const fileNameString = 'filename="';
        const firstIndex = contentHeaders.indexOf(fileNameString) + fileNameString.length;
        // TODO :: do something when the firstindex is not found

        const lastIndex = contentHeaders.slice(firstIndex).indexOf('"');
        link.download = contentHeaders.slice(firstIndex, lastIndex);

        link.click();
        return response;
    });

export const registerRequestMiddleware = (middlewareFunc: RequestMiddleware) => requestMiddleware.push(middlewareFunc);
export const registerResponseMiddleware = (middlewareFunc: ResponseMiddleware) =>
    responseMiddleware.push(middlewareFunc);
export const registerResponseErrorMiddleware = (middlewareFunc: ResponseErrorMiddleware) =>
    responseErrorMiddleware.push(middlewareFunc);
