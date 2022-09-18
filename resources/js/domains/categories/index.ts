import {Category} from './types';
import {repositoryFactory} from 'services/repository';
import {storeModuleFactory} from 'services/store';

export const CATEGORIES_DOMAIN_NAME = 'categories';

export const categoryStoreModule = storeModuleFactory<Category>(CATEGORIES_DOMAIN_NAME);

export const categoryRepository = repositoryFactory(CATEGORIES_DOMAIN_NAME, categoryStoreModule);
