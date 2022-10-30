<script setup>
import { useAuthStore } from '@/stores/auth';
import VUser from '@UI/user/VUser.vue';

const authStore = useAuthStore();

const user = authStore.user;
</script>

<template>
    <div class="account">
        <div class="container-small">
            <div class="account__content">
                <div class="account-list">
                    <div class="account-list__item">
                        <div class="account-list__item--name">Логин</div>
                        <div class="account-list__item--value">{{ user.name }}</div>
                    </div>
                    <div class="account-list__item">
                        <div class="account-list__item--name">Статус</div>
                        <div class="account-list__item--value">
                            {{ user.status ?? 'Отсутствует' }}
                        </div>
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
