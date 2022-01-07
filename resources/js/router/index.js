import {addRoute, router} from 'services/router';
import {setAuthRoutes} from 'services/auth';

import HomePage from 'pages/HomePage.vue';
import LoginPage from 'pages/auth/LoginPage.vue';

export const setupRouter = () => {
    addRoute({
        path: '',
        name: 'Home',
        component: HomePage,
        meta: {auth: true},
    });

    setAuthRoutes(LoginPage, LoginPage, LoginPage, LoginPage);

    return router;
};
