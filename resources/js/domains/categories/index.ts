import {Category} from 'types/models/category';
import {repositoryFactory} from 'services/repository';
import {storeModuleFactory} from 'services/store';

export const CATEGORIES_MODULE_NAME = 'categories';

export const categoryStoreModule = storeModuleFactory<Category>(CATEGORIES_MODULE_NAME);

export const categoryRepository = repositoryFactory(CATEGORIES_MODULE_NAME, categoryStoreModule);
