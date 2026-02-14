<script setup lang="ts">
import type { PropType } from 'vue';
import NavigationMenu from '../dependencies/NavigationMenu.vue';
import type { ComponentResume } from '~/types/components';
import { useVerticalMenuStore } from '~/stores/docs/verticalMenu';

const props = defineProps({
    items: {
        type: Array as PropType<ComponentResume[]>,
        required: true
    },
    label: { type: String, default: 'On this page' }
})

const store = useVerticalMenuStore()
store.setItems(props.items)
</script>

<template>
    <aside v-if="store.items?.length"
        class="lg:w-1/12 hover:lg:w-3/12 opacity-70 hover:opacity-100 md:ml-4 mt-4 text-sm fixed left-0.5 z-50 bg-accented rounded-sm">
        <UDropdownMenu class="lg:hidden" :items="(store.items)">
            <UButton icon="i-lucide-menu" color="neutral" size="sm" variant="ghost" />
        </UDropdownMenu>
        <div class="hidden lg:block">
            <p class="p-2">{{ label }}</p>
            <NavigationMenu :items="store.items" orientation="vertical" :tooltip="true">
            </NavigationMenu>
        </div>
    </aside>
</template>