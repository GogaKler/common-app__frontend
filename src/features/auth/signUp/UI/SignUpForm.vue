<script setup>
import { useField, useForm, useIsFormValid } from 'vee-validate';
import { watch } from 'vue';
import { VSelect, VInput, VButton } from '@UI';
import { useAuthStore } from '@features/auth/model/useAuthStore';
import { genderOptions, validationSchema } from '@features/auth/signUp/lib';

const authStoreNew = useAuthStore();

const { errors, handleSubmit, isSubmitting } = useForm({
    validationSchema,
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

const onSubmit = handleSubmit(async (payload) => {
    await authStoreNew.register(payload);
});

watch(password, () => {
    if (!password.value.length) confirmPassword.value = '';
});
</script>

<template>
    <form :validation-schema="validationSchema" @submit="onSubmit">
        <VInput
            v-model="name"
            type="name"
            name="name"
            label="Ваш логин для входа"
            :errors="errors.name"
        />
        <VInput
            v-model="email"
            type="email"
            name="email"
            label="E-mail"
            :errors="errors.email"
        />
        <VInput
            v-model="password"
            type="password"
            name="password"
            label="Пароль"
            :errors="errors.password"
        />

        <VInput
            v-model="confirmPassword"
            type="password"
            name="password"
            label="Подтвердите пароль"
            :disabled="!password.length"
            :errors="errors.confirmPassword"
        />

        <v-select
            v-model="gender"
            label="Пол"
            :options="genderOptions"
            :errors="errors.gender"
        />

        <VButton
            type="submit"
            theme="primary"
            full-width
            radius="20"
            :disabled="!isValid"
            :loading="isSubmitting"
        >
            Зарегистрироваться
        </VButton>
    </form>
</template>
