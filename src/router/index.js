import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@pages/home/HomeView.vue';
import MessengerView from '@pages/messenger/MessengerView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/messenger',
            name: 'messenger',
            component: MessengerView
        }
    ]
});

export default router;
