<script setup>
import { onMounted, ref, toRefs } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    max: {
        type: Number,
        default: 100
    },
    errors: {
        type: String,
        default: ''
    }
});
const { modelValue, max } = toRefs(props);

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
    emit('update:modelValue', event.target.value);
};

const VInput = ref();
const VInputFocused = ref(false);

const focusOnInput = () => {
    VInput.value.focus();
};

const toggleInputState = (event) => {
    // Если input не пустой - не меняем состояние
    if (!event && modelValue.value.length) return;

    VInputFocused.value = event;
};

onMounted(() => {
    if (modelValue.value.length > 1) toggleInputState(true);
});
</script>

<template>
    <div class="VInput">
        <div :class="['VInput__content', { disabled }]" @click="focusOnInput">
            <div class="input__wrapper">
                <input
                    v-bind="$attrs"
                    ref="VInput"
                    class="input"
                    :maxlength="max"
                    :value="modelValue"
                    :disabled="disabled"
                    @input="updateValue"
                    @focus="toggleInputState(true)"
                    @blur="toggleInputState(false)"
                />
                <label
                    :for="name"
                    :class="['input__label', { 'input__label--top': VInputFocused }]"
                >
                    <span class="input__label--text">{{ label }}</span>
                </label>
            </div>
        </div>
        <div v-if="errors" class="VInput__errors">
            <div class="VInput__errors--item">
                <font-awesome-icon icon="fa-solid fa-circle-exclamation" color="#ed0082" />
                <span class="VInput__errors--text">{{ errors }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.VInput {
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

.VInput {
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

.input {
    width: 100%;
    background: none;
    outline: none;
    border: none;
    z-index: 2;

    &__wrapper {
        position: relative;
        width: 100%;
        padding: 10px 0;
    }

    &__label {
        position: absolute;
        top: 50%;
        right: -5px;
        left: -5px;
        z-index: 1;
        cursor: text;
        display: flex;
        transform: translateY(-50%);

        transition: $transition;

        @include themed() {
            color: t($text);
        }

        &--top {
            top: -10px;
            left: -10px;
        }

        &--top &--text {
            font-size: 12px;
        }

        &--text {
            transition: $transition;
            font-size: 14px;
            line-height: 20px;
            padding-right: 5px;
            padding-left: 5px;
            border-radius: 10px;
        }
    }
}
</style>
