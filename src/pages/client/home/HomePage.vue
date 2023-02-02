<script setup>
import { ref } from 'vue';
import { useUsersStore } from '@/stores/users';
import { UserAvatar } from '@/entities/User';
import router from '@app/router';
import { useSocket } from '@use';
import VInput from '@UI/input/VInput.vue';
import VButton from '@UI/button/VButton.vue';
import { useAuthStore } from '@/stores/auth';

const usersStore = useUsersStore();
const authStore = useAuthStore();

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

const { socket } = useSocket();

socket.on('recMessage', (res) => {
    console.log(res);
    messages.value.push(res);
});

const messages = ref([]);

const message = ref('');

const clickToButton = () =>
    socket.emit('sendMessage', {
        message: {
            name: authStore.user.name,
            user_id: authStore.userId,
            message: message.value,
            avatar: authStore.user.avatar
        }
    });
</script>

<template>
    <main>
        <div class="home__wrapper">
            <h1>Пользователи</h1>
            <div v-for="user in usersStore.users" :key="user.id" class="user mt-4 mb-4">
                <UserAvatar
                    :name="user.name"
                    :logo="user.avatar"
                    show-name
                    size="5x"
                    @click="goToProfile(user.id)"
                />
            </div>
            <div>
                <ul v-for="(m, index) in messages" :key="index">
                    <li
                        :class="[
                            'mb-2 message__wrapper flex items-center',
                            { me: m.user_id === authStore.userId }
                        ]"
                    >
                        <div v-if="m.user_id !== authStore.userId">
                            <UserAvatar :logo="m.avatar" />
                        </div>
                        <div>
                            <div
                                :class="['mb-1', 'message', { me: m.user_id === authStore.userId }]"
                            >
                                {{ m.name }}
                            </div>
                            <div class="message__content">{{ m.message }}</div>
                        </div>
                        <div v-if="m.user_id === authStore.userId">
                            <UserAvatar :logo="m.avatar" />
                        </div>
                    </li>
                </ul>
            </div>
            <v-input v-model="message" />
            <v-button @click="clickToButton">Отправить</v-button>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.message {
    &__wrapper.me {
        margin-left: 500px;
    }

    font-weight: 600;
    font-size: 18px;
    @include themed() {
        color: t($secondary);
    }
    &.me {
        @include themed() {
            color: t($primary);
        }
    }

    &__content {
        padding: 5px 10px;
        border-radius: 10px;
        @include themed() {
            background-color: t($background-secondary);
        }
    }
}
</style>
