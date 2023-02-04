<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
    name: {
        type: String,
        default: '',
        required: true
    },
    logo: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: ''
    },
    showName: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: '2x',
        validator: (value) =>
            ['1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'].indexOf(value) > -1
    }
});

const { name } = toRefs(props);
const emit = defineEmits(['onClick:name']);

const clickOnName = () => emit('onClick:name');
const userWithoutLogo = computed(
    () => `${name.value[0]?.toUpperCase()}${name.value[1]?.toUpperCase()}`
);
</script>

<template>
    <div class="user">
        <div :class="['user__logo', `user__logo--${size}`, { avatar: logo }]">
            <img v-if="logo" :src="logo" :alt="name" />
            <span v-else>{{ userWithoutLogo }}</span>
            <div class="user__inner-content">
                <slot name="inner"></slot>
            </div>
        </div>
        <span v-if="showName" class="user__name mr-2 cursor-pointer" @click="clickOnName">
            {{ name }}
        </span>
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.user {
    display: flex;
    align-items: center;
    position: relative;

    &__name {
        font-weight: 600;
    }

    &__logo {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin-right: 10px;
        font-size: 15px;
        font-weight: 600;
        border-radius: 100%;

        @include themed() {
            background: t($background-secondary);
            border: 1px solid t($border);
        }

        &.avatar {
            border: none;
        }

        & img {
            display: block;
            max-width: 100%;
            height: 100%;
            border-radius: 100%;
        }
        // sizes

        &--1x {
            font-size: 10px;
            height: 25px;
            width: 25px;
        }

        &--2x {
            font-size: 14px;
            height: 35px;
            width: 35px;
        }

        &--3x {
            font-size: 20px;
            height: 45px;
            width: 45px;
        }

        &--4x {
            font-size: 25px;
            height: 55px;
            width: 55px;
        }

        &--5x {
            font-size: 30px;
            height: 70px;
            width: 70px;
        }

        &--9x {
            font-weight: 400;
            font-size: 80px;
            height: 200px;
            width: 200px;
        }

        &--10x {
            font-weight: 400;
            font-size: 80px;
            height: 220px;
            width: 220px;
        }
    }
}

.user__inner-content {
    position: absolute;
    bottom: 15px;
    left: -10px;
    font-size: 16px;
    font-weight: 400;
}
</style>
