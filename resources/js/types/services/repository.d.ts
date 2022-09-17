import {Item} from 'types/types';
import {New, Updatable} from 'types/generics';

export interface Repository<T extends Item> {
    getAll: () => Promise<void>;
    getById: (id: number) => Promise<void>;
    create: (newItem: New<T>) => Promise<void>;
    update: (id: number, item: Updatable<T>) => Promise<void>;
    delete: (id: number) => Promise<void>;
}
