import StatusModal from '@pages/client/settings/account/modals/StatusModal.vue';
import { computed, shallowRef } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@entities/User';
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

export const accountFields = computed(() => [
    {
        id: 1,
        title: 'Логин',
        value: user.value.name
    },
    {
        id: 2,
        title: 'E-mail',
        value: user.value.email
    },
    {
        id: 3,
        title: 'Пол',
        value: user.value.gender
    },
    {
        id: 4,
        title: 'Статус',
        value: user.value.status ? user.value.status : 'Отсутсвует',
        modal: shallowRef(StatusModal)
    }
]);
