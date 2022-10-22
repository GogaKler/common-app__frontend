import API from '@axios';

class _Auth {
    /**
     * @param {String} username
     * @param {Number} password
     * */
    async login({ username, password }) {
        const res = await API.post('auth/login', {
            username,
            password
        });

        return res.data;
    }

    async me() {
        const response = await API.get('auth/me');

        return response.data;
    }
}

const Auth = new _Auth();
export default Auth;
