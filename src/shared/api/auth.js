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

    /**
     * @param {String} name
     * @param {String} email
     * @param {Number} password
     * @param {String} gender
     * */
    async register({ name, email, password, gender }) {
        const res = await API.post('auth/register', {
            name,
            email,
            password,
            gender
        });

        return res.data;
    }

    async logout() {
        return API.post('auth/logout');
    }

    async refresh() {
        return API.get('auth/refresh');
    }

    async me() {
        const response = await API.get('auth/me');

        return response.data;
    }
}

const Auth = new _Auth();
export default Auth;
