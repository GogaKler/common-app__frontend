import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@app/App.vue';
import router from '@/app/router';

import '@libs/font-awesome'; // Конфигурация иконок
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
