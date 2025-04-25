<script setup lang="ts">
import type { PropType } from 'vue';

type Link = Record<string, string>

defineProps({
    links: { type: Object as PropType<Link>, required: true },
    title: { type: String, default: undefined }
})
</script>

<template>
    <article>
        <header v-if="title">
            <h5>{{ title }}</h5>
        </header>
        <ul>
            <li v-for="linkName in Object.keys(links)">
                <ULink :to="links[linkName]">{{ linkName }}</ULink>
            </li>
        </ul>
    </article>
</template>