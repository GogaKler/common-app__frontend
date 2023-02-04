import { defineStore } from 'pinia';
import AuthFSD from '@features/auth/api';
import router from '@app/router';

const ERROR_PREFIX = 'AUTH_STORE';

export const useAuthStoreNew = defineStore('auth_new', {
    actions: {
        async login({ username, password }) {
            try {
                await AuthFSD.login({ username, password });

                await router.push('/');
            } catch (e) {
                throw new Error(`${ERROR_PREFIX}: ${e}`);
            }
        },

        async register({ name, email, password, gender }) {
            try {
                await AuthFSD.register({ name, email, password, gender });

                await router.push('/login');
            } catch (e) {
                throw new Error(`${ERROR_PREFIX}: ${e}`);
            }
        },

        async refresh() {
            try {
                await AuthFSD.refresh();
            } catch (e) {
                throw new Error(`${ERROR_PREFIX}: ${e}`);
            }
        }
    }
});
