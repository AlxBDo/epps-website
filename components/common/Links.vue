<script setup lang="ts">
import type { PropType } from 'vue';

type Link = Record<string, string>

defineProps({
    links: { type: Object as PropType<Link>, required: true },
    icon: { type: String, default: undefined },
    title: { type: String, default: undefined }
})
</script>

<template>
    <article>
        <header v-if="title">
            <h5>{{ title }}</h5>
        </header>
        <ul class="ml-3 pl-3">
            <li v-for="linkName in Object.keys(links)" class="text-sm">
                <ULink :to="links[linkName]" class="flex items-center" inactive-class="underline">
                    <UIcon v-if="icon" :name="icon" class="mr-1 size-3" />
                    {{ linkName }}
                </ULink>
            </li>
        </ul>
    </article>
</template>