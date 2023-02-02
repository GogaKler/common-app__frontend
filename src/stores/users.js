import { defineStore } from 'pinia';
import Users from '@shared/api/users';
import { useAuthStore } from '@/stores/auth';
import { urlToFile } from '@shared/helpers/methods';
const authStore = useAuthStore();
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
            const res = await Users.changeUserStatus({ status });

            if (authStore.userId === res.id) authStore.user.status = res.status;

            return res;
        },

        async uploadUserAvatar(avatar) {
            const name = Math.random();
            const preparedAvatar = await urlToFile(avatar, String(name));

            const res = await Users.uploadUserAvatar({ avatar: preparedAvatar });

            authStore.user.avatar = res;

            return res;
        }
    }
});
