import { defineStore } from 'pinia';
import Auth from '@shared/api/auth';
import Cookie from 'js-cookie';
import router from '@app/router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null
    }),
    getters: {
        isAuth: () => !!Cookie.get('user_token'),
        userId: (state) => state.user.id
    },
    actions: {
        async login({ username, password }) {
            try {
                const res = await Auth.login({ username, password });

                Cookie.set('user_token', res.token);

                await router.push('/');
            } catch (e) {
                throw new Error(e);
            }
        },

        async register({ name, email, password, gender }) {
            try {
                await Auth.register({ name, email, password, gender });

                await router.push('/login');
            } catch (e) {
                throw new Error(e);
            }
        },

        async me() {
            try {
                const res = await Auth.me();
                this.user = res;

                return res;
            } catch (e) {
                throw new Error(e);
            }
        },

        async logout() {
            Cookie.remove('user_token');

            await router.push('/login');
        },

        isMe({ id }) {
            return this.userId === id;
        }
    }
});
