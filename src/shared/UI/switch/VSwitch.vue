<script>
export default {
    name: 'VSwitch',
    inheritAttrs: false
};
</script>

<script setup>
import { computed, reactive, toRefs } from 'vue';
import { propsIconValidationSwitch } from '@UI/switch/validator';

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    checked: {
        type: Boolean,
        required: true
    },
    icon: {
        type: [String, Object]
    },
    loading: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

const { icon, checked, loading, disabled } = toRefs(props);

const isIconPassed = propsIconValidationSwitch({ icon: icon.value });
const isLoading = computed(() => loading.value);
const isDisabled = computed(() => disabled.value);

const isSwitchDisabled = computed(() => isDisabled.value || isLoading.value);

const iconParser = (processingIcon) => {
    if (processingIcon.constructor === Object) {
        return {
            icon: !checked.value ? processingIcon.off : processingIcon.on
        };
    }

    return { icon: processingIcon };
};

/*
 * WARNING ICON
 * */
const loadingIcon = reactive({
    active: true,
    icon: 'fa-solid fa-spinner',
    animate: 'fa-spin-pulse fa-spin-reverse',
    color: 'blue'
});

/*
 * LOADING ICON
 * */
const warningIcon = reactive({
    active: false,
    icon: 'fa-solid fa-triangle-exclamation',
    animate: 'fa-beat',
    color: 'red'
});

/*
 * OUTPUT ICON
 * */
const preparedIcon = computed(() => {
    if (!isIconPassed) return warningIcon;

    if (isLoading.value) return loadingIcon;

    return iconParser(icon.value);
});
</script>

<template>
    <label class="switch-container">
        <input
            v-bind="$attrs"
            class="input"
            type="checkbox"
            :checked="checked"
            :disabled="isSwitchDisabled"
            @change="$emit('update:checked', $event.target.checked)"
        />
        <span :class="['switch', { disabled: isSwitchDisabled }]" onmousedown="return false">
            <span class="switch__circle">
                <span v-if="icon" class="switch__circle--icon__wrapper">
                    <font-awesome-icon
                        v-if="preparedIcon.icon"
                        :class="['switch__circle--icon', preparedIcon.animate]"
                        :icon="preparedIcon.icon"
                        :color="preparedIcon.color"
                        size="2xs"
                    />
                </span>
            </span>
        </span>
        <span v-if="label" class="label">{{ label }}</span>
    </label>
</template>

<style lang="scss" scoped>
.switch-container {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 10px;
}

.label {
    margin-left: 12px;
    color: #1a202c;
}

// Скрытие чекбокса
.input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;

    &:checked {
        + .switch .switch__circle {
            // Передвижение
            left: 2px;
            transform: translateX(calc(var(--switch-prepared-width) - var(--switch-size)));
        }
    }
}

// Настройка Switch
.switch {
    --switch-container-width: 40px;
    --switch-size: calc(var(--switch-container-width) / 2);
    --switch-prepared-width: calc(var(--switch-container-width) - 1px);

    /* Вертикальное выравнивание для внутреннего круга */
    display: flex;
    align-items: center;
    position: relative;
    height: calc(var(--switch-size) + 1px);
    width: var(--switch-prepared-width);
    flex-basis: calc(var(--switch-prepared-width) + 3px);
    @include themed() {
        border: 1px solid t($divider);
    }
    /* Контейнер для внутреннего круга */

    /**
  * TODO: Сделать пропс border, который будет включать css аттрибут border
  */
    //@include themed() {
    //    border: 1px solid t($background-secondary);
    //}

    border-radius: var(--switch-size);

    /* Если label длинный => switch не уменьшается */
    flex-shrink: 0;

    transition: background-color 0.25s ease-in-out, $transition-border;

    &:hover {
        @include themed() {
            border: 1px solid t($divider-light);
        }
    }
    &__circle {
        position: absolute;

        left: 1px;
        top: 1px;
        height: calc(var(--switch-size) - 2px);
        width: calc(var(--switch-size) - 2px);
        outline: 0;
        border-radius: 9999px;

        transition: transform 0.375s ease-in-out;

        &--icon {
            position: absolute;
            transition: 0.25s ease-in-out;

            &__wrapper {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
            }
        }
    }
}

// COLOR SCHEME
.switch {
    @include themed() {
        background-color: t($background-secondary);
    }

    &:hover {
        //@include themed() {
        //  border-color: red;
        //}
    }

    &__circle {
        @include themed() {
            background-color: t($background);
        }

        &--icon {
            @include themed() {
                color: t($text);
            }
        }
    }
}

.switch.disabled {
    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        transition: opacity 0.6s;
        border-radius: var(--switch-size);
        opacity: 0.6;

        @include themed() {
            background: t($disabled);
        }
    }
}
</style>
