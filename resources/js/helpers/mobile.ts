import {ref} from 'vue';

export const isMobile = ref(false);

const PHONE_RESOLUTION = 768;

const onResize = () => (isMobile.value = window.innerWidth < PHONE_RESOLUTION);

export const initMobileDetection = () => {
    window.addEventListener('resize', onResize);
    onResize();
};
