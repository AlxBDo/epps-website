<script setup lang="ts">
defineProps({
    description: {
        type: String,
        default: undefined
    },
    path: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})
</script>

<template>
    <ULink v-if="path" :to="path">
        <p class="m-0 p-0">{{ title }}</p>
        <span v-if="description" class="italic font-light text-sm">
            {{ description }}
        </span>
    </ULink>
</template>
