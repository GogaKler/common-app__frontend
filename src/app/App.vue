<script setup>
import { useAppStore } from '@app/store/useAppStore';

const appStore = useAppStore();

const initTheme = async () => {
    await appStore.initialTheme();
};

initTheme();
</script>

<template>
    <RouterView />
</template>
