import { defineStore } from 'pinia';
import Users from '@shared/api/users';
import { useAuthStore } from '@/stores/auth';

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [],
        userById: {}
    }),
    getters: {},
    actions: {
        async getUsers() {
            this.users = await Users.getUsers();
        },

        async requestUserByID(id) {
            this.userById = await Users.getUserById({ id });
        },

        async changeUserStatus(status) {
            const authStore = useAuthStore();
            const res = await Users.changeUserStatus({ status });

            if (authStore.userId === res.id) authStore.user.status = res.status;

            return res;
        }
    }
});
