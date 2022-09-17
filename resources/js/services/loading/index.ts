import {ref} from 'vue';
import {registerRequestMiddleware, registerResponseErrorMiddleware, registerResponseMiddleware} from '../http';

// Improvement for later is to check what is loading
export const isLoading = ref(false);

const TIME_AFTER_SPINNER_STARTS = 0;
const RESET_TIMOUT_TIME = 0;
const MIN_TIME_SPINNER = 1000;

let loadingTimeoutId: NodeJS.Timeout;
let loadingTimeStart: number;

export const setLoading = (loading: boolean) => {
    if (loadingTimeoutId) clearTimeout(loadingTimeoutId);

    let timeout = TIME_AFTER_SPINNER_STARTS;

    if (loading) {
        // Set the time the loading started
        loadingTimeStart = Date.now();
    } else if (loadingTimeStart) {
        // Get the response time from the request
        const responseTime = Date.now() - loadingTimeStart;
        /*
         * Check the time the spinner is
         * Already active and how many ms it should stay active to get to the min time of the spinner
         */
        timeout = MIN_TIME_SPINNER - responseTime + TIME_AFTER_SPINNER_STARTS;
        if (timeout < RESET_TIMOUT_TIME) timeout = RESET_TIMOUT_TIME;
    }

    loadingTimeoutId = setTimeout(() => (isLoading.value = loading), timeout);
};

registerRequestMiddleware(() => setLoading(true));
registerResponseMiddleware(() => setLoading(false));
registerResponseErrorMiddleware(() => setLoading(false));
