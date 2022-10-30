<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useAppStore } from '@app/store/useAppStore';

import { useAuthStore } from '@/stores/auth';
import VUser from '@UI/user/VUser.vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['click:bar', 'onUpdate:header-state', 'onChange:switch-theme']);
const router = useRouter();

const header_REFLINK = ref(null);

const defaultState = reactive({
    bar: false,
    width: 0,
    height: 0
});

/*
 * Header Size
 * */
const headerWidth = computed(() => defaultState.width);
const headerHeight = computed(() => defaultState.height);

const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
        defaultState.width = entry.target.offsetWidth;
        defaultState.height = entry.target.offsetHeight;
    });

    emit('onUpdate:header-state', {
        width: headerWidth,
        height: headerHeight
    });
});

onMounted(() => {
    resizeObserver.observe(header_REFLINK.value);
});

/*
 * Bar Condition
 * */
const headerBarCondition = computed(() => defaultState.bar);
const changeBarState = () =>
    defaultState.bar ? (defaultState.bar = false) : (defaultState.bar = true);

const onClickBar = () => {
    changeBarState();
    emit('click:bar', headerBarCondition.value);
};

/*
 * DARK MODE
 * */
const appStore = useAppStore();

const switchValue = computed({
    get() {
        return appStore.switchThemeValue;
    },
    set(value) {
        if (value) {
            appStore.setTheme('dark');
        } else {
            appStore.setTheme('light');
        }
    }
});

// user logic
const authStore = useAuthStore();

const user = computed(() => authStore.user);

const isUserMenuOpen = ref(false);
const closeUserMenu = () => {
    isUserMenuOpen.value = false;
};

const headerRotateIcon = computed(() => (isUserMenuOpen.value ? 180 : null));

const goToProfile = () => {
    router.push({
        name: 'profile',
        params: {
            id: authStore.userId
        }
    });
    isUserMenuOpen.value = false;
};

const headerLogout = async () => {
    await authStore.logout();
};
</script>

<template>
    <div ref="header_REFLINK" class="header">
        <div class="header-left">
            <div class="header-left__logo" onmousedown="return false">
                <font-awesome-icon
                    ref="sidebar"
                    icon="fa-solid fa-bars"
                    size="lg"
                    class="header-left__logo-icon"
                    @click="onClickBar"
                />
                <div class="header-left__logo-text">Vue-common</div>
            </div>
        </div>
        <div class="header-right">
            <div class="header-right__theme">
                <v-switch
                    v-model:checked="switchValue"
                    :icon="{
                        on: 'fa-regular fa-moon',
                        off: 'fa-regular fa-lightbulb'
                    }"
                />
            </div>
            <div v-click-outside="closeUserMenu" class="header-right__user">
                <v-user
                    :name="user.name"
                    class="cursor-pointer"
                    size="2x"
                    @click="isUserMenuOpen = !isUserMenuOpen"
                >
                    <font-awesome-icon
                        class="header-right__user--toggle"
                        icon="fa-solid fa-chevron-down"
                        size="sm"
                        :rotation="headerRotateIcon"
                    />
                </v-user>

                <Transition name="dropdown">
                    <div v-if="isUserMenuOpen" class="dropdown">
                        <div class="dropdown-user block">
                            <v-user :name="user.name" show-name @onClick:name="goToProfile" />
                        </div>
                        <ul class="dropdown-list">
                            <li class="dropdown__item">
                                <router-link :to="{ name: 'home' }" class="dropdown__item--link">
                                    Главная
                                </router-link>
                            </li>
                            <li class="dropdown__item">
                                <router-link
                                    :to="{ name: 'settings' }"
                                    class="dropdown__item--link"
                                >
                                    Настройки
                                </router-link>
                            </li>
                        </ul>
                        <div class="dropdown-exit block">
                            <div class="dropdown-exit__item" @click="headerLogout">
                                <font-awesome-icon
                                    class="mr-2"
                                    icon="fa-solid fa-arrow-right-from-bracket"
                                    size="xs"
                                />
                                <span>Выйти</span>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header {
    position: fixed;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 60px 10px 5px;
    transition: $transition-bg;
    z-index: 5;

    @include themed() {
        background-color: t($background);
        border-bottom: 1px solid t($border);
    }
}
// LEFT
.header-left {
    &__logo {
        display: flex;
        align-items: center;
        min-width: 238px;

        &-icon {
            padding: 12px;
            margin: 0 10px 0 5px;
            border-radius: 50%;
            cursor: pointer;
            transition: 0.1s ease-out;

            &:hover {
                @include themed() {
                    background-color: rgba(t($background-secondary), 0.5);
                }
            }
        }
    }
}

// RIGHT
.header-right {
    display: flex;
    align-items: center;

    &__theme {
        margin-right: 25px;
    }

    &__user {
        position: relative;

        &--toggle {
            margin-top: 3px;
            transition: $transition-fast;
        }
    }

    .logout {
        cursor: pointer;
    }
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition: opacity 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
}

.dropdown {
    position: absolute;
    min-width: 140px;
    top: 50px;
    right: 5px;
    border-radius: 8px;

    @include themed() {
        background: t($background);
        box-shadow: 0 0 55px 10px t($box-shadow);
    }

    &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border: 9px solid transparent;
        left: 50%;
        bottom: 100%;
        margin-left: 23px;

        @include themed() {
            border-bottom-color: t($background);
        }
    }

    // FIRST BLOCK
    &-list {
        padding: 15px 0;

        @include themed() {
            border-top: 1px solid t($border);
            border-bottom: 1px solid t($border);
        }
    }

    &__item {
        margin-bottom: 10px;

        &:last-child {
            margin-bottom: 0;
        }

        &--link {
            display: flex;
            align-items: center;
            padding: 4px 20px;
            transition: $transition-fast;

            &:hover {
                @include themed() {
                    background: rgba(t($background-secondary), 0.5);
                }
            }
        }
    }

    // SECOND BLOCK
    .block {
        margin: 12px 15px;
    }
    &-exit {
        &__item {
            display: flex;
            align-items: center;
            cursor: pointer;

            &:hover {
                @include themed() {
                    color: t($primary);
                }
            }
        }
    }
}
</style>
