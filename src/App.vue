<script setup>
import { computed, reactive } from 'vue';
import { RouterView } from 'vue-router';
import AppHeader from '@/components/header/AppHeader.vue';
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
  state: true,
  width: 0,
  height: 0
});

const isSidebarOpen = computed(() => sidebarState.state);
const sidebarOpenCloseFlow = () => {
  isSidebarOpen.value ?? true
    ? (sidebarState.state = false)
    : (sidebarState.state = true);
};

const sidebarWidth = computed(() => sidebarState.width);
// const sidebarHeight = computed(() => sidebarState.height);
const setSidebarSize = ({ width, height }) => {
  sidebarState.width = width.value;
  sidebarState.height = height.value;
};
</script>

<template>
  <div class="app__wrapper">
    <AppHeader
      @click:bar="sidebarOpenCloseFlow"
      @onUpdate:header-state="setHeaderSize"
    />
    <div class="content__wrapper">
      <AppSidebar
        :style="{ marginTop: `${headerHeight}px` }"
        :sidebar-condition="isSidebarOpen"
        @onUpdate:sidebar-state="setSidebarSize"
      />
      <RouterView
        :style="{
          margin: `${headerHeight}px 0 0 ${sidebarWidth}px`,
          zIndex: 1,
          background: '#1e1e1e '
        }"
      />
    </div>
  </div>
</template>

<style lang="scss">
.content {
  &__wrapper {
    display: flex;
  }
}
</style>
