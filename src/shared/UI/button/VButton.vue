<script setup>
const props = defineProps({
    fullWidth: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <button
        v-bind="$attrs"
        :class="['button', { 'full-width': fullWidth, disabled, loading }]"
        :disabled="disabled || loading"
    >
        <span class="button__text">
            <slot></slot>
            <font-awesome-icon
                v-if="loading"
                class="button__load-icon fa-fade"
                size="xs"
                icon="fa-solid fa-ellipsis"
            />
        </span>
    </button>
</template>

<style lang="scss" scoped>
@keyframes loading-gradient {
    0% {
        background-position: 0 88%;
    }
    50% {
        background-position: 100% 13%;
    }
    100% {
        background-position: 0 88%;
    }
}

@keyframes load-icon {
    0% {
        left: 0;
    }
    48% {
        transform: rotateY(0deg);
    }
    50% {
        left: calc(100% - 10px);
        transform: rotateY(180deg);
    }
    98% {
        transform: rotateY(180deg);
    }
    100% {
        left: 0;
        transform: rotateY(0deg);
    }
}

.button {
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 20px;

    padding: 5px;
    margin: 0;

    @include themed() {
        background: linear-gradient(190deg, t($primary), t($secondary));
        color: t($primary-text);
    }
    transition: $transition;

    &:hover {
        @include themed() {
            background: linear-gradient(190deg, t($secondary), t($primary));
        }
    }

    &__text {
        position: relative;
        font-weight: 600;
    }

    &__load-icon {
        position: absolute;
        bottom: -6px;
        animation: load-icon 2s ease infinite;
    }
}

.button {
    &.disabled {
        @include themed() {
            background: t($primary--disabled);
        }
    }
    &.loading {
        @include themed() {
            background: linear-gradient(160deg, t($primary), t($secondary));
            background-size: 400% 400%;
            color: t($primary-text);
            opacity: 0.8;
            animation: loading-gradient 2s ease infinite;
        }
    }
    &.full-width {
        width: 100%;
    }
}
</style>
