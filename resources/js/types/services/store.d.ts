import {ComputedRef, Ref} from 'vue';
import {Item} from 'types/types';

export type State<T extends Item> = Ref<{[id: number]: Readonly<T>}>;

export interface StoreModule<T extends Item> {
    /** Get all items from the store */
    all: ComputedRef<Readonly<T>[]>;
    /** Get an item from the state by id */
    byId: (id: number) => ComputedRef<Readonly<T> | undefined>;
    /**
     * Set items in the state.
     */
    setAll: (items: T[]) => void;

    /**
     * Set one specific item in the storage
     */
    setById: (item: T) => void;

    /**
     * Delete one specific item in the storage by id
     */
    deleteById: (id: number) => void;
}
