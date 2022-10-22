import axios from 'axios';
import Cookie from 'js-cookie';

const authHeader = () => {
    const token = Cookie.get('user_token');

    if (token) return `Bearer ${token}`;

    return '';
};

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

instance.defaults.headers.common['Authorization'] = authHeader();

export default instance;
