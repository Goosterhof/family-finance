import {createApp} from '@vue/runtime-dom';
import {setupRouter} from 'resources/js/router';
import '../../sass/app.scss';

// Component File
import App from './App.vue';
const app = createApp(App);

app.use(setupRouter());

app.mount('#app');
