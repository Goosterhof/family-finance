import {ErrorBagRef, ResponseErrorMiddleware} from 'types/types';
import {NavigationHookAfter} from 'vue-router';
import {defineComponent, h, ref} from 'vue';
import {registerAfterMiddleware} from 'services/router';
import {registerResponseErrorMiddleware} from 'services/http';

const errors: ErrorBagRef = ref({});

export const routeMiddleware: NavigationHookAfter = () => (errors.value = {});
registerAfterMiddleware(routeMiddleware);

export const responseErrorMiddleware: ResponseErrorMiddleware = ({response}) => {
    if (response && response.data.errors) errors.value = response.data.errors;
};
registerResponseErrorMiddleware(responseErrorMiddleware);

export const BaseFormError = defineComponent({
    props: {property: {type: String, required: true}},
    setup: props => () => {
        const foundErrors = Object.keys(errors.value).reduce((acc, errorProperty) => {
            if (errorProperty.includes(props.property)) 
                acc.push(...errors.value[errorProperty]);
            
            return acc;
        }, [] as string[]);
        if (!foundErrors.length) return;
        return h('div', {class: 'invalid-feedback d-block'}, [foundErrors.join(', ')]);
    },
});
