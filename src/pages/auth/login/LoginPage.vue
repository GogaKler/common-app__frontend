<script setup>
import { object, string } from 'yup';
import { useField, useForm, useIsFormValid } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const schema = object({
    username: string().required(),
    password: string().required().min(6)
});

const { errors, handleSubmit, isSubmitting } = useForm({
    validationSchema: schema,
    initialValues: {
        username: '',
        password: ''
    }
});

const isValid = useIsFormValid();

const { value: username } = useField('username');
const { value: password } = useField('password');

const onSubmit = handleSubmit(async ({ username, password }) => {
    try {
        await authStore.login({ username, password });
    } catch (e) {
        console.error(e);
    }
});
</script>

<template>
    <form @submit="onSubmit" :validation-schema="schema">
        <v-input
            v-model="username"
            name="username"
            label="Логин или E-mail"
            type="name"
            :errors="errors.username"
        />
        <v-input
            v-model="password"
            name="password"
            label="Пароль"
            type="password"
            :errors="errors.password"
        />

        <v-button type="submit" full-width :loading="isSubmitting" :disabled="!isValid">
            Войти
        </v-button>
    </form>
</template>

<style lang="scss"></style>
