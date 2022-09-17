import {Category, NewCategory} from 'types/models/category';
import {ref} from 'vue';
import {repositoryFactory} from 'services/repository';
import {storeModuleFactory} from 'services/store';

export const CATEGORIES_MODULE_NAME = 'categories';

export const categoryStoreModule = storeModuleFactory<Category>(CATEGORIES_MODULE_NAME);

export const categoryRepository = repositoryFactory<Category, NewCategory>(CATEGORIES_MODULE_NAME, categoryStoreModule);

export const addToCategoryId = ref(-1);
