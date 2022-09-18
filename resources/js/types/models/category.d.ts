import {Item} from 'types/types';

export interface Category extends Item {
    name: string;
    children: Category[];
    categoryId: number;
}
