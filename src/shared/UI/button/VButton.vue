<script setup>
defineProps({
    fullWidth: {
        type: Boolean,
        default: false
    },
    radius: {
        type: [Number, String],
        default: 12
    },
    disabled: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    },
    primary: {
        type: Boolean,
        default: false
    },
    secondary: {
        type: Boolean,
        default: false
    },
    gradient: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <button
        v-bind="$attrs"
        :class="['button', { 'full-width': fullWidth, disabled, loading, primary, secondary }]"
        :disabled="disabled || loading"
        :style="{
            borderRadius: `${radius}px`
        }"
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

    padding: 5px 12px;
    margin: 0;

    transition: $transition;

    //&:hover {
    //    @include themed() {
    //        background: linear-gradient(190deg, t($secondary), t($primary));
    //    }
    //}

    &__text {
        display: flex;
        align-items: center;
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
    &.full-width {
        width: 100%;
    }
}

// COLOR SCHEME
.button {
    @include themed() {
        border: 1px solid t($divider);
        background: rgba(t($background), 0.3);
    }

    &:not(.loading, .disabled):hover {
        @include themed() {
            background: rgba(t($background), 0.5);
        }
    }

    &.disabled {
        opacity: 0.5;
    }
    &.loading {
        opacity: 0.7;
        //@include themed() {
        //    background: linear-gradient(160deg, t($primary), t($secondary));
        //    background-size: 400% 400%;
        //    color: t($primary-text);
        //    animation: loading-gradient 2s ease infinite;
        //}
    }
    &.primary {
        border: none;

        @include themed() {
            //background: linear-gradient(190deg, t($primary), t($secondary));
            background: rgba(t($secondary), 0.5);
        }
        &:not(.loading, .disabled):hover {
            @include themed() {
                background: t($primary);
                color: t($primary-text);
            }
        }

        &.disabled {
            @include themed() {
                background: t($secondary-disabled);
                color: t($text);
            }
        }

        &.loading {
            @include themed() {
                background: t($primary);
                color: t($primary-text);
            }
        }
    }

    &.secondary {
        border: none;

        @include themed() {
            //background: linear-gradient(190deg, t($primary), t($secondary));
            background: rgba(t($primary), 0.5);
        }
        &:not(.loading, .disabled):hover {
            @include themed() {
                background: t($secondary);
                color: t($secondary-text);
            }
        }

        &.disabled {
            @include themed() {
                background: t($primary-disabled);
                color: t($text);
            }
        }

        &.loading {
            @include themed() {
                background: t($secondary);
                color: t($secondary-text);
            }
        }
    }
}
</style>
