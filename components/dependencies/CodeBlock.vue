<script setup lang="ts">
import VCodeBlock from '@wdns/vue-code-block'

defineProps({
    code: { type: String, required: true },
    lang: { type: String, required: true }
})
</script>

<template>
    <VCodeBlock :code :lang highlightjs theme="github-dark" />
</template>