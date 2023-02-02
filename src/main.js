import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@app/App.vue';
import router from '@/app/router';

// ICONS
import '@shared/libs/font-awesome-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// COMPONENTS
import VSwitch from '@UI/switch/VSwitch.vue';
import VInput from '@UI/input/VInput.vue';
import VButton from '@UI/button/VButton.vue';

// DIRECTIVES
import { clickOutside } from '@shared/helpers/directives';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.directive('click-outside', clickOutside);

app.component('FontAwesomeIcon', FontAwesomeIcon)
    .component('VSwitch', VSwitch)
    .component('VInput', VInput)
    .component('VButton', VButton);

app.mount('#app');
