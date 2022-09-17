/**
 * Set the given value in the storage under the given key
 * If the value is not of type String, it will be converted to String
 */
export const setItemInStorage = (key: string, value: unknown): void => {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, stringValue);
};

/**
 * Get the value from the storage under the given key.
 * Returns null if value is not found or if keepALive is false
 */
export const getItemFromStorage = <T = unknown>(key: string, parse: boolean, defaultValue?: T): T | undefined => {
    const value = localStorage.getItem(key);
    // TODO :: Stryker ConditionalExpression survived, when mutated to false

    if (!value) return defaultValue;

    if (typeof value === 'string' && parse) 
        return JSON.parse(value);
    

    return value as unknown as T;
};

/** Empty the storage */
export const clearStorage = (): void => {
    localStorage.clear();
};
