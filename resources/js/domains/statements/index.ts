import {Statement} from './types';
import {createBaseComponent, createRouteSettings} from 'services/router/settings';
import {goToOverviewPage} from 'services/router';
import {repositoryFactory} from 'services/repository';
import {storeModuleFactory} from 'services/store';

export const STATEMENT_DOMAIN_NAME = 'statements';

export const statementStoreModule = storeModuleFactory<Statement>(STATEMENT_DOMAIN_NAME);

export const statementRepository = repositoryFactory(STATEMENT_DOMAIN_NAME, statementStoreModule);

export const statementRouteSettings = createRouteSettings(
    STATEMENT_DOMAIN_NAME,
    {singular: 'afschrift', plural: 'afschriften'},
    createBaseComponent(statementRepository),
    () => import('./pages/Overview.vue'),
);

export const goToStatementOverview = () => goToOverviewPage(STATEMENT_DOMAIN_NAME);
