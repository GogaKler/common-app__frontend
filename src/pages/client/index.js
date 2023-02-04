const SettingsLayout = () => import('@pages/client/settings/SettingLayout.vue');
const HomePage = () => import('@pages/client/home/HomePage.vue');
const MessengerPage = () => import('@pages/client/messenger/MessengerPage.vue');
const ProfilePage = () => import('@pages/client/profile/ProfilePage.vue');
const AccountPage = () => import('@pages/client/settings/account/AccountPage.vue');

export const clientRouter = [
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
];
