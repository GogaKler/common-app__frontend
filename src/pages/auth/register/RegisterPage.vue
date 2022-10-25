<script setup>
import { object, string } from 'yup';
import { useField, useForm, useIsFormValid } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const schema = object({
    name: string().required(),
    email: string().required().email(),
    password: string().required().min(6),
    gender: string().required()
});

const { errors, handleSubmit, isSubmitting } = useForm({
    validationSchema: schema,
    initialValues: {
        name: '',
        email: '',
        password: '',
        gender: ''
    }
});

const isValid = useIsFormValid();

const { value: name } = useField('name');
const { value: email } = useField('email');
const { value: password } = useField('password');
const { value: gender } = useField('gender');

const onSubmit = handleSubmit(async ({ name, email, password, gender }) => {
    const preparedGender = () => {
        switch (gender) {
            case 'Мужской':
                return 'male';
            case 'Женский':
                return 'female';
        }
    };

    await authStore.register({ name, email, password, gender: preparedGender() });
});
</script>

<template>
    <form @submit="onSubmit" :validation-schema="schema">
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
        <select v-model="gender">
            <option>Мужской</option>
            <option>Женский</option>
        </select>

        <v-button type="submit" full-width :loading="isSubmitting" :disabled="!isValid">
            Зарегистрироваться
        </v-button>
    </form>
</template>

<style lang="scss"></style>
