import { reactive } from 'vue';
import * as Yup from 'yup';

export const genderOptions = reactive([
    {
        title: 'Мужчина',
        value: 'male'
    },
    {
        title: 'Женщина',
        value: 'female'
    }
]);

export const validationSchema = Yup.object({
    name: Yup.string().required('Логин для входа обязателен.'),
    email: Yup.string().required('E-mail обязателен').email('Неккоректный E-mail.'),
    password: Yup.string().required().min(6, 'Минимальная длина 6 символов.'),
    confirmPassword: Yup.string()
        .required('Подтверждение пароля обязательно.')
        .oneOf([Yup.ref('password'), null], 'Пароли не совпадают.'),
    gender: Yup.string().required('Укажите свой пол.')
});
