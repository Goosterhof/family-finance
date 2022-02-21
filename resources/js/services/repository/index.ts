import {deleteRequest, getRequest, postRequest} from 'services/http';
import {Repository} from 'types/services/repository';
import {StoreModule} from 'types/services/store';
import {Item} from 'types/types';

// eslint-disable-next-line max-lines-per-function
export const repositoryFactory = <T extends Item, NewT>(
    moduleName: string,
    storeModule: StoreModule<T>,
): Repository<T, NewT> => {
    return {
        getAll: async () => {
            const response = await getRequest(moduleName);
            if (!response?.data) return;
            storeModule.setAll(response.data);
        },
        getById: async (id: number) => {
            const response = await getRequest(`${moduleName}/${id}`);
            if (!response?.data) return;
            storeModule.setById(response.data);
        },
        create: async (newItem: NewT) => {
            const response = await postRequest(moduleName, newItem);
            if (!response?.data) return;
            storeModule.setById(response.data);
        },
        update: async (item: T) => {
            const response = await postRequest(`${moduleName}/${item.id}`, item);
            if (!response?.data) return;
            storeModule.setById(response.data);
        },
        delete: async (id: number) => {
            const response = await deleteRequest(`${moduleName}/${id}`);
            if (!response?.data) return;
            storeModule.deleteById(id);
        },
    };
};
