<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import VSwitch from '@UI/switch/VSwitch.vue';
import { useAppStore } from '@app/store/useAppStore';

const emit = defineEmits(['click:bar', 'onUpdate:header-state', 'onChange:switch-theme']);

const header_REFLINK = ref(null);

const defaultState = reactive({
    bar: false,
    width: 0,
    height: 0
});

/*
 * Bar Condition
 * */
const headerBarCondition = computed(() => defaultState.bar);
const changeBarState = () =>
    defaultState.bar ? (defaultState.bar = false) : (defaultState.bar = true);

const onClickBar = () => {
    changeBarState();
    emit('click:bar', headerBarCondition.value);
};

/*
 * Header Size
 * */
const headerWidth = computed(() => defaultState.width);
const headerHeight = computed(() => defaultState.height);

const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
        defaultState.width = entry.target.offsetWidth;
        defaultState.height = entry.target.offsetHeight;
    });

    emit('onUpdate:header-state', {
        width: headerWidth,
        height: headerHeight
    });
});

onMounted(() => {
    resizeObserver.observe(header_REFLINK.value);
});

/*
 * DARK MODE
 * */
const appStore = useAppStore();

const switchValue = ref(false);

onMounted(() => {
    switchValue.value = appStore.isDarkTheme;
});

watch(switchValue, () => {
    if (switchValue.value) {
        appStore.setTheme('dark');
    } else {
        appStore.setTheme('light');
    }
});
</script>

<template>
    <div ref="header_REFLINK" class="header">
        <div class="header__logo" onmousedown="return false">
            <font-awesome-icon
                ref="sidebar"
                icon="fa-solid fa-bars"
                size="lg"
                class="header__logo-icon"
                @click="onClickBar"
            />
            <div class="header__logo-text">Vue-common</div>
        </div>
        <div class="theme">
            <v-switch
                v-model:checked="switchValue"
                :icon="{
                    on: 'fa-regular fa-moon',
                    off: 'fa-regular fa-lightbulb'
                }"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header {
    position: fixed;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    transition: $transition-bg;

    @include themed() {
        background-color: t($background);
        border-bottom: 1px solid t($border);
    }

    &__logo {
        display: flex;
        align-items: center;
        min-width: 238px;

        &-icon {
            padding: 12px;
            margin: 0 10px 0 5px;
            border-radius: 50%;
            cursor: pointer;
            transition: 0.1s ease-out;

            &:hover {
                @include themed() {
                    background-color: rgba(t($background-secondary), 0.5);
                }
            }
        }
    }
}
</style>
