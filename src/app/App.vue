<script setup>
import { useAppStore } from '@app/store/useAppStore';

const appStore = useAppStore();

const initTheme = async () => {
    await appStore.initialTheme();
};

initTheme();
// throw new Error();
</script>

<template>
    <RouterView v-slot="{ Component }">
        <template v-if="Component">
            <Transition mode="out-in">
                <Suspense>
                    <component :is="Component"></component>

                    <template #fallback> Loading... </template>
                </Suspense>
            </Transition>
        </template>
    </RouterView>
</template>
