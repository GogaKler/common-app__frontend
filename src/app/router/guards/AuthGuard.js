import Cookie from 'js-cookie';

const isAuthPage = (page) => {
    const pages = ['login', 'register'];

    return pages.includes(page);
};

export default async (to, from, next) => {
    const IS_USER_AUTH = Cookie.get('Authentication') ?? null;

    if (!isAuthPage(to.name) && !IS_USER_AUTH) {
        next({ name: 'login' });
    } else if (isAuthPage(to.name) && IS_USER_AUTH) {
        next({ name: from.name });
    } else {
        next();
    }
};
