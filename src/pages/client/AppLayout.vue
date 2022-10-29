<script setup>
import { computed, onMounted, reactive } from 'vue';
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
// const headerWidth = computed(() => headerState.width);
const headerHeight = computed(() => headerState.height);
const setHeaderSize = ({ width, height }) => {
    headerState.width = width;
    headerState.height = height;
};

/*
 * SIDEBAR
 * */
const sidebarState = reactive({
    condition: true,
    width: 0,
    height: 0
});

const isSidebarOpen = computed(() => sidebarState.condition);
const sidebarOpenCloseFlow = () => {
    if (isSidebarOpen.value) {
        sidebarState.condition = false;
        localStorage.setItem('sidebarCondition', 'false');
    } else {
        sidebarState.condition = true;
        localStorage.setItem('sidebarCondition', 'true');
    }
};

const sidebarWidth = computed(() => sidebarState.width);
// const sidebarHeight = computed(() => sidebarState.height);
const setSidebarSize = ({ width, height }) => {
    sidebarState.width = width.value;
    sidebarState.height = height.value;
};

/*
 * SET STATE ON MOUNT
 * */

const setOnMountSidebarCondition = (condition) => {
    condition === 'true' ? (sidebarState.condition = true) : (sidebarState.condition = false);
};

onMounted(() => {
    setOnMountSidebarCondition(localStorage.getItem('sidebarCondition'));
});
</script>

<template>
    <div class="app__wrapper">
        <AppHeader @click:bar="sidebarOpenCloseFlow" @onUpdate:header-state="setHeaderSize" />
        <div class="content__wrapper">
            <AppSidebar
                :style="{ marginTop: `${headerHeight}px` }"
                :sidebar-condition="isSidebarOpen"
                @onUpdate:sidebar-state="setSidebarSize"
            />
            <div
                class="app__main"
                :style="{ margin: `${headerHeight}px 0 0 ${sidebarWidth}px`, width: '100%' }"
            >
                <RouterView />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
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
