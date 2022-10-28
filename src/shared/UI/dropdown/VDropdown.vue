<script setup>
defineProps({
    dialog: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <Transition name="dropdown-menu">
        <div class="menu" v-if="dialog">
            <ul class="menu__header">
                <slot name="menu-header" />
            </ul>
            <div class="menu__footer">
                <slot name="menu-footer" />
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
.dropdown-menu-enter-active,
.dropdown-menu-leave-active {
    transition: opacity 0.1s ease-in-out;
}
.dropdown-menu-enter-from,
.dropdown-menu-leave-to {
    opacity: 0;
}
</style>
