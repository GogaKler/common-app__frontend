<script setup>
import { useAuthStore } from '@/stores/auth';
import VUser from '@UI/user/VUser.vue';
import { computed } from 'vue';

const authStore = useAuthStore();

const user = authStore.user;

const userFields = computed(() => [
    {
        id: 1,
        title: 'Логин',
        value: user.name
    },
    {
        id: 2,
        title: 'E-mail',
        value: user.email
    },
    {
        id: 3,
        title: 'Пол',
        value: user.gender
    },
    {
        id: 3,
        title: 'Статус',
        value: user.status ?? 'Отсутствует'
    }
]);
</script>

<template>
    <div class="account">
        <div class="container-small">
            <div class="account__content">
                <div class="account-list">
                    <div
                        v-for="(field, index) in userFields"
                        :key="index"
                        class="account-list__item"
                    >
                        <div class="account-list__item--name">{{ field.title }}</div>
                        <div class="account-list__item--value">{{ field.value }}</div>
                    </div>
                </div>
                <div class="account-logo">
                    <div class="mb-3">Изображение в профиле</div>
                    <v-user :name="user.name" size="10x" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container-small {
    width: 100%;
    max-width: 800px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 15px;
    padding-left: 15px;
    flex-grow: 1;
}
.account {
    margin-bottom: 20px;

    &__content {
        display: flex;
        justify-content: space-between;
    }
}

.account-list {
    width: 100%;
    padding-right: 100px;

    &__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        padding-bottom: 10px;

        @include themed() {
            border-bottom: 1px solid t($border);
        }

        &--name {
            //font-style: italic;
        }

        &--value {
            @include themed() {
                color: rgba(t($text), 0.5);
            }

            &:hover {
                @include themed() {
                    color: t($text);
                }
            }
        }
    }
}
</style>
