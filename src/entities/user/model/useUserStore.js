import { defineStore } from 'pinia';
import { urlToFile } from '@shared/lib/helpers';
import Cookie from 'js-cookie';
import User from '@entities/user/api';
import router from '@app/router';

const ERROR_PREFIX = 'UserStore';
export const useUserStore = defineStore('user', {
    state: () => ({
        user: {},
        userByID: {}
    }),
    getters: {
        isAuth: () => !!Cookie.get('Authentication'),
        userId: (state) => state.user.id,
        isUserByIdIsMe: (state) => state.userByID.id === this.userId()
    },
    actions: {
        async changeUserStatus(status) {
            const res = await User.changeUserStatus({ status });

            if (this.userId === res.id) this.user.status = res.status;

            return res;
        },

        async uploadUserAvatar(avatar) {
            const name = Math.random();
            const preparedAvatar = await urlToFile(avatar, String(name));

            const res = await User.uploadUserAvatar({ avatar: preparedAvatar });

            this.user.avatar = res;

            return res;
        },

        async requestUserByID(id) {
            this.userByID = await User.getUserById({ id });
        },

        async me() {
            try {
                const res = await User.me();
                this.user = res;

                return res;
            } catch (e) {
                throw new Error(`${ERROR_PREFIX}: ${e}`);
            }
        },

        async logout() {
            try {
                await User.logout();

                await router.push('/login');
            } catch (e) {
                throw new Error(`${ERROR_PREFIX}: ${e}`);
            }
        }
    }
});
