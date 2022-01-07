export const currencyFormatter = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
}).format;

/** @param {string} date */
export const dateFormatter = date => new Date(date).toLocaleDateString('nl-NL', {month: 'long', year: 'numeric'});
