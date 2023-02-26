import { createRouter, createWebHistory } from 'vue-router';
import { authGuard } from '@processes';
import { useUserStore } from '@entities/user';
import { authRouter } from '@pages/auth';
import { clientRouter } from '@pages/client';

const AuthPage = () => import('@pages/auth/AuthPage.vue');
const AppPage = () => import('@pages/client/AppPage.vue');

const requestUser = async () => {
    const userStore = useUserStore();
    try {
        await userStore.me();
    } catch (e) {
        console.log(e);
    }
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/auth',
            name: 'auth',
            component: AuthPage,
            redirect: { name: 'login' },
            children: [...authRouter]
        },
        {
            path: '/',
            name: 'index',
            component: AppPage,
            redirect: { name: 'home' },
            beforeEnter: async () => {
                await requestUser();
            },
            children: [...clientRouter]
        }
    ]
});

router.beforeEach(authGuard);

export default router;
