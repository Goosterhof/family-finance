import {New} from 'types/generics';
import {Statement} from 'domains/statements/types';

const CSV_HEADER_INDEX = 0;

/* eslint-disable @typescript-eslint/naming-convention */
const headersToStatementStringProperty: Record<
    string,
    'account' | 'bankId' | 'toAccount' | 'toAccountName' | 'description' | 'transactionDate'
> = {
    'IBAN/BBAN': 'account',
    Volgnr: 'bankId',
    Datum: 'transactionDate',
    'Tegenrekening IBAN/BBAN': 'toAccount',
    'Naam tegenpartij': 'toAccountName',
    'Omschrijving-1': 'description',
};

const headersToStatementFloatProperty: Record<string, 'amount' | 'balanceAfter'> = {
    Bedrag: 'amount',
    'Saldo na trn': 'balanceAfter',
};
/* eslint-enable @typescript-eslint/naming-convention */

const createEmpyStatement = (): New<Statement> => ({
    account: '',
    bankId: '',
    transactionDate: '',
    amount: NaN,
    balanceAfter: NaN,
    toAccount: '',
    toAccountName: '',
    description: '',
    categoryId: NaN,
});

const getNextEntryFromLine = (
    item: string,
    skipIndexes: Record<number, true>,
    columnIndex: number,
    columns: string[],
) => {
    let skippableIndex = columnIndex;
    let entry = item;
    if (entry.startsWith('"') && !entry.endsWith('"')) {
        while (!columns[skippableIndex + 1].endsWith('"')) {
            skippableIndex++;
            entry += `,${columns[skippableIndex]}`;
            skipIndexes[skippableIndex] = true;
        }

        skippableIndex++;
        skipIndexes[skippableIndex] = true;
        entry += `,${columns[skippableIndex]}`;
    }
    return entry.substring(1, entry.length - 1).trim();
};

const createStatementFromLine = (line: string, headers: string[]) => {
    const skipIndexes: Record<number, true> = {};
    const columns = line.split(',');
    return columns.reduce<New<Statement>>((result, item, columnIndex) => {
        if (skipIndexes[columnIndex]) return result;

        /**
         * Getting the actual header here.
         * Column index does not equel header index, because a entry can have ','.
         * In which case the column index is a head of the header index
         * If we take the column index and substract the amount of skipped indexes we get the header index
         *
         * Need to do this before we get the entry from the line, cause that can add skipped indexes
         */
        const untrimmedHeader = headers[columnIndex - Object.keys(skipIndexes).length];

        const header = untrimmedHeader.substring(1, untrimmedHeader.length - 1).trim();

        const entry = getNextEntryFromLine(item, skipIndexes, columnIndex, columns);
        if (!entry) return result;

        if (header in headersToStatementFloatProperty) {
            const property = headersToStatementFloatProperty[header];
            result[property] = parseFloat(entry.replace(',', '.'));
        }
        if (header in headersToStatementStringProperty) {
            const property = headersToStatementStringProperty[header];
            result[property] = entry;
        }

        return result;
    }, createEmpyStatement());
};

export const parseCSV = (text: string) => {
    const lines = text.split('\n');
    const headers = lines[CSV_HEADER_INDEX].split(',');

    return lines.reduce<New<Statement>[]>((acc, untrimmedLine, lineIndex) => {
        if (lineIndex === CSV_HEADER_INDEX) return acc;

        const line = untrimmedLine.trim();

        if (!line.length) return acc;

        acc.push(createStatementFromLine(line, headers));
        return acc;
    }, []);
};
