import {RouteRecordRaw} from 'vue-router';

export interface RouteSettings {
    base: RouteRecordRaw;
    // TODO :: uhm...
    create?: RouteRecordRaw;
    overview?: RouteRecordRaw;
    edit?: RouteRecordRaw;
    show?: RouteRecordRaw;
    [extraRoutes: string]: RouteRecordRaw;
}
