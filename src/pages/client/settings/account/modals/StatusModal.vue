<script setup>
import { ref, toRefs, computed } from 'vue';
import VModal from '@UI/modal/VModal.vue';
import VInput from '@UI/input/VInput.vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@entities/User';
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const emit = defineEmits(['closeModal']);
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
});

const { show } = toRefs(props);

const showModal = computed({
    get() {
        return show.value;
    },
    set() {
        closeModal();
    }
});

const clearStatus = () => (status.value = user.value.status);

const closeModal = () => {
    emit('closeModal');
    clearStatus();
};

const status = ref(user.value.status);

const changeStatus = async () => {
    if (status.value === user.value.status) {
        showModal.value = false;
        return;
    }
    await userStore.changeUserStatus(status.value);
    closeModal();
};
</script>

<template>
    <v-modal v-model="showModal" confirmed @onCancel="closeModal" @onAccept="changeStatus">
        <template #header>Изменение статуса</template>
        <template #body>
            <v-input
                v-model="status"
                label="Статус"
                focused
                @keyup.enter.stop="changeStatus"
                @keyup.esc.stop="closeModal"
            />
        </template>
    </v-modal>
</template>
