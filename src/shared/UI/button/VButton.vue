<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
    fullWidth: {
        type: Boolean,
        default: false
    },
    radius: {
        type: [Number, String],
        default: 15
    },
    disabled: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: 'lg',
        validator: (value) => ['sm', 'lg', 'xl'].indexOf(value) > -1
    },
    theme: {
        type: String,
        default: 'default',
        validator: (value) =>
            ['default', 'primary', 'secondary', 'depressed', 'danger'].indexOf(value) > -1
    },
    outlined: {
        type: Boolean,
        default: false
    }
});
const { fullWidth, disabled, loading, radius, size, theme, outlined } = toRefs(props);

const classes = computed(() => [
    {
        button: true,
        disabled: disabled.value,
        loading: loading.value,
        outlined: outlined.value,
        'full-width': fullWidth.value
    },
    `button--${size.value}`,
    `button--${theme.value}`
]);

const styles = computed(() => ({
    borderRadius: `${radius.value}px`
}));

const isButtonDisabled = computed(() => disabled.value || loading.value);
</script>

<template>
    <button
        v-bind="$attrs"
        :class="classes"
        :style="styles"
        :disabled="isButtonDisabled"
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
$btn-active-opacity: 0.18 !default;
$btn-focus-opacity: 0.24 !default;
$btn-font-weight: 600 !default;
$btn-hover-opacity: 0.08 !default;
$btn-icon-font-size: 18px !default;
$btn-icon-padding: 12px !default;
$btn-outline-border-width: thin !default;
$btn-round-border-radius: 50% !default;
$btn-rounded-border-radius: 28px !default;
$btn-tile-border-radius: 0 !default;
$btn-transition-duration: 0.28s !default;

@mixin sizes($size) {
    &--#{$size} {
        @if $size == 'sm' {
            padding: 0 10px;
            font-weight: 600;
            font-size: 15px;
        } @else if $size == 'lg' {
            padding: 5px 12px;
            font-weight: 600;
        } @else if $size == 'xl' {
            padding: 10px 14px;
        }
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
    @include sizes('sm');
    @include sizes('lg');
    @include sizes('xl');
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    padding: 5px 12px;
    margin: 0;
    outline: 0;
    font-weight: $btn-font-weight;
    vertical-align: middle;
    white-space: nowrap;
    text-decoration: none;

    transition: $transition;

    &__text {
        display: flex;
        align-items: center;
        position: relative;
    }

    &__load-icon {
        position: absolute;
        bottom: -6px;
        animation: load-icon 2s ease infinite;
    }
}

// COLOR SCHEME
@mixin colors($theme) {
    &--#{$theme} {
        @if ($theme == 'default') {
            @include themed() {
                border: 1px solid t($divider);
                background: t($background-secondary);
            }

            &:not(.loading, .disabled):hover {
                @include themed() {
                    background: t($background);
                }
            }
        } @else if($theme == 'primary') {
            @include themed() {
                background: rgba(t($primary), 0.4);
                border-color: t($primary);
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

            &.outlined {
                @include themed() {
                    border: 1px solid t($primary);
                }
            }
        } @else if($theme == 'secondary') {
            @include themed() {
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

            &.outlined {
                @include themed() {
                    border: 1px solid t($secondary);
                }
            }
        } @else if($theme == 'danger') {
            @include themed() {
                background: transparent;
                border: 1px solid indianred;
                color: indianred;
            }

            &:not(.loading, .disabled):hover {
                @include themed() {
                    background: rgba(indianred, 0.1);
                }
            }
        }
    }
}

.button {
    @include colors('default');
    @include colors('primary');
    @include colors('secondary');
    @include colors('danger');
    @include colors('depressed');
    &.disabled {
        opacity: 0.5;
    }
    &.loading {
        opacity: 0.7;
    }
    &.full-width {
        width: 100%;
    }
    &.outlined {
        @include themed() {
            background: transparent;

            &:not(.loading, .disabled):hover {
                background: rgba(t($background-secondary), 0.2);
                color: t($text);
            }
        }
    }
}
</style>
