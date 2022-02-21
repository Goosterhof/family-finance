import {ModalData} from 'types/types';
import {createApp, defineComponent, h, ref, markRaw, DefineComponent, Ref} from 'vue';

const modals: Ref<ModalData> = ref([]);

const eventApp = defineComponent({
    render() {
        if (modals.value.length) document.body.classList.add('modal-open');
        else document.body.classList.remove('modal-open');

        return modals.value.map(({modal, passingData}, index) => {
            return h(modal, {
                ...passingData,
                onClose: () => modals.value.splice(index, 1),
            });
        });
    },
});

const eventContainer = document.createElement('div');
document.body.appendChild(eventContainer);
createApp(eventApp).mount(eventContainer);

export const createModal = (modalComponent: DefineComponent, passingData?: {[propNameOrAction: string]: unknown}) =>
    modals.value.push({modal: markRaw(modalComponent), passingData});
