import axios from 'axios';
import Cookie from 'js-cookie';
import router from '@app/router';

const authHeader = () => {
    const token = Cookie.get('user_token');

    if (token) return `Bearer ${token}`;

    return '';
};

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const errorInterceptor = async (error) => {
    if (!error.response) {
        console.error('**Network/Server error');
        console.log(error.response);
        return Promise.reject(error);
    }

    switch (error.response.status) {
        case 401:
            console.error(error.response.status, error.message);

            Cookie.remove('user_token');

            await router.push('/login');
            break;

        default:
            console.error(error.response.status, error.message);
    }
    return Promise.reject(error);
};

instance.interceptors.request.use((config) => {
    config.headers.Authorization = authHeader();

    return config;
});

instance.interceptors.response.use((response) => response, errorInterceptor);

export default instance;
