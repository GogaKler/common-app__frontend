<script setup>
const props = defineProps({
    name: {
        type: String,
        default: ''
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
    }
});
</script>

<template>
    <div class="user">
        <span v-if="showName" class="user__name mr-2">{{ name }}</span>
        <div class="user__logo">
            <span>{{ name[0] + name[1] }}</span>
        </div>
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.user {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;

    &__name {
        font-weight: 600;
    }

    &__logo {
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        text-align: center;
        margin-right: 5px;
        font-size: 15px;
        font-weight: 600;
        display: flex;
        height: 35px;
        width: 35px;

        @include themed() {
            background: t($background-secondary);
            border: 1px solid t($border);
        }
    }
}
</style>
