import { defineStore } from 'pinia';
import Users from '@shared/api/users';

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [],
        userById: {}
    }),
    getters: {},
    actions: {
        async requestUserByID(id) {
            this.userById = await Users.getUserById({ id });
        }
    }
});
