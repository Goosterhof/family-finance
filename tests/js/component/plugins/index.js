/**
 * @param {import('@vue/test-utils').VueWrapper} wrapper
 * @returns
 */
export const customFinds = wrapper => {
    return {
        findByTestId: (/** @type {string} */ id) => wrapper.find(`[data-test-id="${id}"]`),
        findByTestClass: (/** @type {string} */ className) => wrapper.findAll(`[data-test-class="${className}"]`),
    };
};
