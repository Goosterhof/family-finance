import {RouteRecordRaw} from 'vue-router';

export interface RouteSettings {
    base: RouteRecordRaw;
    create?: RouteRecordRaw;
    overview?: RouteRecordRaw;
    edit?: RouteRecordRaw;
    show?: RouteRecordRaw;
}
