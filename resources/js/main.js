import {createApp} from '@vue/runtime-dom';
import {setupRouter} from 'router';
import '../css/style.css';

// Component File
import App from './App.vue';
const app = createApp(App);

app.use(setupRouter());

app.mount('#app');
