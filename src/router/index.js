import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@views/HomeView.vue';
import MessengerView from '@views/MessengerView.vue';

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
