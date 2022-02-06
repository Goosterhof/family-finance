import {Item} from 'types/types';

export interface Repository<T extends Item, NewT> {
    getAll: () => Promise<void>;
    getById: (id: number) => Promise<void>;
    create: (newItem: NewT) => Promise<void>;
    update: (item: T) => Promise<void>;
    delete: (id: number) => Promise<void>;
}
