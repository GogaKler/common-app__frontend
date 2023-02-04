import { defineStore } from 'pinia';
import Auth from '@api/auth';
import router from '@app/router';

const ERROR_PREFIX = 'AUTH_STORE';

export const useAuthStore = defineStore('auth', {
    actions: {
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
        }
    }
});
