<script setup lang="ts">
import type { NuxtError } from 'nuxt/app';
import eppsLogo from './assets/img/epps-logo-head-125px.png'


const props = defineProps({
    error: Object as () => NuxtError
})

const isDev: boolean = process.env.NODE_ENV === 'development'

if (isDev) {
    console.table(props.error);
}
</script>

<template>
    <div class="flex justify-center items-start">
        <img class="mr-12" :src="eppsLogo" />
        <div>
            <h1 class="text-4xl font-bold">Oups !</h1>
            <h2>Something is wrong 😶‍🌫️...</h2>

            <div class="mb-4" v-if="isDev">
                <p>Error : </p>
                <div class="mt-2">
                    <p>{{ error?.statusMessage }} - {{ error?.message }}</p>
                    <div class="text-sm mt-2">
                        <pre>{{ error?.stack }}</pre>
                    </div>
                </div>
            </div>

            <ULink to="/">Back to home</ULink>
        </div>
    </div>
</template>

<style scoped>
div {
    max-width: 1024px;
    overflow: hidden;
    margin: auto;
}
</style>