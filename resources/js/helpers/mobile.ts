import {ref} from '@vue/reactivity';

export const isMobile = ref(false);

const onResize = () => (isMobile.value = window.innerWidth < 768);

export const initMobileDetection = () => {
    window.addEventListener('resize', onResize);
    onResize();
};
