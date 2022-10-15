import api from '@axios';

export const getUsers = async () => {
    return await api.get('users').then((response) => response.data);
};
