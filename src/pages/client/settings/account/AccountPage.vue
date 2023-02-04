<script setup>
import { UserAvatar, useUserStore } from '@/entities/User';
import VUpload from 'vue-image-crop-upload';
import { shallowRef, ref } from 'vue';
import { accountFields } from '@pages/client/settings/account/utils/accountFields';
import { storeToRefs } from 'pinia';
import VButton from '@UI/button/VButton.vue';
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const currentModalComponent = shallowRef(null);

const showModal = ref(false);
const showModalToggle = () => (showModal.value = !showModal.value);

const openModal = (id) => {
    const field = accountFields.value.find((item) => item.id === id);

    currentModalComponent.value = field.modal.value;
    showModalToggle();
};

const showUpload = ref(false);
const toggleUpload = () => (showUpload.value = !showUpload.value);

const cropSuccess = async (imgUrl) => {
    await userStore.uploadUserAvatar(imgUrl);
};
</script>

<template>
    <div class="account">
        <div class="container-small">
            <div class="account__content">
                <div class="account-list">
                    <div v-for="field in accountFields" :key="field" class="account-list__item">
                        <div class="account-list__item--name">{{ field.title }}</div>
                        <div
                            class="account-list__item--value"
                            :style="{ cursor: field.modal ? 'pointer' : 'default' }"
                            @click="openModal(field.id)"
                        >
                            {{ field.value }}
                        </div>
                    </div>
                </div>
                <div class="account-logo">
                    <div class="mb-3 whitespace-nowrap">Изображение в профиле</div>
                    <UserAvatar :name="user.name" :logo="user.avatar" size="9x">
                        <template #inner>
                            <VButton theme="outlined" size="sm" @click="toggleUpload">
                                <FontAwesomeIcon
                                    icon="fa-solid fa-pencil"
                                    size="sm"
                                    class="mr-1.5"
                                />
                                Изменить
                            </VButton>
                        </template>
                    </UserAvatar>
                </div>
            </div>
        </div>

        <component :is="currentModalComponent" :show="showModal" @closeModal="showModalToggle" />

        <Teleport to="body">
            <VUpload
                v-model="showUpload"
                field="img"
                :width="200"
                :height="200"
                lang-type="ru"
                img-format="jpg"
                @crop-success="cropSuccess"
            />
        </Teleport>
    </div>
</template>

<style lang="scss" scoped>
.container-small {
    width: 100%;
    max-width: 800px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 15px;
    padding-left: 15px;
    flex-grow: 1;
}
.account {
    margin-bottom: 20px;
    &__content {
        display: flex;
        justify-content: space-between;
    }
}

.account-list {
    width: 100%;
    padding-right: 100px;

    &__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        padding-bottom: 10px;

        @include themed() {
            border-bottom: 1px solid t($border);
        }

        &--name {
            //font-style: italic;
        }

        &--value {
            @include themed() {
                color: rgba(t($text), 0.5);
            }

            &:hover {
                @include themed() {
                    color: t($text);
                }
            }
        }
    }
}
</style>
