<script>
export default {
  name: 'VSwitch',
  inheritAttrs: false
};
</script>

<script setup>
import { computed, reactive, toRefs } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: ''
    // required: true
  },
  checked: {
    type: Boolean,
    default: false,
    required: true
  },
  icon: {
    type: [String, Object]
  }
});

const { icon, checked } = toRefs(props);

const validateIcon = async (inputIcon) => {
  const accessFields = ['on', 'off']; // Допустимые ключи в пропсе

  const PREFIX = '[ PROPS: ICON ]'; // Префикс Ошибок

  /*
   * Входная валидицая на тип параметра
   * */
  const typeParam = inputIcon.constructor;

  if (typeParam !== Object && typeParam !== String) {
    throw new Error(
      `${PREFIX} Ошибка входного параметра! icon должен быть Object || String.`
    );
  }

  try {
    if (typeParam === Object) {
      Object.keys(inputIcon).forEach((item) => {
        if (!accessFields.includes(item))
          throw new Error(
            `${PREFIX} Недопустимый ключ '${item}'. Используйте 'on', 'off'`
          );
      });
    }

    return true;
  } catch (error) {
    console.error(`${PREFIX} ${error}`);

    return false;
  }
};

/*
 * WARNING ICON LOGIC
 * */
const warningIcon = reactive({
  active: false,
  icon: 'fa-solid fa-triangle-exclamation',
  animate: 'fa-beat',
  color: 'red'
});

const setWarningIcon = (flag = false) => (warningIcon.active = flag);

/*
 * OUTPUT ICON
 * */
const preparedIcon = computed(() => {
  if (!validateIcon(icon.value)) {
    setWarningIcon(true);
    return false;
  }

  setWarningIcon(false);

  if (icon.value.constructor === Object) {
    if (!checked.value) return icon.value.off;

    return icon.value.on;
  }

  return icon.value;
});
</script>

<template>
  <label class="container">
    <input
      v-bind="$attrs"
      class="input"
      type="checkbox"
      :checked="checked"
      @change="$emit('update:checked', $event.target.checked)"
    />
    <span class="switch">
      <span class="switch__circle">
        <span v-if="icon" class="switch__circle--icon__wrapper">
          <font-awesome-icon
            v-if="preparedIcon && !warningIcon.active"
            class="switch__circle--icon"
            :icon="preparedIcon"
            size="2xs"
          />
          <font-awesome-icon
            v-else
            :class="warningIcon.animate"
            :icon="warningIcon.icon"
            :color="warningIcon.color"
            size="2xs"
          />
        </span>
      </span>
    </span>
    <span class="label">{{ label }}</span>
  </label>
</template>

<style lang="scss " scoped>
.container {
  cursor: pointer;
  display: flex;
  align-items: center;
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
    + .switch {
      background-color: var(--second-dark);
    }

    + .switch .switch__circle {
      border-color: var(--second-dark);

      // Передвижение вправо
      transform: translateX(
              calc(var(--switch-container-width) - var(--switch-size))
      );
    }

  }
}

// Настройка Switch
.switch {
  --switch-container-width: 40px;
  --switch-size: calc(var(--switch-container-width) / 2);

  //--light-gray: #b4b4b4;
  --gray: #cbd5e0;
  --dark-gray: #a0aec0;
  --teal: #4fd1c5;
  --dark-teal: #319795;

  background-color: var(--second-dark);

  /* Вертикальное выравнивание для внутреннего круга */
  display: flex;
  align-items: center;
  position: relative;
  height: var(--switch-size);
  width: var(--switch-container-width);
  flex-basis: var(--switch-container-width);

  /* Контейнер для внутреннего круга */
  border-radius: var(--switch-size);

  /* Если label длинный => switch не уменьшается */
  flex-shrink: 0;

  transition: background-color 0.25s ease-in-out;

  &__circle {
    //content: "";
    position: absolute;

    left: 1px;
    height: calc(var(--switch-size) - 3px);
    width: calc(var(--switch-size) - 3px);

    border: 1px solid var(--main-text);
    border-radius: 9999px;
    background-color: var(--main-dark);

    transition: transform 0.375s ease-in-out;

    &--icon {
      position: absolute;
      transition: 0.25s ease-in-out;
      color: var(--main-text);

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
</style>
