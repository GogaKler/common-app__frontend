<script setup>
import { useAppStore } from '@app/store/useAppStore';
import { onMounted } from 'vue';

const appStore = useAppStore();

onMounted(async () => {
    await appStore.initialTheme();
});
</script>

<template>
    <RouterView />
</template>
