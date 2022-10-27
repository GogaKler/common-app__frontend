<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useAppStore } from '@app/store/useAppStore';

import { useAuthStore } from '@/stores/auth';

const emit = defineEmits(['click:bar', 'onUpdate:header-state', 'onChange:switch-theme']);

const header_REFLINK = ref(null);

const defaultState = reactive({
    bar: false,
    width: 0,
    height: 0
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
 * DARK MODE
 * */
const appStore = useAppStore();

const switchValue = ref(false);

onMounted(() => {
    switchValue.value = appStore.isDarkTheme;
});

watch(switchValue, () => {
    if (switchValue.value) {
        appStore.setTheme('dark');
    } else {
        appStore.setTheme('light');
    }
});

const authStore = useAuthStore();

const user = authStore.get_user;

const isUserMenuOpen = ref(false);
const headerRotateIcon = computed(() => (isUserMenuOpen.value ? 180 : null));

const headerLogout = async () => {
    await authStore.logout();
};
</script>

<template>
    <div ref="header_REFLINK" class="header">
        <div class="header__left">
            <div class="header__logo" onmousedown="return false">
                <font-awesome-icon
                    ref="sidebar"
                    icon="fa-solid fa-bars"
                    size="lg"
                    class="header__logo-icon"
                    @click="onClickBar"
                />
                <div class="header__logo-text" @click="() => authStore.me()">Vue-common</div>
            </div>
        </div>
        <div class="header__right">
            <div class="theme">
                <v-switch
                    v-model:checked="switchValue"
                    :icon="{
                        on: 'fa-regular fa-moon',
                        off: 'fa-regular fa-lightbulb'
                    }"
                />
            </div>
            <div class="user-info">
                <div class="user" @click="isUserMenuOpen = !isUserMenuOpen">
                    <span class="user__name mr-2"> {{ user.name }}</span>
                    <div class="user__logo">
                        <span>{{ user.name[0] + user.name[1] }}</span>
                    </div>
                    <font-awesome-icon
                        class="user__toggle"
                        icon="fa-solid fa-chevron-down"
                        size="sm"
                        :rotation="headerRotateIcon"
                    />
                </div>
            </div>
            <div class="logout" @click="headerLogout">
                <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// LEFT
.header {
    position: fixed;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 60px 10px 5px;
    transition: $transition-bg;

    @include themed() {
        background-color: t($background);
        border-bottom: 1px solid t($border);
    }

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

.header {
    &__right {
        display: flex;
        align-items: center;
    }
}

.theme {
    margin-right: 25px;
}

.user-info {
    position: relative;
    margin-right: 25px;
}

.logout {
    cursor: pointer;
    border-radius: 50%;
    padding: 6px;
    &:hover {
        @include themed() {
            background-color: rgba(t($background-secondary), 0.5);
        }
    }
}

.user {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;

    &__name {
        font-weight: 600;
    }

    &__logo {
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        text-align: center;
        margin-right: 5px;
        font-size: 15px;
        font-weight: 600;
        display: flex;
        height: 35px;
        width: 35px;
        @include themed() {
            background: t($background-secondary);
            border: 1px solid t($border);
        }
    }

    &__toggle {
        margin-top: 3px;
        transition: $transition-fast;
    }
}
</style>
