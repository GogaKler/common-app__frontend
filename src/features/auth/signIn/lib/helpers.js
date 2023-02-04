import * as Yup from 'yup';

export const validationSchema = Yup.object({
    username: Yup.string().required('Логин обязателен'),
    password: Yup.string()
        .required('Пароль обязателен')
        .min(6, 'Пароль должен быть не меньше 6 символов')
});
