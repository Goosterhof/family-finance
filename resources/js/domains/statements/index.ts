import {New} from 'types/generics';
import {Statement} from './types';
import {createBaseComponent, createRouteSettings} from 'services/router/settings';
import {goToOverviewPage} from 'services/router';
import {postRequest} from 'services/http';
import {repositoryFactory} from 'services/repository';
import {storeModuleFactory} from 'services/store';

export const STATEMENT_DOMAIN_NAME = 'statements';

export const statementStoreModule = storeModuleFactory<Statement>(STATEMENT_DOMAIN_NAME);

export const statementRepository = {
    ...repositoryFactory(STATEMENT_DOMAIN_NAME, statementStoreModule),
    massCreate: async (statements: New<Statement>[]) => {
        const {data: createdStatements} = await postRequest<Statement[]>(`${STATEMENT_DOMAIN_NAME}/mass`, {statements});
        if (!createdStatements) return;
        for (const statement of createdStatements) statementStoreModule.setById(statement);
    },
};

export const statementRouteSettings = createRouteSettings(
    STATEMENT_DOMAIN_NAME,
    {singular: 'afschrift', plural: 'afschriften'},
    createBaseComponent(statementRepository),
    () => import('./pages/Overview.vue'),
);

export const goToStatementOverview = () => goToOverviewPage(STATEMENT_DOMAIN_NAME);
