import { defineStore } from 'pinia';
import Auth from '@features/auth/api';
import router from '@app/router';

const ERROR_PREFIX = 'AUTH_STORE';

export const useAuthStore = defineStore('auth', {
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
        }
    }
});
