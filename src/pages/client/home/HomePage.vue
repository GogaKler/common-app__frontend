<script setup>
import { useUsersStore } from '@/stores/users';
import VUser from '@UI/user/VUser.vue';
import router from '@app/router';

const usersStore = useUsersStore();

const getUsers = async () => await usersStore.getUsers();

getUsers();

const goToProfile = (id) => {
    router.push({
        name: 'profile',
        params: {
            id
        }
    });
};
</script>

<template>
    <main>
        <div class="home__wrapper">
            <h1>Пользователи</h1>
            <div v-for="user in usersStore.users" :key="user.id" class="user mt-4 mb-4">
                <v-user
                    :name="user.name"
                    :logo="user.avatar"
                    show-name
                    size="5x"
                    @click="goToProfile(user.id)"
                />
            </div>
        </div>
    </main>
</template>
