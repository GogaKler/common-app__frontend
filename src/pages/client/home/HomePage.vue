<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const LOGOUT = async () => {
    await authStore.logout();
    // await authStore.me();
};

const ME = async () => {
    return await authStore.me();
};
</script>

<template>
    <div>
        <div>HOME PAGE DUDE FATAFAKA</div>
        <button @click="LOGOUT">ВЫЙТИ</button>
        <button @click="ME">Запросить меня</button>
    </div>
</template>
