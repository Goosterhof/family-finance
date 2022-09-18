import {CREATE_PAGE_NAME, EDIT_PAGE_NAME, OVERVIEW_PAGE_NAME, SHOW_PAGE_NAME} from 'services/router/settings';
import {
    LocationQuery,
    NavigationFailureType,
    NavigationGuard,
    NavigationHookAfter,
    RouteLocationRaw,
    RouteRecordRaw,
    createRouter,
    createWebHistory,
    isNavigationFailure,
} from 'vue-router';
import {RouteSettings} from 'types/services/router';

export const router = createRouter({
    history: createWebHistory(),
    routes: [],
});

/**
 * Checks if there is a target route name in the route query.
 * If there is, it will redirect to that route.
 */
const beforeMiddleware: NavigationGuard = (to, from) => {
    const fromQuery = from.query.from?.toString();
    if (!fromQuery) return false;

    if (fromQuery === to.fullPath) return false;

    router.push({name: fromQuery});
    return true;
};

const routerBeforeMiddleware: NavigationGuard[] = [beforeMiddleware];
router.beforeEach((to, from, next) => {
    for (const middlewareFunc of routerBeforeMiddleware) {
        // MiddlewareFunc will return true if it encountered problems
        if (middlewareFunc(to, from, next)) return next(false);
    }
    return next();
});

export const registerBeforeRouteMiddleware = (middleware: NavigationGuard) => routerBeforeMiddleware.push(middleware);

const routerAfterMiddleware: NavigationHookAfter[] = [];
router.afterEach((to, from) => {
    for (const middlewareFunc of routerAfterMiddleware) middlewareFunc(to, from);
});

export const registerAfterRouteMiddleware = (middleware: NavigationHookAfter) => routerAfterMiddleware.push(middleware);

export const addRoute = (route: RouteRecordRaw) => router.addRoute(route);

export const addRoutesBasedOnRouteSettings = (settings: RouteSettings) => {
    // getting the record from the settings
    const record = settings.base;

    record.children = [];
    for (const type in settings) {
        if (type === 'base') continue;
        const component = settings[type as keyof RouteSettings];
        if (component) record.children.push(component);
    }

    addRoute(record);
};

/**
 * Go to the given route by name, optional id and query
 * If going to a route you are already on, it catches the given error
 */
// eslint-disable-next-line complexity
export const goToRoute = (name: string, id?: number, query?: LocationQuery) => {
    if (onPage(name) && !query && !id) return;

    const route: RouteLocationRaw = {name};
    if (id) route.params = {id};
    if (query) route.query = query;

    try {
        router.push(route);
    } catch (error) {
        // Ignore the vue-router error regarding navigating to the page they are already on.
        if (!isNavigationFailure(error, NavigationFailureType.duplicated))
            // But print any other errors to the console
            // eslint-disable-next-line no-console
            console.error(error);
    }
};

/** Go to the show page for the given module name */
export const goToShowPage = (moduleName: string, id: number) => goToRoute(moduleName + SHOW_PAGE_NAME, id);
/** Go to the edit page for the given module name */
export const goToEditPage = (moduleName: string, id: number) => goToRoute(moduleName + EDIT_PAGE_NAME, id);
/** Go to the create page for the given module name */
export const goToCreatePage = (moduleName: string) => goToRoute(moduleName + CREATE_PAGE_NAME);
/** Go to the overview page for the given module name */
export const goToOverviewPage = (moduleName: string) => goToRoute(moduleName + OVERVIEW_PAGE_NAME);

/** Get the current route */
export const getCurrentRoute = () => router.currentRoute;
/** Get the query from the current route */
export const getCurrentRouteQuery = () => router.currentRoute.value.query;
/** Get the id from the params from the current route */
export const getCurrentRouteId = () => router.currentRoute.value.params.id.toString();
/** Get the name from the current route */
export const getCurrentRouteName = () => router.currentRoute.value.name?.toString();

/** checks if the given string is in the current routes name */
const onPage = (pageName: string) => router.currentRoute.value.name?.toString().includes(pageName);

/** returns if you are on the create page */
export const onCreatePage = () => onPage(CREATE_PAGE_NAME);
/** returns if you are on the edit page */
export const onEditPage = () => onPage(EDIT_PAGE_NAME);
/** returns if you are on the overview page */
export const onOverviewPage = () => onPage(OVERVIEW_PAGE_NAME);
/** returns if you are on the show page */
export const onShowPage = () => onPage(SHOW_PAGE_NAME);

/** Checks if the page name exists in the routes */
const hasPageName = (pageName: string) => router.hasRoute(pageName);

/** returns if the given module name has a create page */
export const hasCreatePage = (moduleName: string) => hasPageName(moduleName + CREATE_PAGE_NAME);
/** returns if the given module name has an edit page */
export const hasEditPage = (moduleName: string) => hasPageName(moduleName + EDIT_PAGE_NAME);
/** returns if the given module name has an overview page */
export const hasOverviewPage = (moduleName: string) => hasPageName(moduleName + OVERVIEW_PAGE_NAME);
/** returns if the given module name has a show page */
export const hasShowPage = (moduleName: string) => hasPageName(moduleName + SHOW_PAGE_NAME);

/** go back one page */
export const goBack = () => router.back();
