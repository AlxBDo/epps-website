<script setup lang="ts">
import type { PageResume } from '~/types/pages';
import type { PropType } from 'vue';
import VerticalMenu from '../pages/VerticalMenu.vue';
import { isEmpty } from '~/utils/validation';

const props = defineProps({
    definition: {
        type: Object as PropType<PageResume>,
        required: true
    },
    displayTitle: {
        type: Boolean,
        default: true
    }
})

useHead({
    title: `${useRuntimeConfig().public.appName} - ${props.definition.title}`,
    meta: [{
        name: props.definition.title,
        content: props.definition.description
    }]
})
</script>

<template>
    <UContainer>
        <VerticalMenu v-if="!isEmpty(definition.components) && definition.components.length > 1"
            :items="definition.components" />
        <div>
            <h2 v-if="displayTitle">{{ definition.title }}</h2>
            <slot></slot>
        </div>
    </UContainer>
</template>