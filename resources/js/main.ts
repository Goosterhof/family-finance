import '../scss/app.scss';
import {createApp} from 'vue';
import {initMobileDetection} from 'helpers/mobile';
import {setupRouter} from 'router';

// Component File
import App from './App.vue';

initMobileDetection();
const app = createApp(App);

app.use(setupRouter());

app.mount('#app');
