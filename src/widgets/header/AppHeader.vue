<script setup>
import { computed, reactive, ref } from 'vue';
import { useAppStore } from '@app/store/useAppStore';
import { useRouter } from 'vue-router';
import { useResizeObserver } from '@use';
import { UserAvatar, useUserStore } from '@entities/User';
import VModal from '@UI/modal/VModal.vue';
import VSwitch from '@UI/switch/VSwitch.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import VDropdown from '@UI/dropdown/VDropdown.vue';
const router = useRouter();
const emit = defineEmits(['click:bar', 'onUpdate:headerValues', 'onChange:switch-theme']);
const header_REFLINK = ref(null);

const headerState = reactive({
    bar: false
});

useResizeObserver(header_REFLINK, ({ width, height }) => {
    emit('onUpdate:headerValues', {
        width,
        height
    });
});

/*
 * Bar Condition
 * */
const onClickBar = () => {
    headerState.bar = !headerState.bar;
    emit('click:bar', headerState.bar.value);
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

/*
 * USER LOGIC
 * */
const userStore = useUserStore();
const authStore = useAuthStore();

const { user, userId } = storeToRefs(userStore);

const isUserMenuOpen = ref(false);

const headerRotateIcon = computed(() => (isUserMenuOpen.value ? 180 : null));

const goToProfile = () => {
    router.push({
        name: 'profile',
        params: {
            id: userId.value
        }
    });
    isUserMenuOpen.value = false;
};

const headerLogout = async () => {
    await authStore.logout();
};
const isShowLogoutModal = ref(false);
</script>

<template>
    <div ref="header_REFLINK" class="header">
        <div class="header-left">
            <div class="header-left__logo" onmousedown="return false">
                <FontAwesomeIcon
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
                <VSwitch
                    v-model:checked="switchValue"
                    :icon="{
                        on: 'fa-regular fa-moon',
                        off: 'fa-regular fa-lightbulb'
                    }"
                />
            </div>
            <div class="header-right__dropdown">
                <VDropdown @status="isUserMenuOpen = $event">
                    <template #open="{ open }">
                        <UserAvatar
                            :name="user.name"
                            :logo="user.avatar"
                            class="cursor-pointer"
                            size="2x"
                            @click="open"
                        >
                            <FontAwesomeIcon
                                class="header-right__toggle"
                                icon="fa-solid fa-chevron-down"
                                size="sm"
                                :rotation="headerRotateIcon"
                            />
                        </UserAvatar>
                    </template>
                    <template #header-content>
                        <UserAvatar
                            :name="user.name"
                            :logo="user.avatar"
                            show-name
                            @onClick:name="goToProfile"
                        />
                    </template>
                    <template #content>
                        <router-link :to="{ name: 'settings' }" class="dropdown-user__link">
                            Настройки
                        </router-link>
                    </template>
                    <template #footer-content>
                        <div class="dropdown-user__exit" @click="isShowLogoutModal = true">
                            <font-awesome-icon
                                class="mr-2"
                                icon="fa-solid fa-arrow-right-from-bracket"
                                size="xs"
                            />
                            <span>Выйти</span>
                        </div>
                    </template>
                </VDropdown>
            </div>
        </div>
        <VModal
            v-model="isShowLogoutModal"
            confirmed
            @onCancel="isShowLogoutModal = false"
            @onAccept="headerLogout"
        >
            <template #header>Подтверждение выхода</template>
            <template #body>Вы уверены, что хотите выйти?</template>
        </VModal>
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

    &__toggle {
        margin-top: 3px;
        transition: $transition-fast;
    }
}

.dropdown-user {
    &__link {
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
    &__exit {
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

// MEDIA
.header {
    @include for-size('md') {
        padding: 10px;
    }

    &-left__logo {
        @include for-size('md') {
            min-width: 0;
        }

        &-text {
            @include for-size('md') {
                display: none;
            }
        }
    }
}
</style>
