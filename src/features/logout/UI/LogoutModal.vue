<script setup>
import { VModal } from '@UI';
import { computed, toRefs } from 'vue';
import { useUserStore } from '@entities/user';
const userStore = useUserStore();

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
});

const { show } = toRefs(props);

const emit = defineEmits(['closeModal']);

const closeModal = () => emit('closeModal');

const showModal = computed({
    get() {
        return show.value;
    },
    set() {
        closeModal();
    }
});

const logoutFromSystem = async () => {
    await userStore.logout();
};
</script>

<template>
    <VModal
        v-model="showModal"
        confirmed
        @onCancel="closeModal"
        @onAccept="logoutFromSystem"
    >
        <template #header>Подтверждение выхода</template>
        <template #body>Вы уверены, что хотите выйти?</template>
    </VModal>
</template>
