import {Component, Ref, ref} from 'vue';

import {LoggedInUser, LoginCredentials, RegisterCredentials, ResetPasswordData} from 'types/services/auth';
import {NavigationGuard} from 'vue-router';
import {ResponseErrorMiddleware} from 'types/types';
import {addRoute, goToRoute, registerBeforeMiddleware} from 'services/router';
import {clearStorage, getItemFromStorage, setItemInStorage} from 'services/storage';
import {getRequest, postRequest, registerResponseErrorMiddleware} from 'services/http';

const LOGIN_ROUTE_NAME = 'Login';
export const FORGOT_PASSWORD_ROUTE_NAME = 'ForgotPassword';
const RESET_PASSWORD_ROUTE_NAME = 'ResetPassword';
export const REGISTER_ROUTE_NAME = 'Register';

const APP_NAME = 'Family Finance';
const IS_LOGGED_IN_KEY = `${APP_NAME  } is magical`;
const LOGGED_IN_USER_KEY = `${APP_NAME  } is supreme`;

const apiLoginRoute = '/login';
const apiRegisterRoute = '/register';
const apiLogoutRoute = '/logout';
const apiLoggedInCheckRoute = '/me';
const apiSendResetPasswordEmailRoute = '/send-email-reset-password';
const apiResetpasswordRoute = '/reset-password';

const goToDefaultLoggedInPage = () => goToRoute('Home');

export const goToLoginPage = () => goToRoute(LOGIN_ROUTE_NAME);
export const goToResetPasswordPage = () => goToRoute(RESET_PASSWORD_ROUTE_NAME);
export const goToForgotPasswordPage = () => goToRoute(FORGOT_PASSWORD_ROUTE_NAME);
export const goToRegisterPage = () => goToRoute(REGISTER_ROUTE_NAME);

export const isLoggedIn: Ref<boolean> = ref(!!getItemFromStorage<boolean>(IS_LOGGED_IN_KEY, true, false));
export const loggedInUser: Ref<LoggedInUser | undefined> = ref(
    getItemFromStorage<LoggedInUser>(LOGGED_IN_USER_KEY, true),
);

const responseErrorMiddleware: ResponseErrorMiddleware = ({response}) => {
    if (!response) return;
    const {status} = response;
    // TODO :: make this work
    if (status == 403) 
        goToDefaultLoggedInPage();
    else if (status == 401) {
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

const setLoggedInAndUser = (user: LoggedInUser) => {
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

    setLoggedInAndUser(response.data);
    goToDefaultLoggedInPage();
    return response;
};

export const register = async (credentials: RegisterCredentials) => {
    const response = await postRequest(apiRegisterRoute, credentials);

    setLoggedInAndUser(response.data);
    goToDefaultLoggedInPage();
    return response;
};

export const logout = async () => {
    const response = await postRequest(apiLogoutRoute, {});

    logoutOfApp();
    return response;
};

export const checkIfLoggedIn = async () => {
    const response = await getRequest(apiLoggedInCheckRoute);

    setLoggedInAndUser(response.data);
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
    regiserPage: Component,
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
        path: '/registreren',
        name: REGISTER_ROUTE_NAME,
        component: regiserPage,
        meta: createRouteMeta('Wachtwoord setten'),
    });
};
