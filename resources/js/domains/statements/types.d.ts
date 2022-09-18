import {Item} from 'types/types';

export interface Statement extends Item {
    account: string;
    bankId: string;
    transactionDate: string;
    amount: number;
    balanceAfter: number;
    toAccount: string;
    toAccountName: string;
    description: string;
    categoryId: number;
}
