import { createRouter, createWebHistory } from 'vue-router';
import AuthGuard from '@app/router/guards/AuthGuard';
import { useAuthStore } from '@/stores/auth';

// LAYOUTS
const AppLayout = () => import('@pages/client/AppLayout.vue');
const AuthLayout = () => import('@pages/auth/AuthLayout.vue');
const SettingsLayout = () => import('@pages/client/settings/SettingLayout.vue');

// PAGES / AUTH
const RegisterPage = () => import('@pages/auth/register/RegisterPage.vue');
const LoginPage = () => import('@pages/auth/login/LoginPage.vue');

// PAGES / MAIN
const HomePage = () => import('@pages/client/home/HomePage.vue');
const MessengerPage = () => import('@pages/client/messenger/MessengerPage.vue');
const ProfilePage = () => import('@pages/client/profile/ProfilePage.vue');
const AccountPage = () => import('@pages/client/settings/account/AccountPage.vue');

// CHILDREN`S & COMPONENTS

const requestUser = async () => {
    const authUser = useAuthStore();
    await authUser.me();
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/auth',
            name: 'auth',
            component: AuthLayout,
            redirect: { name: 'login' },
            children: [
                {
                    path: '/login',
                    name: 'login',
                    component: LoginPage
                },
                {
                    path: '/register',
                    name: 'register',
                    component: RegisterPage
                }
            ]
        },
        {
            path: '/',
            name: 'index',
            component: AppLayout,
            redirect: { name: 'home' },
            beforeEnter: async () => {
                await requestUser();
            },
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: HomePage
                },
                {
                    path: '/profile/:id',
                    name: 'profile',
                    component: ProfilePage
                },
                {
                    path: '/messenger',
                    name: 'messenger',
                    component: MessengerPage
                },
                {
                    path: '/settings',
                    name: 'settings',
                    component: SettingsLayout,
                    redirect: { name: 'account' },
                    children: [
                        {
                            path: '/settings/account',
                            name: 'account',
                            component: AccountPage
                        }
                    ]
                }
            ]
        }
    ]
});

router.beforeEach(AuthGuard);

export default router;
