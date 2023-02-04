<script setup>
import { computed, onUnmounted, toRefs, watch } from 'vue';
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
    },
    buttonTheme: {
        type: Object,
        default: () => ({
            accept: 'primary',
            cancel: 'danger'
        })
    }
});
const { modelValue, noClickOutside, buttonTheme } = toRefs(props);
const emit = defineEmits(['update:modelValue', 'onCancel', 'onAccept']);
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

// Костыль для изменения стилей body
onUnmounted(() => {
    document.body.style.overflowY = '';
});

const acceptThemeButton = computed(() => buttonTheme.value.accept);
const cancelThemeButton = computed(() => buttonTheme.value.cancel);
</script>

<template>
    <Teleport to="body">
        <Transition name="modal-fade" :duration="200">
            <div v-if="modelValue" :class="['modal-overlay', { 'hide-overlay': hideOverlay }]">
                <div v-click-outside="closeModalOnClickOutside" class="modal">
                    <div class="modal__header options">
                        <div class="modal__header--text">
                            <slot name="header" />
                        </div>
                        <div class="modal__header--close" @click="closeModal">
                            <font-awesome-icon
                                class="modal-icon"
                                icon="fa-solid fa-xmark"
                                size="xs"
                            />
                        </div>
                    </div>
                    <div class="modal__body options">
                        <slot name="body" />
                    </div>
                    <div v-if="confirmed" class="modal__footer">
                        <v-button
                            class="modal__footer--button"
                            :theme="cancelThemeButton"
                            @click="$emit('onCancel')"
                        >
                            Отменить
                        </v-button>
                        <v-button
                            class="modal__footer--button"
                            :theme="acceptThemeButton"
                            @click="$emit('onAccept')"
                        >
                            Применить
                        </v-button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style lang="scss" scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: #1a1c1e;
    z-index: 9999;
    transition: opacity 0.3s ease;

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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;

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
