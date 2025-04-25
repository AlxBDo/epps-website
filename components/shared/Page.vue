<script setup lang="ts">
import type { PageResume } from '~/types/pages';
import type { PropType } from 'vue';

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
        <h2 v-if="displayTitle">{{ definition.title }}</h2>
        <slot></slot>
    </UContainer>
</template>