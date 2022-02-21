import {Item} from 'types/types';

export interface Category extends Item {
    name: string;
    children: Category[];
}

export interface NewCategory {
    name: string;
    category_id?: number;
}
