import {computed, ref} from 'vue';
import {getItemFromStorage, setItemInStorage} from 'services/storage';
import {StoreModule} from 'types/services/store';
import {Item, State} from 'types/types';

/**
 * Creates a store module for the given module name.
 * When extra store functionality is given, it will extend the base module with the extra functionality.
 */
export const storeModuleFactory = <T extends Item>(moduleName: string): StoreModule<T> => {
    const state: State<T> = ref({});

    const storedState = getItemFromStorage<{
        [id: number]: T;
    }>(moduleName, true, {});

    if (storedState) state.value = storedState;

    const setInStorage = () => setItemInStorage(moduleName, state.value);

    return {
        /**
         * GETTERS
         */
        /** Get all items from the store */
        all: computed(() => Object.values(state.value)),
        /**
         * Get an item from the state by id
         */
        byId: (id: number) => computed(() => state.value[id] ?? {}),
        /**
         * SETTERS
         */
        /**
         * Set items in the state.
         */
        setAll: (items: T[]) => {
            // put all remaining new data in the state
            for (const newData of items) state.value[newData.id] = Object.freeze(newData);
            setInStorage();
        },
        /**
         * Set one specific item in the storage
         */
        setById: (item: T) => {
            state.value[item.id] = Object.freeze(item);
            setInStorage();
        },
        /**
         * Delete one specific item in the storage by id
         */
        deleteById: (id: number) => {
            delete state.value[id];
            setInStorage();
        },
    };
};
