<script setup>
defineProps({
    modelValue: {
        type: String
    },
    label: {
        type: String,
        default: null
    },
    options: {
        type: Array,
        default: () => []
    },
    errors: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:modelValue']);

const updateModelValue = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>

<template>
    <div class="VSelect">
        <div class="VSelect__content">
            <select class="select" @change="updateModelValue">
                <option value="" class="select__option default">
                    {{ label ?? 'Выберите...' }}
                </option>
                <option
                    v-for="(item, index) in options"
                    :key="index"
                    :value="item.value"
                    class="select__option"
                >
                    {{ item.title }}
                </option>
            </select>
        </div>
        <div class="VSelect__errors">
            <div v-if="errors" class="VSelect__errors">
                <div class="VSelect__errors--item">
                    <font-awesome-icon icon="fa-solid fa-circle-exclamation" color="#ed0082" />
                    <span class="VSelect__errors--text">{{ errors }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.VSelect {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    &__content {
        padding: 0 10px;
        border-radius: 8px;
        cursor: text;

        @include themed() {
            border: 1px solid rgba(t($text), 0.4);
        }

        &.disabled {
            opacity: 0.5;
        }
    }
}

.VSelect {
    &__errors {
        margin-top: 8px;
        display: flex;
        align-items: center;

        &--item {
            display: flex;
            align-items: center;
            padding: 0 5px;
            border-radius: 10px;
        }

        &--text {
            color: #ed0082;
            font-size: 14px;
            font-weight: 500;
            margin-left: 5px;
        }
    }
}

.select {
    width: 100%;
    background: none;
    outline: none;
    border: none;
    z-index: 2;
    padding: 10px 0;
    font-size: 14px;

    &__option {
        padding: 20px;
        cursor: pointer;
        @include themed() {
            background: t($background);
            color: t($text);
        }
    }
}
</style>
