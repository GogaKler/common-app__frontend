import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@app/App.vue';
import router from '@app/router';

// ICONS
import '@shared/lib/icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// DIRECTIVES
import { clickOutside } from '@shared/lib/directives';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.directive('click-outside', clickOutside);

app
    .component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');
