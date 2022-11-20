import { defineStore } from 'pinia';
import Auth from '@api/auth';
import Cookie from 'js-cookie';
import router from '@app/router';

const ERROR_PREFIX = 'AUTH_STORE';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null
    }),
    getters: {
        isAuth: () => !!Cookie.get('Authentication'),
        userId: (state) => state.user.id
    },
    actions: {
        async login({ username, password }) {
            try {
                await Auth.login({ username, password });

                await router.push('/');
            } catch (e) {
                throw new Error(`${ERROR_PREFIX}: ${e}`);
            }
        },

        async register({ name, email, password, gender }) {
            try {
                await Auth.register({ name, email, password, gender });

                await router.push('/login');
            } catch (e) {
                throw new Error(`${ERROR_PREFIX}: ${e}`);
            }
        },

        async logout() {
            try {
                await Auth.logout();

                await router.push('/login');
            } catch (e) {
                throw new Error(`${ERROR_PREFIX}: ${e}`);
            }
        },

        async refresh() {
            try {
                await Auth.refresh();
            } catch (e) {
                throw new Error(`${ERROR_PREFIX}: ${e}`);
            }
        },

        async me() {
            try {
                const res = await Auth.me();
                this.user = res;

                return res;
            } catch (e) {
                throw new Error(`${ERROR_PREFIX}: ${e}`);
            }
        },

        isMe({ id }) {
            return this.userId === id;
        }
    }
});
