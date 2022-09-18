/**
 * @typedef {import('vue').Component} Component
 * @typedef {import('vue-router').RouteRecordRaw} RouteRecordRaw
 * @typedef {import('types/services/router').RouteSettings} RouteSettings
 */
import {Component, defineComponent, h} from 'vue';
import {Item, Translation} from 'types/types';
import {Repository} from 'types/services/repository';
import {RouteRecordRaw} from 'vue-router';
import {RouteSettings} from 'types/services/router';
import MinimalRouterView from '../MinimalRouterView.vue';

export const CREATE_PAGE_NAME = '.create';
export const EDIT_PAGE_NAME = '.edit';
export const OVERVIEW_PAGE_NAME = '.overview';
export const SHOW_PAGE_NAME = '.show';

const CREATE = 'create';
const EDIT = 'edit';
const OVERVIEW = 'overview';
const SHOW = 'show';

const nameConversion = {
    [CREATE]: CREATE_PAGE_NAME,
    [EDIT]: EDIT_PAGE_NAME,
    [OVERVIEW]: OVERVIEW_PAGE_NAME,
    [SHOW]: SHOW_PAGE_NAME,
};

const titleConversion = {
    [CREATE]: ' aanmaken',
    [EDIT]: ' aanpassen',
    [OVERVIEW]: ' overzicht',
    [SHOW]: ' bekijken',
};

const pathConversion = {
    [CREATE]: 'toevoegen',
    [EDIT]: ':id/aanpassen',
    [OVERVIEW]: '',
    [SHOW]: ':id',
};

const partialFactory = (
    moduleName: string,
    part: typeof CREATE | typeof EDIT | typeof OVERVIEW | typeof SHOW,
    component: Component,
    translation: string,
): RouteRecordRaw => ({
    name: moduleName + nameConversion[part],
    path: pathConversion[part],
    component,
    meta: {
        auth: true,
        cantSeeWhenLoggedIn: false,
        title: translation + titleConversion[part],
    },
    children: undefined,
});

/**
 * Creates standard route settings.
 * Creates settings for the optional routes when the components are given.
 * Does not add the optional routes otherwise
 */
export const createRouteSettings = (
    moduleName: string,
    translation: Translation,
    baseComponent: Component,
    overviewComponent?: Component,
    createComponent?: Component,
    editComponent?: Component,
    showComponent?: Component,
) => {
    const routeSettings: RouteSettings = {
        base: {
            path: `/${translation.plural}`,
            component: baseComponent,
            meta: {moduleName},
        },
    };

    if (createComponent)
        routeSettings[CREATE] = partialFactory(moduleName, CREATE, createComponent, translation.singular);

    if (overviewComponent)
        routeSettings[OVERVIEW] = partialFactory(moduleName, OVERVIEW, overviewComponent, translation.plural);

    if (editComponent) routeSettings[EDIT] = partialFactory(moduleName, EDIT, editComponent, translation.singular);

    if (showComponent) routeSettings[SHOW] = partialFactory(moduleName, SHOW, showComponent, translation.singular);

    return routeSettings;
};

export const createBaseComponent = <T extends Item>(repository?: Repository<T>) =>
    defineComponent({
        name: 'BasePage',
        mounted: () => repository?.getAll(),
        render: () => h(MinimalRouterView, {depth: 1}),
    });
