import API from '@axios';

class _Auth {
    async logout() {
        return API.post('auth/logout');
    }

    async refresh() {
        return API.get('auth/refresh');
    }
}

const Auth = new _Auth();
export default Auth;
