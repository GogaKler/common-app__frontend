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

    async refresh() {
        return API.get('auth/refresh');
    }
}

const AuthFSD = new _Auth();
export default AuthFSD;
