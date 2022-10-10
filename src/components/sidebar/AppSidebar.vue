<script setup>
import { sidebarMenu } from '@components/sidebar/utils/sidebarMenu';
import { computed, onMounted, reactive, ref } from 'vue';

defineProps({
  sidebarCondition: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['onUpdate:sidebar-state']);

const sidebar_REFLINK = ref(null);

const defaultState = reactive({
  width: 0,
  height: 0
});

const sidebarWidth = computed(() => defaultState.width);
const sidebarHeight = computed(() => defaultState.height);

const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    defaultState.width = entry.target.offsetWidth;
    defaultState.height = entry.target.offsetHeight;
  });

  emit('onUpdate:sidebar-state', {
    width: sidebarWidth,
    height: sidebarHeight
  });
});

onMounted(() => {
  resizeObserver.observe(sidebar_REFLINK.value);
});
</script>

<template>
  <div
    ref="sidebar_REFLINK"
    :class="['sidebar__wrapper', { active: sidebarCondition }]"
  >
    <div class="sidebar__content">
      <ul class="sidebar__list">
        <router-link
          v-for="(item, index) in sidebarMenu"
          :key="index"
          :class="['sidebar__list-item', { active: sidebarCondition }]"
          :to="{ name: item.to }"
        >
          <font-awesome-icon
            size="sm"
            :icon="item.icon"
            :class="['sidebar__list-icon', { active: sidebarCondition }]"
          />
          <div :class="['sidebar__list-text', { active: sidebarCondition }]">
            {{ item.title }}
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  &__wrapper {
    z-index: 2;
    position: fixed;
    height: 100vh;
    min-width: 60px;
    padding: 5px 0;
    transition: $transition-bg, $transition-minWidth;
    @include themed() {
      border-right: 1px solid t($border);
      background-color: t($background);
    }

    &.active {
      min-width: 238px !important;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin: 0 0 10px 0;

    &-icon {
      padding: 12px;
      margin: 0 5px;
    }
  }

  &__list {
    margin: 20px 10px 0 0;

    &-item {
      display: flex;
      align-items: center;

      height: 27px;

      margin-bottom: 10px;
      margin-left: 8px;
      padding-left: 12px;

      border-radius: 15px;
      transition: 0.2s ease-out, $transition-bg;

      &.active {
        margin-left: 0;
        justify-content: normal;
        padding-left: 20px;
        border-radius: 0 20px 20px 0;
      }

      &.router-link-active {
        @include themed() {
          background-color: t($background-secondary);
        }
      }

      &:not(.router-link-active):hover {
        @include themed() {
          background-color: rgba(t($background-secondary), 0.5);
        }
      }
    }

    &-icon {
      &.active {
        margin: 0 10px 0 0;
      }
    }

    &-text {
      opacity: 0;
      cursor: default;
      pointer-events: none;
      width: 0;
      transition: $transition-bg;

      &.active {
        opacity: 1;
        cursor: pointer;
        pointer-events: all;
        transition: $transition-bg;
      }
    }
  }
}
</style>
