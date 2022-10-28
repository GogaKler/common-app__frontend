import API from '@axios';

class Posts {
    async createPost({ data }) {
        try {
            const response = await API.post('posts', data);

            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default Posts;
