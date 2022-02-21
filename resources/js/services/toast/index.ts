import {createApp, defineComponent, h, Ref, ref} from 'vue';
import {registerResponseErrorMiddleware, registerResponseMiddleware} from 'services/http';
import ToastComponent from './Toast.vue';
import {ResponseErrorMiddleware, ResponseMiddleware, ToastMessage, ToastVariant} from 'types/types';

const toastMessages: Ref<ToastMessage[]> = ref([]);

/**
 * The default duration for a toast message.
 */
const defaultToastMessageDuration = 1500;

/**
 * Hide the toast message after a timeout and delete it from toastMessages
 */
const hideToastMessage = (message: ToastMessage) => {
    if (message.timeoutId) clearTimeout(message.timeoutId);

    // TODO :: because this is called from render the ref becomes itself
    // and it's being called from the render function and outside the render function
    if (message.show.value) message.show.value = false;
    // @ts-ignore, see TODO above
    else if (message.show) message.show = false;

    message.timeoutId = setTimeout(() => {
        const index = toastMessages.value.findIndex(t => t.message === message.message);
        toastMessages.value.splice(index, 1);
    }, 50);
};

/**
 * Hide the toast message after the given duration
 */
const hideToastMessageAfterDelay = (message: ToastMessage) => {
    if (message.timeoutId) clearTimeout(message.timeoutId);
    message.timeoutId = setTimeout(() => hideToastMessage(message), message.duration);
};

const eventApp = defineComponent({
    render() {
        const toasts = toastMessages.value.map(message => {
            // @ts-ignore TODO :: ToastComponent throws error with vue-tsc command
            return h(ToastComponent, {
                message: message.message,
                show: message.show,
                variant: message.variant,
                onHide: () => hideToastMessage(message),
                // TODO :: what if there are two of the same messages active?
                // this will trow error
                key: message.message,
            });
        });

        return [
            // TODO :: make position of the toast container an option
            h('div', {class: 'toast-container position-absolute bottom-0 start-0', style: 'z-index:9999;'}, toasts),
        ];
    },
});

const eventContainer = document.createElement('div');
document.body.appendChild(eventContainer);
createApp(eventApp).mount(eventContainer);

/**
 * Create a toast message
 */
export const createToastMessage = (
    message: string,
    variant: ToastVariant = 'success',
    duration = defaultToastMessageDuration,
) => {
    const toastMessage = {message, variant, duration, show: ref(true)};
    hideToastMessageAfterDelay(toastMessage);
    toastMessages.value.push(toastMessage);
};

const responseMiddleware: ResponseMiddleware = ({data}) => {
    if (data && data.message) createToastMessage(data.message);
};

registerResponseMiddleware(responseMiddleware);

const responseErrorMiddleware: ResponseErrorMiddleware = ({response}) => {
    if (response && response.data.message) createToastMessage(response.data.message, 'danger');
};

registerResponseErrorMiddleware(responseErrorMiddleware);
