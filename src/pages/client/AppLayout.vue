<script setup>
import { reactive, ref } from 'vue';
import { RouterView } from 'vue-router';
import AppHeader from '@components/header/AppHeader.vue';
import AppSidebar from '@components/sidebar/AppSidebar.vue';

/*
 * Header
 * */
const headerState = reactive({
    width: 0,
    height: 54
});
const setHeaderSize = ({ width, height }) => {
    headerState.width = width;
    headerState.height = height;
};

/*
 * SIDEBAR
 * */
const sidebarWidth = ref(60);
const setSidebarSize = (event) => (sidebarWidth.value = event);
</script>

<template>
    <div class="app__wrapper">
        <AppHeader @onUpdate:header-state="setHeaderSize" />
        <div class="content__wrapper">
            <AppSidebar
                :style="{ height: `calc(100vh + ${headerState.height}px)` }"
                @onUpdate:sidebar-width="setSidebarSize"
            />
            <div
                class="app__main"
                :style="{ margin: `${headerState.height}px 0 0 ${sidebarWidth}px`, width: '100%' }"
            >
                <div class="container">
                    <RouterView />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.app {
    &__main {
        transition: $transition-bg;
        @include themed() {
            background: t($background);
        }
    }
}

.content {
    &__wrapper {
        display: flex;
    }
}
</style>
