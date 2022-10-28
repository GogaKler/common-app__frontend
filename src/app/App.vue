<script setup>
import { onBeforeMount } from 'vue';
import { useAppStore } from '@app/store/useAppStore';

const appStore = useAppStore();

onBeforeMount(async () => {
    await appStore.initialTheme();
});
</script>

<template>
    <RouterView />
</template>
