<script setup lang="ts">
import type { PropType } from 'vue';

interface EppsStoreOptionsExplanation {
    explanation: string
    name: string
}

defineProps({
    options: { type: Array as PropType<EppsStoreOptionsExplanation[]>, required: true }
})
</script>

<template>
    <div>
        <h3>Used EppsStoreOptions explanation</h3>
        <ul class="pl-2">
            <li v-for="option in options" :key="`${option.name}-explanation`" class="mb-4">
                <ULink :to="`/docs/types/${option.name}`">{{ option.name }}:</ULink> {{ option.explanation }}.
            </li>
        </ul>
    </div>
</template>