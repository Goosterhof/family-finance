/**
 * @typedef {import('vue').Component} Component
 * @typedef {import('vue-router').RouteRecordRaw} RouteRecordRaw
 * @typedef {import('types/services/router').RouteSettings} RouteSettings
 */
import {defineComponent, h} from 'vue';
import {MinimalRouterView} from '../MinimalRouterView';

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

/**
 * @param {string} moduleName
 * @param {CREATE | EDIT | OVERVIEW | SHOW} part
 * @param {Component} component
 * @param {string} translation
 *
 * @returns {RouteRecordRaw}
 */
const partialFactory = (moduleName, part, component, translation) => {
    return {
        name: moduleName + nameConversion[part],
        path: pathConversion[part],
        component,
        meta: {
            auth: true,
            cantSeeWhenLoggedIn: false,
            title: translation + titleConversion[part],
        },
        children: undefined,
    };
};

/**
 * Creates standard route settings.
 * Creates settings for the optional routes when the components are given.
 * Does not add the optional routes otherwise
 *
 * @param {string} moduleName
 * @param {import('types/types').Translation} translation
 * @param {Component} baseComponent
 * @param {Component} [overviewComponent]
 * @param {Component} [createComponent]
 * @param {Component} [editComponent]
 * @param {Component} [showComponent]
 */
export const createRouteSettings = (
    moduleName,
    translation,
    baseComponent,
    overviewComponent,
    createComponent,
    editComponent,
    showComponent,
) => {
    /** @type {RouteSettings} */
    const routeSettings = {
        base: {
            path: `/${translation.plural}`,
            component: baseComponent,
            meta: {moduleName},
        },
    };

    if (createComponent) {
        routeSettings[CREATE] = partialFactory(moduleName, CREATE, createComponent, translation.singular);
    }
    if (overviewComponent) {
        routeSettings[OVERVIEW] = partialFactory(moduleName, OVERVIEW, overviewComponent, translation.plural);
    }
    if (editComponent) {
        routeSettings[EDIT] = partialFactory(moduleName, EDIT, editComponent, translation.singular);
    }
    if (showComponent) {
        routeSettings[SHOW] = partialFactory(moduleName, SHOW, showComponent, translation.singular);
    }

    return routeSettings;
};

/**
 * @param {import('types/services/repository').Repository} repository
 */
export const createBaseComponent = repository =>
    defineComponent({
        name: 'BasePage',
        mounted: async () => await repository.getAll(),
        render: () => h(MinimalRouterView, {depth: 1}),
    });
