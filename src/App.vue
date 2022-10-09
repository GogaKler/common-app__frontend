<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
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
 * DARK MODE
 * */
const isDarkMode = ref(false);
const htmlElement = ref(document.documentElement);

watch(isDarkMode, () => {
  if (isDarkMode.value) {
    localStorage.setItem('theme', 'dark');
    htmlElement.value.setAttribute('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
    htmlElement.value.setAttribute('theme', 'light');
  }
});

/*
 * SET STATE ON MOUNT
 * */

const setOnMountTheme = (theme) => {
  switch (theme) {
    case 'dark':
      htmlElement.value.setAttribute('theme', 'dark');
      isDarkMode.value = true;
      break;
    case 'light':
      htmlElement.value.setAttribute('theme', 'light');
      isDarkMode.value = false;
      break;
  }
};

const setOnMountSidebarCondition = (condition) => {
  condition === 'true'
    ? (sidebarState.condition = true)
    : (sidebarState.condition = false);
};

onMounted(() => {
  setOnMountTheme(localStorage.getItem('theme'));
  setOnMountSidebarCondition(localStorage.getItem('sidebarCondition'));
});
</script>

<template>
  <div class="app__wrapper">
    <AppHeader
      @click:bar="sidebarOpenCloseFlow"
      @onUpdate:header-state="setHeaderSize"
      @onChange:switch-theme="isDarkMode = $event"
    />
    <div class="content__wrapper">
      <AppSidebar
        :style="{ marginTop: `${headerHeight}px` }"
        :sidebar-condition="isSidebarOpen"
        @onUpdate:sidebar-state="setSidebarSize"
      />
      <RouterView
        class="app__main"
        :style="{ margin: `${headerHeight}px 0 0 ${sidebarWidth}px` }"
      />
    </div>
  </div>
</template>

<style lang="scss">
.app {
  &__main {
    background: var(--bg);
  }
}

.content {
  &__wrapper {
    display: flex;
  }
}
</style>
