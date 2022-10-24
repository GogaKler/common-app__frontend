<script setup>
import { useAuthStore } from '@/stores/auth';
import { reactive } from 'vue';

const authStore = useAuthStore();

const LOGOUT = async () => {
    await authStore.logout();
    // await authStore.me();
};
const person = reactive({});

const ME = async () => {
    person.value = await authStore.me();
};
</script>

<template>
    <div>
        <button @click="LOGOUT">ВЫЙТИ</button>
        <button @click="ME">Запросить меня</button>
        <div>Обо мне</div>
        <div v-if="Object.keys(person).length" class="mt-6">
            <div>Имя: {{ person.value.name }}</div>
            <div>Статус: {{ person.value.status }}</div>
            <div>E-mail: {{ person.value.email }}</div>
            <div>Пол: {{ person.value.gender }}</div>
        </div>
    </div>
</template>
