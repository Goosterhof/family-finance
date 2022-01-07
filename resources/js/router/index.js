import {addRoute, router} from 'services/router';
import HomePage from 'pages/HomePage.vue';

export const setupRouter = () => {
    addRoute({
        path: '',
        name: 'Home',
        component: HomePage,
        meta: {auth: true},
    });
    return router;
};
