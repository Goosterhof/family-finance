import {addRoute, router} from 'services/router';
import {setAuthRoutes} from 'services/auth';

import HomePage from 'pages/HomePage.vue';
import LoginPage from 'pages/auth/LoginPage.vue';
import RegisterPage from 'pages/auth/RegisterPage.vue';

export const setupRouter = () => {
    addRoute({
        path: '',
        name: 'Home',
        component: HomePage,
        meta: {auth: true},
    });

    setAuthRoutes(LoginPage, LoginPage, LoginPage, RegisterPage);

    return router;
};
