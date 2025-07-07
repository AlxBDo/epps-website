<script setup lang="ts">
import type { NuxtError } from '#app'

definePageMeta({
    layout: "default"
})

const props = defineProps({
    error: Object as () => NuxtError
})

const isDev: boolean = process.env.NODE_ENV === 'development'

if (isDev) {
    console.table(props.error);
}
</script>

<template>
    <div>
        <h1 class="text-4xl font-bold">Oups !</h1>
        <h2>Une erreur est survenue...</h2>

        <div class="mb-4" v-if="isDev">
            <p>L'erreur en question : </p>
            <div class="mt-2">
                <p>{{ error?.statusMessage }}</p>
                <p>{{ error?.message }}</p>
            </div>
        </div>

        <ULink to="/">Retour à l'accueil</ULink>
    </div>
</template>