import {VueWrapper} from '@vue/test-utils';

export const customFinds = (wrapper: VueWrapper) => ({
    findByTestId: (id: string) => wrapper.find(`[data-test-id="${id}"]`),
    findByTestClass: (className: string) => wrapper.findAll(`[data-test-class="${className}"]`),
});
