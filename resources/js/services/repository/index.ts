import {deleteRequest, getRequest, postRequest} from 'services/http';
import {Repository} from 'types/services/repository';
import {StoreModule} from 'types/services/store';
import {Item} from 'types/types';

export const repositoryFactory = (moduleName: string, storeModule: StoreModule): Repository => {
    return {
        getAll: async () => {
            const response = await getRequest(moduleName);
            if (!response) return;
            storeModule.setAll(response.data);
        },
        getById: async (id: number) => {
            const response = await getRequest(`${moduleName}/${id}`);
            if (!response) return;
            storeModule.setById(response.data);
        },
        create: async (newItem: Record<string, unknown>) => {
            const response = await postRequest(moduleName, newItem);
            if (!response) return;
            storeModule.setById(response.data);
        },
        update: async (item: Item) => {
            const response = await postRequest(`${moduleName}/${item.id}`, item);
            if (!response) return;
            storeModule.setById(response.data);
        },
        delete: async (id: number) => {
            const response = await deleteRequest(`${moduleName}/${id}`);
            if (!response) return;
            storeModule.deleteById(id);
        },
    };
};
