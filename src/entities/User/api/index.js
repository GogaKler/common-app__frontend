import API from '@axios';

class _User {
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

    async getUserById({ id }) {
        try {
            const response = await API.get(`users/${id}`);

            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async me() {
        const response = await API.get('auth/me');

        return response.data;
    }
}

const User = new _User();

export default User;
