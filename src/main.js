import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@app/App.vue';
import router from '@/app/router';

import '@libs/font-awesome'; // Конфигурация иконок
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VSwitch from '@UI/switch/VSwitch.vue';
import VInput from '@UI/input/VInput.vue';
import VButton from '@UI/button/VButton.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component('font-awesome-icon', FontAwesomeIcon)
    .component('VSwitch', VSwitch)
    .component('VInput', VInput)
    .component('VButton', VButton);

app.mount('#app');
