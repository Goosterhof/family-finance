import {Item} from 'types/types';

export interface Category extends Item {
    name: string;
    categoryId: number | null;
}
