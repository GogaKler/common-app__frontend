<script setup>
import { useUsersStore } from '@/stores/users';
import { computed, ref, watchPostEffect } from 'vue';
import { useRoute } from 'vue-router';
import VUser from '@UI/user/VUser.vue';
// import { useAuthStore } from '@/stores/auth';

const route = useRoute();

const usersStore = useUsersStore();
// const authStore = useAuthStore();
const isLoading = ref(false);

watchPostEffect(async () => {
    isLoading.value = true;
    try {
        await usersStore.requestUserByID(route.params.id);
    } catch (e) {
        throw new Error(e);
    } finally {
        isLoading.value = false;
    }
});

const user = computed(() => usersStore.userById);
// const isMe = computed(() => user.value.id === authStore.userId);
</script>

<template>
    <div v-if="!isLoading" class="profile">
        <div class="container">
            <div class="profile__title">{{ user.name }}</div>
            <div class="profile__user">
                <v-user :name="user.name" size="10x" />
                <div class="profile__user--item">{{ user.name }}</div>
                <div class="profile__user--item">{{ user.email }}</div>
                <div class="profile__user--item">{{ user.gender }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.profile {
    &__title {
        font-size: 25px;
        font-weight: 600;
        margin-bottom: 20px;
        padding: 15px;
        @include themed() {
            border-bottom: 1px solid t($border);
        }
    }
}
</style>
