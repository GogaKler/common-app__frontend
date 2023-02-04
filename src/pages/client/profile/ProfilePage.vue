<script setup>
import { ref, watchPostEffect } from 'vue';
import { useRoute } from 'vue-router';
import { UserAvatar, useUserStore } from '@/entities/User';
import { storeToRefs } from 'pinia';

const route = useRoute();

const isLoading = ref(false);

const userStore = useUserStore();
const { userByID } = storeToRefs(userStore);
const user = userByID;

watchPostEffect(async () => {
    isLoading.value = true;
    try {
        await userStore.requestUserByID(route.params.id);
    } catch (e) {
        throw new Error(e);
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <div v-if="!isLoading" class="profile">
        <div class="container">
            <div class="profile__title">{{ user.name }}</div>
            <div class="profile__user">
                <UserAvatar :name="user.name" :logo="user.avatar" size="10x" />
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
