import {addRoute, router} from 'services/router';
import {setAuthRoutes} from 'services/auth';

import HomePage from 'pages/HomePage.vue';
import ProfilePage from 'pages/ProfilePage.vue';
import LoginPage from 'pages/auth/LoginPage.vue';
import RegisterPage from 'pages/auth/RegisterPage.vue';

export const setupRouter = () => {
    addRoute({
        path: '',
        name: 'Home',
        component: HomePage,
        meta: {auth: true},
    });

    addRoute({
        path: '/profiel',
        name: 'Profile',
        component: ProfilePage,
        meta: {auth: true},
    });

    setAuthRoutes(LoginPage, LoginPage, LoginPage, RegisterPage);

    return router;
};
