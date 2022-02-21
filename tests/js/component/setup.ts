/* eslint-env node */
import {config} from '@vue/test-utils';
import {customFinds} from './plugins';

import {expect} from 'vitest';

config.plugins.VueWrapper.install(customFinds);

if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
    // eslint-disable-next-line no-console
    process.on('unhandledRejection', reason => expect(reason).toBeTruthy());
    // @ts-ignore Avoid memory leak by adding too many listeners
    process.env.LISTENING_TO_UNHANDLED_REJECTION = true;
}
