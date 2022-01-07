/**
 * Set the given value in the storage under the given key
 * If the value is not of type String, it will be converted to String
 *
 * @param {String} key
 * @param {any} value
 */
export const setItemInStorage = (key, value) => {
    if (typeof value !== 'string') value = JSON.stringify(value);
    localStorage.setItem(key, value);
};

/**
 * Get the value from the storage under the given key.
 * Returns null if value is not found or if keepALive is false
 *
 * @param {String} key
 * @param {Boolean} [parse] if parse is given, then JSON.parse will be used to return a parsed value
 * @param {any} [defaultValue] the default value, when there is nothing stored
 */
export const getItemFromStorage = (key, parse, defaultValue) => {
    const value = localStorage.getItem(key);
    // TODO :: Stryker ConditionalExpression survived, when mutated to false
    if (!value) return defaultValue;
    if (!parse) return value;

    try {
        return JSON.parse(value);
    } catch (_) {
        // Can it throw something else then a SyntaxError?
        // if (error instanceof SyntaxError) {
        return value;
        // }
    }
};

/** Empty the storage */
export const clearStorage = () => {
    localStorage.clear();
};
