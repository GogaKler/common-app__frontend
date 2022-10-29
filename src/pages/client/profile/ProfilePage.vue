<script setup>
import { useUsersStore } from '@/stores/users';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import VUser from '@UI/user/VUser.vue';

const route = useRoute();

const usersStore = useUsersStore();
// const authStore = useAuthStore();
const isLoading = ref(false);

const fetchData = async () => {
    isLoading.value = true;
    try {
        await usersStore.requestUserByID(route.params.id);
    } catch (e) {
        throw new Error(e);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchData();
});

const user = computed(() => usersStore.userById);
// const isMe = computed(() => user.value.id === authStore.userId);
</script>

<template>
    <div v-if="!isLoading" class="profile">
        <div class="container">
            <v-user :name="user.name" size="10x" show-name />
        </div>
    </div>
</template>

<style lang="scss"></style>
