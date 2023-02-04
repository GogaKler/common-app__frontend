<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const textState = computed(() => ({
    contentTitle: route.name === 'login' ? 'Войти в систему' : 'Регистрация',
    signText: route.name === 'login' ? 'Нет аккаунта?' : 'Есть аккаунт?',
    linkText: route.name === 'login' ? 'Зарегистрироваться' : 'Войти в ситсему',
    redirectPath: route.name === 'login' ? 'register' : 'login'
}));
</script>

<template>
    <div class="auth">
        <div class="container">
            <div class="auth__wrapper">
                <div class="auth-logo pt-10" style="width: 1700px">
                    <div class="auth-logo__logo">
                        <div class="mr-7">
                            <font-awesome-icon
                                class="rotate-45"
                                icon="fa-regular fa-square"
                                size="4x"
                            />
                        </div>
                        <span> Home Builder _ </span>
                    </div>
                </div>
                <div class="auth-form">
                    <div class="auth-form__wrapper">
                        <div class="auth-form__content">
                            <div class="auth-form__content--header">
                                <span class="auth-form__content--title">
                                    {{ textState.contentTitle }}
                                </span>
                            </div>
                            <RouterView />
                        </div>
                        <div class="auth-form__sign">
                            <span>
                                {{ textState.signText }}
                                &nbsp;
                            </span>
                            <RouterLink :to="textState.redirectPath">
                                {{ textState.linkText }}
                            </RouterLink>
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

.auth-logo {
    &__logo {
        display: flex;
        align-items: center;

        & span {
            font-size: 30px;
        }
    }
}

.auth-form {
    position: relative; // для лого
    width: 100%;
    padding: 0 15px;

    &__wrapper {
        padding: 120px 40px;
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

    &__sign {
        & a {
            text-decoration: underline;
            &:hover {
                @include themed() {
                    color: t($primary);
                }
            }
        }
    }
}
</style>
