export const currencyFormatter = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
}).format;

export const dateFormatter = (date: string): string =>
    new Date(date).toLocaleDateString('nl-NL', {month: 'long', year: 'numeric'});
