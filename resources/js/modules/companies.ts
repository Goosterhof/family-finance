import {createBaseComponent, createRouteSettings} from 'services/router/settings';
import {storeModuleFactory} from 'services/store';
import {goToCreatePage, goToEditPage, goToShowPage} from 'services/router';
import {Company} from 'types/models/company';
import {StoreModule} from 'types/services/store';
import {repositoryFactory} from 'services/repository';
import {Repository} from 'types/services/repository';
import CompaniesOverview from 'admin/pages/companies/Overview.vue';
import CompaniesCreate from 'admin/pages/companies/Create.vue';
import CompaniesEdit from 'admin/pages/companies/Edit.vue';
import CompaniesShow from 'admin/pages/companies/Show.vue';

export const COMPANIES_MODULE_NAME = 'companies';

export const companyStoreModule: StoreModule<Company> = storeModuleFactory(COMPANIES_MODULE_NAME);

export const companyRepository: Repository<Company> = repositoryFactory(COMPANIES_MODULE_NAME, companyStoreModule);

export const companiesRouteSettings = createRouteSettings(
    COMPANIES_MODULE_NAME,
    {singular: 'klant', plural: 'klanten'},
    createBaseComponent(companyRepository),
    CompaniesOverview,
    CompaniesCreate,
    CompaniesEdit,
    CompaniesShow,
);

export const goToCompanyShow = (id: number) => goToShowPage(COMPANIES_MODULE_NAME, id);

export const goToCompanyEdit = (id: number) => goToEditPage(COMPANIES_MODULE_NAME, id);

export const goToCompanyCreate = () => goToCreatePage(COMPANIES_MODULE_NAME);
