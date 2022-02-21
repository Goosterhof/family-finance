import {ref} from 'vue';
import {registerRequestMiddleware, registerResponseMiddleware, registerResponseErrorMiddleware} from 'services/http';

const spinnerTimeout = 500;
const minTimeSpinner = 1000;

let loadingTimeoutId: NodeJS.Timeout;
let loadingTimeStart: number | undefined;

registerRequestMiddleware(() => setLoading(true));
registerResponseMiddleware(() => setLoading(false));
registerResponseErrorMiddleware(() => setLoading(false));

/**
 * get the loading state
 */
export const loading = ref(false);

/**
 * get the spinner loading state
 */
export const spinnerLoading = ref(false);

/**
 * Set the loading state.
 * Does not set the state immediatly after recieving false.
 * It only sets it before 500ms or after 1500ms.
 */
export const setLoading = (newLoading: boolean) => {
    loading.value = newLoading;
    if (loadingTimeoutId) clearTimeout(loadingTimeoutId);

    let timeout = spinnerTimeout;

    if (newLoading) {
        // set the time the loading started
        loadingTimeStart = Date.now();
    } else if (loadingTimeStart) {
        // get the response time from the request
        const responseTime = Date.now() - loadingTimeStart;
        // check the time the spinner is already active and how many ms it should stay active
        // to get to the min time of the spinner
        timeout = minTimeSpinner - responseTime + spinnerTimeout;
        if (timeout < 0) timeout = 0;
        loadingTimeStart = undefined;
    }

    loadingTimeoutId = setTimeout(() => (spinnerLoading.value = newLoading), timeout);
};
