<script setup>
import { ref } from 'vue';

const emit = defineEmits(['status']);

const dialog = ref(false);
const closeMenu = () => (dialog.value = false);
const toggleMenu = () => {
    dialog.value = !dialog.value;
    emit('status', dialog.value);
};
</script>

<template>
    <div v-click-outside="closeMenu" class="relative">
        <slot name="open" :open="toggleMenu" />

        <Transition name="VDropdown">
            <div v-if="dialog" class="VDropdown">
                <div class="VDropdown__header VDropdown--block">
                    <slot name="header-content" />
                </div>
                <ul class="VDropdown__list">
                    <slot name="content" />
                </ul>
                <div class="VDropdown__footer VDropdown--block">
                    <slot name="footer-content" />
                </div>
            </div>
        </Transition>
    </div>
</template>

<style lang="scss">
.VDropdown-enter-active,
.VDropdown-leave-active {
    transition: opacity 0.2s ease;
}

.VDropdown-enter-from,
.VDropdown-leave-to {
    opacity: 0;
}

.VDropdown {
    position: absolute;
    min-width: 140px;
    top: 50px;
    right: 5px;
    border-radius: 8px;

    @include themed() {
        background: t($background);
        box-shadow: 0 0 55px 10px t($box-shadow);
    }

    &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border: 9px solid transparent;
        left: 50%;
        bottom: 100%;
        margin-left: 23px;

        @include themed() {
            border-bottom-color: t($background);
        }
    }

    &--block {
        margin: 12px 15px;
    }
    // FIRST BLOCK
    &__list {
        padding: 15px 0;

        @include themed() {
            border-top: 1px solid t($border);
            border-bottom: 1px solid t($border);
        }

        & > * {
            margin-bottom: 5px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
