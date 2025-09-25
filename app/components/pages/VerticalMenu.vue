<script setup lang="ts">
import type { PropType } from 'vue';
import NavigationMenu from '../dependencies/NavigationMenu.vue';
import type { ComponentResume } from '~/types/components';

defineProps({
    items: {
        type: Array as PropType<ComponentResume[]>,
        required: true
    },
    label: { type: String, default: 'On this page' }
})
</script>

<template>
    <aside
        class="lg:w-1/12 hover:lg:w-3/12 opacity-70 hover:opacity-100 ml-4 mt-4 text-sm lg:fixed left-0.5 z-50 bg-accented rounded-sm">
        <p class="p-2">{{ label }}</p>
        <NavigationMenu :items="items.map((item) => ({ label: item.title, to: `#${item.id}` }))" orientation="vertical"
            :tooltip="true">
        </NavigationMenu>
    </aside>
</template>