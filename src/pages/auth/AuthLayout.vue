<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <div class="auth">
        <div class="container">
            <div class="auth__wrapper">
                <div class="auth-logo" style="width: 1700px">LOGO AND IMAGE COMING SOON</div>
                <div class="auth-form">
                    <div class="auth-form__wrapper">
                        <div class="auth-form__content">
                            <div class="auth-form__content--header">
                                <span class="auth-form__content--title">
                                    {{ route.name === 'login' ? 'Войти в систему' : 'Регистрация' }}
                                </span>
                            </div>
                            <RouterView />
                        </div>
                        <div class="auth-form__sign-up" v-if="route.name === 'login'">
                            <span>У вас нет аккаунта? &nbsp;</span>
                            <RouterLink to="register">Зарегистрироваться</RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.auth {
    display: flex;
    flex-direction: column;
    padding: 40px 0;
    height: 100vh;
    overflow: hidden;

    &__wrapper {
        height: 100%;
        display: flex;
        justify-content: space-between;
    }

    @include themed() {
        background: t($background);
    }
}

.auth-form {
    position: relative; // для лого
    width: 100%;
    padding: 0 15px;

    &__wrapper {
        padding: 80px 40px;
        height: 100%;
        border-radius: 20px;

        @include themed() {
            border: 1px solid t($border);
            background: t($background-secondary);
        }
    }

    &__content {
        padding-bottom: 15px;
        margin-bottom: 15px;

        @include themed() {
            border-bottom: 1px solid t($border);
        }

        &--header {
            margin-bottom: 40px;
        }

        &--title {
            font-size: 35px;
            font-weight: 600;
        }
    }
}
</style>
