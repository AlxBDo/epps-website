<script setup lang="ts">
import type { ParameterPrototype } from '~/types/components';

defineProps({
    params: {
        type: Array as PropType<Pick<ParameterPrototype, 'description' | 'name'>[]>,
        required: true
    },
    title: { type: String, default: undefined }
})
</script>

<template>
    <div>
        <h4 v-if="title">{{ title }}</h4>

        <slot name="explanation"></slot>

        <ul class="ml-3 list-disc pl-3">
            <li v-for="(param, index) in params" :key="`params-${param.name}-${index}`" class="text-sm">
                <span class="font-bold">{{ param.name }}</span> : <span class="font-light">{{
                    param.description }}</span>
            </li>
        </ul>
    </div>
</template>