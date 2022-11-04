<script setup>
import { toRefs, watch } from 'vue';
import VButton from '@UI/button/VButton.vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    noClickOutside: {
        type: Boolean,
        default: false
    },
    hideOverlay: {
        type: Boolean,
        default: false
    },
    confirmed: {
        type: Boolean,
        default: false
    }
});
const { modelValue, noClickOutside } = toRefs(props);
const emit = defineEmits(['update:modelValue']);
const updateModelValue = (flag) => emit('update:modelValue', flag);

const closeModalOnClickOutside = () => {
    if (noClickOutside.value) return;
    updateModelValue(false);
};

const closeModal = () => updateModelValue(false);

watch(modelValue, () => {
    if (modelValue.value) {
        document.body.style.overflowY = 'hidden';
    } else {
        document.body.style.overflowY = '';
    }
});
</script>

<template>
    <Transition name="modalA" :duration="200">
        <div v-if="modelValue" :class="['modal-overlay', { 'hide-overlay': hideOverlay }]">
            <div v-click-outside="closeModalOnClickOutside" class="modal">
                <div class="modal__header options">
                    <div class="modal__header--text">
                        <slot name="header" />
                    </div>
                    <div class="modal__header--close" @click="closeModal">
                        <font-awesome-icon class="modal-icon" icon="fa-solid fa-xmark" size="xs" />
                    </div>
                </div>
                <div class="modal__body options">
                    <slot name="body" />
                </div>
                <div v-if="confirmed" class="modal__footer">
                    <v-button class="modal__footer--button" primary @click="$emit('cancel')">
                        Отменить
                    </v-button>
                    <v-button class="modal__footer--button" primary @click="$emit('accept')">
                        Применить
                    </v-button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
.modalA-enter-active,
.modalA-leave-active {
    transition: all 0.1s ease-in-out;
}
.modalA-enter-from,
.modalA-leave-to {
    opacity: 0;
}
.modalA-enter-active .modal,
.modalA-leave-active .modal {
    transition: all 0.2s ease-in-out;
}
.modalA-enter-from .modal,
.modalA-leave-to .modal {
    transform: translateY(60px);
    opacity: 0;
}

.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.65);
    color: #1a1c1e;
    z-index: 9999;

    &.hide-overlay {
        background-color: transparent;
    }
}

.modal {
    background-color: white;
    max-width: 200px;
    min-width: 500px;
    border-radius: 15px;
    padding: 15px 20px;
    box-shadow: 4px 5px 36px 0 rgba(34, 60, 80, 0.2);

    &__header {
        display: flex;
        justify-content: space-between;
        font-size: 25px;
        font-weight: 600;
        margin-bottom: 15px;

        &--close {
            align-self: flex-start;
            height: 20px;
            width: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            padding: 12px;
            cursor: pointer;
            transition: $transition-bg;

            &:hover {
                @include themed() {
                    background-color: t($border);
                }
            }
        }
    }

    &__body {
        margin-bottom: 15px;
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-top: 15px;
        @include themed() {
            border-top: 1px solid t($border);
        }

        &--button {
            margin-right: 15px;

            &:last-child {
                margin-right: 0;
            }
        }
    }
}
</style>
