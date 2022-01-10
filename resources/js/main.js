import {createApp} from '@vue/runtime-dom';
import {initMobileDetection} from 'helpers/mobile';
import {setupRouter} from 'router';
import '../scss/app.scss';

initMobileDetection();

// Component File
import App from './App.vue';
const app = createApp(App);

app.use(setupRouter());

app.mount('#app');
