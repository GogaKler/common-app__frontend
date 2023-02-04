<script setup>
import { useField, useForm, useIsFormValid } from 'vee-validate';
import { useAuthStoreNew } from '@features/auth/model/useAuthStore';
import { validationSchema } from '@features/auth/signIn/lib';

const authStoreNew = useAuthStoreNew();

const { errors, handleSubmit, isSubmitting } = useForm({
    validationSchema,
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
        await authStoreNew.login({ username, password });
    } catch (e) {
        console.error(e);
    }
});
</script>

<template>
    <form :validation-schema="validationSchema" @submit="onSubmit">
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

        <v-button
            type="submit"
            full-width
            :loading="isSubmitting"
            :disabled="!isValid"
            radius="20"
            theme="primary"
        >
            Войти
        </v-button>
    </form>
</template>

<style lang="scss"></style>
