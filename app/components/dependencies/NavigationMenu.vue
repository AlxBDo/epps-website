<script setup lang="ts">
import { usePagesDefinitions } from '~/composables/pagesDefinitions'

import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'
import type { ComponentResume } from '~/types/components'
import type { PageResume } from '~/types/pages'

import UNavigationMenu from '@nuxt/ui/components/NavigationMenu.vue'
import type { PropType } from 'vue'

defineProps({
    items: { type: Array as PropType<NavigationMenuItem[]>, required: true },
    orientation: { type: String as PropType<'vertical'> },
    tooltip: { type: Boolean, default: false }
})
</script>

<template>
    <UNavigationMenu :items="items" :orientation tooltip>
        <template v-if="$slots['docs-content']" #docs-content="{ item }">
            <slot name="docs-content" :item></slot>
        </template>
    </UNavigationMenu>
</template>