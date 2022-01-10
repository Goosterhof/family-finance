// import {createBaseComponent, createRouteSettings} from 'services/router/settings';
// import {storeModuleFactory} from 'services/store';
// import {goToCreatePage, goToEditPage, goToShowPage} from 'services/router';
// import {Family} from 'types/models/family';
// import {StoreModule} from 'types/services/store';
// import {repositoryFactory} from 'services/repository';
// import {Repository} from 'types/services/repository';
// import CompaniesOverview from 'pages/families/Overview.vue';
// import CompaniesCreate from 'pages/families/Create.vue';
// import CompaniesEdit from 'pages/families/Edit.vue';
// import CompaniesShow from 'pages/families/Show.vue';

// export const FAMILIES_MODULE_NAME = 'families';

// export const familyStoreModule: StoreModule<Family> = storeModuleFactory(FAMILIES_MODULE_NAME);

// export const familyRepository: Repository<Family> = repositoryFactory(FAMILIES_MODULE_NAME, familyStoreModule);

// export const companiesRouteSettings = createRouteSettings(
//     FAMILIES_MODULE_NAME,
//     {singular: 'klant', plural: 'klanten'},
//     createBaseComponent(familyRepository),
//     CompaniesOverview,
//     CompaniesCreate,
//     CompaniesEdit,
//     CompaniesShow,
// );

// export const goToCompanyShow = (id: number) => goToShowPage(FAMILIES_MODULE_NAME, id);

// export const goToCompanyEdit = (id: number) => goToEditPage(FAMILIES_MODULE_NAME, id);

// export const goToCompanyCreate = () => goToCreatePage(FAMILIES_MODULE_NAME);
