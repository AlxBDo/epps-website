<script setup lang="ts">
import Header from '~/components/layout/Header.vue';
</script>

<template>
    <div>
        <Header />
        <main>
            <slot></slot>
        </main>
    </div>
</template>