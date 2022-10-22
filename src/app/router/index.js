import { createRouter, createWebHistory } from 'vue-router';

// LAYOUTS
const AppLayout = () => import('@pages/client/AppLayout.vue');
const AuthLayout = () => import('@pages/auth/AuthLayout.vue');

// PAGES / AUTH
const RegisterPage = () => import('@pages/auth/register/RegisterPage.vue');
const LoginPage = () => import('@pages/auth/login/LoginPage.vue');

// PAGES / MAIN
const HomePage = () => import('@pages/client/home/HomePage.vue');
const MessengerPage = () => import('@pages/client/messenger/MessengerPage.vue');

// CHILDREN`S & COMPONENTS

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/auth',
            name: 'auth',
            component: AuthLayout,
            redirect: 'login',
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
            redirect: 'home',
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: HomePage
                },
                {
                    path: '/messenger',
                    name: 'messenger',
                    component: MessengerPage
                }
            ]
        }
    ]
});

export default router;
