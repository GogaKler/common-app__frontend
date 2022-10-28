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
}
const Users = new _Users();
export default Users;
