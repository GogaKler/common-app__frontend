<script setup>
import { computed, reactive } from 'vue';
import { RouterView } from 'vue-router';
import AppHeader from '@components/header/AppHeader.vue';
import AppSidebar from '@components/sidebar/AppSidebar.vue';
import { useAppStore } from '@app/store/useAppStore';

const appStore = useAppStore();
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
const sidebarValues = reactive({
    width: 0,
    height: 0
});

const setSidebarValues = ({ width, height }) => {
    sidebarValues.width = width;
    sidebarValues.height = height;
};

const dynamicStyles = computed(() => {
    const styles = {
        sidebar: {},
        main: {
            marginBottom: `${sidebarValues.height - 1}px`
        }
    };

    if (!appStore.isMobile) {
        styles.sidebar.minHeight = `calc(100vh - ${headerState.height}px)`;
        styles.main.marginLeft = `${sidebarValues.width}px`;
        styles.main.marginBottom = '';
    }

    return styles;
});
</script>

<template>
    <div class="app__wrapper">
        <AppHeader @onUpdate:header-state="setHeaderSize" />
        <div class="content__wrapper" :style="{ paddingTop: `${headerState.height}px` }">
            <AppSidebar :style="dynamicStyles.sidebar" @onUpdate:sidebarValues="setSidebarValues" />
            <div class="app__main" :style="dynamicStyles.main">
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

        @include for-size('md') {
            flex-direction: column;
        }
    }
}
</style>
