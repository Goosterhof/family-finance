import {DOMWrapper} from '@vue/test-utils';

declare module '@vue/test-utils' {
    interface VueWrapper {
        findByTestId(id: string): DOMWrapper<Element>;
        findByTestClass(className: string): DOMWrapper<Element>[];
    }
}
