const SignInForm = async () => {
    const { SignInForm } = await import('@features/auth');

    return SignInForm;
};

const SignUpForm = async () => {
    const { SignUpForm } = await import('@features/auth');

    return SignUpForm;
};

export const authRouter = [
    {
        path: '/login',
        name: 'login',
        component: SignInForm
    },
    {
        path: '/register',
        name: 'register',
        component: SignUpForm
    }
];
