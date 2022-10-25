import { defineStore } from 'pinia';
import API from '@axios';
import Auth from '@api/auth';
import Cookie from 'js-cookie';
import router from '@app/router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthUser: false
    }),
    getters: {
        get_isAuthUser: (state) => state.isAuthUser
    },
    actions: {
        async login({ username, password }) {
            try {
                const res = await Auth.login({ username, password });

                Cookie.set('user_token', res.token);
                API.defaults.headers.common['Authorization'] = `Bearer ${res.token}`;

                await router.push('/');
            } catch (e) {
                throw new Error(e);
            }
        },

        async register(payload) {
            const { name, email, password, gender } = payload;
            try {
                await Auth.register({ name, email, password, gender });

                await router.push('/login');
            } catch (e) {
                throw new Error(e);
            }
        },

        async me() {
            return await Auth.me();
        },

        async logout() {
            Cookie.remove('user_token');

            API.defaults.headers.common['Authorization'] = '';

            await router.push('/login');
        }
    }
});
