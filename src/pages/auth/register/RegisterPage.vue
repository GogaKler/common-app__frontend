<script setup>
import { useField, useForm, useIsFormValid } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';
import * as Yup from 'yup';
import { reactive, watch } from 'vue';
import VSelect from '@UI/select/VSelect.vue';

const schema = Yup.object({
    name: Yup.string().required('Логин для входа обязателен.'),
    email: Yup.string().required('E-mail обязателен').email('Неккоректный E-mail.'),
    password: Yup.string().required().min(6, 'Минимальная длина 6 символов.'),
    confirmPassword: Yup.string()
        .required('Подтверждение пароля обязательно.')
        .oneOf([Yup.ref('password'), null], 'Пароли не совпадают.'),
    gender: Yup.string().required('Укажите свой пол.')
});

const { errors, handleSubmit, isSubmitting } = useForm({
    validationSchema: schema,
    initialValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: ''
    }
});

const isValid = useIsFormValid();

const { value: name } = useField('name');
const { value: email } = useField('email');
const { value: password } = useField('password');
const { value: confirmPassword } = useField('confirmPassword');
const { value: gender } = useField('gender');

const authStore = useAuthStore();

const onSubmit = handleSubmit(async (payload) => {
    await authStore.register(payload);
});

watch(password, () => {
    if (!password.value.length) confirmPassword.value = '';
});

const genderOptions = reactive([
    {
        title: 'Мужчина',
        value: 'male'
    },
    {
        title: 'Женщина',
        value: 'female'
    }
]);
</script>

<template>
    <form :validation-schema="schema" @submit="onSubmit">
        <v-input
            v-model="name"
            type="name"
            name="name"
            label="Ваш логин для входа"
            :errors="errors.name"
        />
        <v-input v-model="email" type="email" name="email" label="E-mail" :errors="errors.email" />
        <v-input
            v-model="password"
            type="password"
            name="password"
            label="Пароль"
            :errors="errors.password"
        />

        <v-input
            v-model="confirmPassword"
            type="password"
            name="password"
            label="Подтвердите пароль"
            :disabled="!password.length"
            :errors="errors.confirmPassword"
        />

        <v-select v-model="gender" label="Пол" :options="genderOptions" :errors="errors.gender" />

        <v-button
            type="submit"
            primary
            full-width
            radius="20"
            :disabled="!isValid"
            :loading="isSubmitting"
        >
            Зарегистрироваться
        </v-button>
    </form>
</template>
