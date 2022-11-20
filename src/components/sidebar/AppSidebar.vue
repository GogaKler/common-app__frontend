<script setup>
import { sidebarMenu } from '@components/sidebar/utils/sidebarMenu';
import { ref } from 'vue';
import VTooltip from '@UI/tooltip/VTooltip.vue';
import { useResizeObserver } from '@use/useResizeObserver';

defineProps({
    sidebarCondition: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['onUpdate:sidebarValues']);

const sidebar_REFLINK = ref(null);

useResizeObserver(sidebar_REFLINK, ({ width, height }) => {
    emit('onUpdate:sidebarValues', {
        width,
        height
    });
});
</script>

<template>
    <div ref="sidebar_REFLINK" class="sidebar">
        <ul class="sidebar__list">
            <v-tooltip
                v-for="(item, index) in sidebarMenu"
                :key="index"
                class="sidebar__list-item--wrapper"
                :label="item.title"
                position="right"
            >
                <router-link class="sidebar__list-item" :to="{ name: item.to }">
                    <font-awesome-icon size="lg" :icon="item.icon" class="sidebar__list-icon" />
                </router-link>
            </v-tooltip>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.sidebar {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 2;
    width: 60px;
    padding: 5px 0;
    transition: $transition-bg, $transition-minWidth;

    @include themed() {
        border-right: 1px solid t($border);
        background-color: t($background);
    }

    &.active {
        min-width: 200px;
    }

    &__header {
        display: flex;
        align-items: center;
        padding: 0 20px;
        margin: 0 0 10px 0;

        &-icon {
            padding: 12px;
            margin: 0 5px;
        }
    }

    &__list {
        display: flex;
        flex-direction: column;
        align-items: center;

        &-item {
            &--wrapper {
                margin-bottom: 20px;
                padding: 0 10px;

                &:last-child {
                    margin-bottom: 0;
                }
            }

            display: flex;
            align-items: center;
            justify-content: center;

            height: 40px;
            width: 40px;

            border-radius: 50%;
            transition: 0.2s ease-out, $transition-bg;

            &:not(.router-link-active):hover {
                @include themed() {
                    background-color: rgba(t($background-secondary), 0.5);
                }
            }

            &.active {
                margin-left: 0;
                justify-content: normal;
                padding-left: 20px;
                border-radius: 0 20px 20px 0;
            }

            &.router-link-active {
                @include themed() {
                    background-color: t($background-secondary);
                }
            }
        }

        &-icon {
            &.active {
                margin: 0 10px 0 0;
            }
        }

        &-text {
            font-size: 17px;
            opacity: 0;
            cursor: default;
            pointer-events: none;
            width: 0;
            transition: $transition-bg;

            &.active {
                opacity: 1;
                cursor: pointer;
                pointer-events: all;
                transition: $transition-bg;
            }
        }
    }
}

// media

.sidebar {
    @include for-size('md') {
        width: auto;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 10px 0;

        @include themed() {
            border: 0;
            border-top: 1px solid t($border);
        }
    }

    &__list {
        @include for-size('md') {
            justify-content: center;
            flex-direction: row;
        }

        &-item--wrapper {
            @include for-size('md') {
                margin-bottom: 0;
            }
        }
    }
}
</style>
