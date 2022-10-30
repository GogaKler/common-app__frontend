<script setup>
import { reactive } from 'vue';

const links = reactive([
    {
        id: 1,
        title: 'Аккаунт',
        to: 'settings'
    },
    {
        id: 2,
        title: 'Домой',
        to: 'home'
    }
]);
</script>

<template>
    <div class="settings">
        <div class="settings__header">
            <div class="settings__header--title">Настройки</div>
            <div class="settings__header-nav">
                <div class="settings__header-nav--items-wrapper">
                    <div
                        v-for="(link, index) in links"
                        :key="index"
                        class="settings__header-nav--item"
                    >
                        <RouterLink :to="{ name: link.to }">{{ link.title }}</RouterLink>
                    </div>
                </div>
            </div>
        </div>
        <div class="settings__body">
            <RouterView />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.settings {
    &__header {
        margin: 44px 0;

        &--title {
            font-weight: 600;
            font-size: 36px;
            line-height: 52px;
            margin-bottom: 38px;
        }

        &-nav {
            @include themed() {
                box-shadow: inset 0 -1px 0 t($border);
            }

            &--items-wrapper {
                display: flex;
                align-items: center;
            }

            &--item {
                padding-bottom: 10px;
                margin-right: 30px;

                & a {
                    font-size: 15px;
                    font-style: italic;

                    @include themed() {
                        color: rgba(t($text), 0.5);
                    }

                    &:hover {
                        @include themed() {
                            color: t($text);
                        }
                    }
                }

                .router-link-active {
                    @include themed() {
                        color: t($text);
                    }
                }
            }
        }
    }
}
</style>
