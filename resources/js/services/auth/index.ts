import {Component, ref} from 'vue';

import {getRequestWithoutCache, postRequest, registerResponseErrorMiddleware} from 'services/http';
import {addRoute, goToRoute, registerBeforeMiddleware} from 'services/router';
import {clearStorage, getItemFromStorage, setItemInStorage} from 'services/storage';
import {
    IsLoggedIn,
    Item,
    LoggedInUser,
    LoginCredentials,
    ResetPasswordData,
    ResponseErrorMiddleware,
} from 'types/types';
import {NavigationGuard} from 'vue-router';

const LOGIN_ROUTE_NAME = 'Login';
export const FORGOT_PASSWORD_ROUTE_NAME = 'ForgotPassword';
const RESET_PASSWORD_ROUTE_NAME = 'ResetPassword';
const SET_PASSWORD_ROUTE_NAME = 'SetPassword';

const APP_NAME = 'Family Finance';
const IS_LOGGED_IN_KEY = APP_NAME + ' is magical';
const LOGGED_IN_USER_KEY = APP_NAME + ' is supreme';

const apiLoginRoute = '/login';
const apiLogoutRoute = '/logout';
const apiLoggedInCheckRoute = '/me';
const apiSendResetPasswordEmailRoute = '/send-email-reset-password';
const apiResetpasswordRoute = '/reset-password';

const goToDefaultLoggedInPage = () => goToRoute('Home');

export const goToLoginPage = () => goToRoute(LOGIN_ROUTE_NAME);
export const goToResetPasswordPage = () => goToRoute(RESET_PASSWORD_ROUTE_NAME);
export const goToForgotPasswordPage = () => goToRoute(FORGOT_PASSWORD_ROUTE_NAME);
export const goToSetPasswordPage = () => goToRoute(SET_PASSWORD_ROUTE_NAME);

export const isLoggedIn: IsLoggedIn = ref(getItemFromStorage(IS_LOGGED_IN_KEY, true, false));
export const loggedInUser: LoggedInUser = ref(getItemFromStorage(LOGGED_IN_USER_KEY, true, {}));

const responseErrorMiddleware: ResponseErrorMiddleware = ({response}) => {
    if (!response) return;
    const {status} = response;
    // TODO :: make this work
    if (status == 403) {
        goToDefaultLoggedInPage();
    } else if (status == 401) {
        // TODO :: if 401 returns, is it really logged out from the server?
        // only need to logout of the app, because on the backend the user is already logged out
        logoutOfApp();
    }
};

registerResponseErrorMiddleware(responseErrorMiddleware);

const beforeMiddleware: NavigationGuard = ({meta}) => {
    if (!isLoggedIn.value && meta.auth) {
        goToLoginPage();
        return true;
    }

    if (isLoggedIn.value && meta.cantSeeWhenLoggedIn) {
        goToDefaultLoggedInPage();
        return true;
    }

    return false;
};

registerBeforeMiddleware(beforeMiddleware);

const setLoggedInAndUser = (user: Item) => {
    // set the logged in user
    loggedInUser.value = user;
    setItemInStorage(LOGGED_IN_USER_KEY, user);
    // set is logged in
    isLoggedIn.value = true;
    setItemInStorage(IS_LOGGED_IN_KEY, true);
};

const logoutOfApp = () => {
    clearStorage();
    // TODO :: or reload state? transition from this is not rly smooth
    window.location.reload();
};

export const login = async (credentials: LoginCredentials) => {
    const response = await postRequest(apiLoginRoute, credentials);

    setLoggedInAndUser(response.data.user);
    goToDefaultLoggedInPage();
    return response;
};

export const logout = async () => {
    const response = await postRequest(apiLogoutRoute, {});

    logoutOfApp();
    return response;
};

export const checkIfLoggedIn = async () => {
    const response = await getRequestWithoutCache(apiLoggedInCheckRoute);

    setLoggedInAndUser(response.data.user);
    return response;
};

export const sendResetPasswordEmail = async (email: string) => {
    const response = await postRequest(apiSendResetPasswordEmailRoute, {email});

    goToLoginPage();
    return response;
};

export const resetPassword = async (data: ResetPasswordData) => {
    const response = await postRequest(apiResetpasswordRoute, data);

    goToLoginPage();
    return response;
};

const createRouteMeta = (title: string) => ({auth: false, cantSeeWhenLoggedIn: true, title});

export const setAuthRoutes = (
    loginPage: Component,
    resetPasswordPage: Component,
    forgotPasswordPage: Component,
    setPasswordPage: Component,
) => {
    addRoute({path: '/inloggen', name: LOGIN_ROUTE_NAME, component: loginPage, meta: createRouteMeta('login')});

    addRoute({
        path: '/wachtwoord-resetten',
        name: RESET_PASSWORD_ROUTE_NAME,
        component: resetPasswordPage,
        meta: createRouteMeta('Wachtwoord resetten'),
    });

    addRoute({
        path: '/wachtwoord-vergeten',
        name: FORGOT_PASSWORD_ROUTE_NAME,
        component: forgotPasswordPage,
        meta: createRouteMeta('Wachtwoord vergeten'),
    });

    addRoute({
        path: '/wachtwoord-setten',
        name: SET_PASSWORD_ROUTE_NAME,
        component: setPasswordPage,
        meta: createRouteMeta('Wachtwoord setten'),
    });
};
