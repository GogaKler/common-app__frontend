<script setup>
defineProps({
    label: String,
    active: {
        type: Boolean,
        default: true
    },
    position: {
        type: String,
        default: 'top',
        validator(value) {
            return ['top', 'bottom', 'left', 'right'].indexOf(value) > -1;
        }
    },
    size: {
        type: String,
        default: '2x',
        validator: (value) =>
            ['1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'].indexOf(value) > -1
    },
    timeout: {
        type: String,
        default: '1'
    }
});
</script>

<template>
    <span v-bind="$attrs" :data-label="label" :class="[{ tooltip: label }, position, 'timeout']">
        <slot />
    </span>
</template>

<style lang="scss" scoped>
@mixin tooltip-arrow($position, $color) {
    @if $position == 'top' {
        border-top: 5px solid $color;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        bottom: calc(100% + 2px);
    } @else if $position == 'right' {
        border-top: 5px solid transparent;
        border-right: 5px solid $color;
        border-bottom: 5px solid transparent;
        left: calc(100% + 2px);
    } @else if $position == 'bottom' {
        border-right: 5px solid transparent;
        border-bottom: 5px solid $color;
        border-left: 5px solid transparent;
        top: calc(100% + 2px);
    } @else if $position == 'left' {
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid $color;
        right: calc(100% + 2px);
    }
}

@mixin tooltip($position) {
    &.#{$position} {
        &:before,
        &:after {
            transition-delay: 0.6s;

            @if $position == 'top' {
                top: auto;
                right: auto;
                bottom: calc(100% + 5px + 2px);
                left: 50%;
                transform: translateX(-50%);
            } @else if $position == 'right' {
                top: 50%;
                right: auto;
                bottom: auto;
                left: calc(100% + 5px + 2px);
                transform: translateY(-50%);
            } @else if $position == 'bottom' {
                top: calc(100% + 5px + 2px);
                right: auto;
                bottom: auto;
                left: 50%;
                transform: translateX(-50%);
            } @else if $position == 'left' {
                top: 50%;
                right: calc(100% + 5px + 2px);
                bottom: auto;
                left: auto;
                transform: translateY(-50%);
            }
        }

        &:before {
            @include themed() {
                @include tooltip-arrow($position, rgba(t($text), 0.8));
            }
        }
    }
}

.tooltip {
    @include tooltip('top');
    @include tooltip('right');
    @include tooltip('bottom');
    @include tooltip('left');

    position: relative;
    display: inline-block;
    text-decoration: none;

    &:before,
    &:after {
        content: '';
        position: absolute;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 0.1s ease-in;
    }

    &:before {
        z-index: 889;
    }

    &:after {
        content: attr(data-label);
        width: auto;
        max-width: 100vw;
        padding: 2px 10px;
        border-radius: 10px;
        font-size: 14px;
        letter-spacing: normal;
        text-transform: none;
        z-index: 888;
        white-space: nowrap;

        @include themed() {
            background: rgba(t($text), 0.8);
            color: t($background);
        }
    }

    &:not([data-label='']):hover:before,
    &:not([data-label='']):hover:after {
        opacity: 1;
        visibility: visible;
    }
}
</style>
