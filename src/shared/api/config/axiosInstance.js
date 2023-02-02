import axios from 'axios';
import router from '@app/router';
import Cookie from 'js-cookie';

const axiosOptions = {
    baseURL: __APP__SERVER__DOMAIN__,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
};

const instance = axios.create({
    ...axiosOptions,
    validateStatus: (status) => status >= 200 && status < 300
});

const errorInterceptor = async (error) => {
    const { response, message, config } = error;
    const originalConfig = error.config;

    if (!response) {
        console.error('**Network/Server error');

        return Promise.reject(error);
    }

    if (response.status !== 401) {
        console.error(message);

        return Promise.reject(error);
    }

    if (response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
            console.error(response.status, message);

            await axios.get('auth/refresh', { ...axiosOptions });

            originalConfig.headers = { ...originalConfig.headers };

            return await instance.request(config);
        } catch (e) {
            console.error(e);

            Cookie.remove('Authentication');
            Cookie.remove('Refresh');

            return await router.push({ name: 'login' });
        }
    }

    return Promise.reject(error);
};

instance.interceptors.response.use((res) => res, errorInterceptor);

export default instance;
