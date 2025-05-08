<script setup lang="ts">
defineProps({
    name: { type: String },
    value: { type: [Boolean, Number, String], required: true }
})
</script>

<template>
    <p class="mr-2">
        <span v-if="name" class="italic text-sm font-light">{{ name }} : </span>
        <span>{{ typeof value === 'boolean' ? value.toString() : value }}</span>
    </p>
</template>