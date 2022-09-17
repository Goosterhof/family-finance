import {AxiosResponse} from 'axios';
import {Item} from 'types/types';
import {New, Updatable} from 'types/generics';
import {Repository} from 'types/services/repository';
import {StoreModule} from 'types/services/store';
import {deleteRequest, getRequest, postRequest} from 'services/http';
import {ref} from 'vue';

const postRequestAndSetInStoreById = async <T extends Item>(
    storeModule: StoreModule<T>,
    url: string,
    item: Updatable<T> | New<T>,
) => {
    const {data} = await postRequest(url, item);
    if (!data) return;
    storeModule.setById(data);
};

export const repositoryFactory = <T extends Item>(moduleName: string, storeModule: StoreModule<T>): Repository<T> => {
    const requestingAll = ref<Promise<AxiosResponse> | null>(null);
    return {
        // For some requests the responses takes quite a while because of the size.
        // To avoid double requests we add a simple extra check
        getAll: async () => {
            if (requestingAll.value) {
                await requestingAll.value;
                return;
            }

            requestingAll.value = getRequest(moduleName);

            const response = await requestingAll.value;
            if (!response?.data) return;
            storeModule.setAll(response.data);
            // eslint-disable-next-line require-atomic-updates
            requestingAll.value = null;
        },
        getById: async (id: number) => {
            const {data} = await getRequest(`${moduleName}/${id}`);
            if (!data) return;
            storeModule.setById(data);
        },
        create: (newItem: New<T>) => postRequestAndSetInStoreById(storeModule, moduleName, newItem),
        update: (id: number, item: Updatable<T>) =>
            postRequestAndSetInStoreById(storeModule, `${moduleName}/${id}`, item),
        delete: async (id: number) => {
            await deleteRequest(`${moduleName}/${id}`);
            storeModule.deleteById(id);
        },
    };
};
