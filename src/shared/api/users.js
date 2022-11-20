import API from '@axios';

class _Users {
    async getUsers() {
        try {
            const response = await API.get('users');

            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async getUserById({ id }) {
        try {
            const response = await API.get(`users/${id}`);

            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async changeUserStatus({ status }) {
        try {
            const response = await API.put(`users/status`, {
                status
            });

            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async uploadUserAvatar({ avatar }) {
        try {
            const response = await API.post(
                `users/avatar`,
                {
                    avatar
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }
}
const Users = new _Users();
export default Users;
