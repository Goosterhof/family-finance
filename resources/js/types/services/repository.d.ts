import {Item} from 'types/types';

export interface Repository<T extends Item> {
    getAll: () => Promise<void>;
    getById: (id: number) => Promise<void>;
    create: (newItem: Record<string, unknown>) => Promise<void>;
    update: (item: T) => Promise<void>;
    delete: (id: number) => Promise<void>;
}
