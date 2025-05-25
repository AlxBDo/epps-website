<script setup lang="ts">
import Menu from '~/components/layout/Menu.vue';
</script>

<template>
    <header class="flex items-center flex-wrap justify-between">
        <div class="flex items-center">
            <NuxtLink href="/">
                <img src="../../assets/img/epps-logo-head-125px.png" class="logo" alt="Extend store plugin logo" />
            </NuxtLink>
            <h1 class="font-bold text-3xl">{{ useRuntimeConfig().public.appName }}</h1>
        </div>

        <div class="header md:w-xl">
            <Menu></Menu>
        </div>
    </header>
</template>

<style scoped>
.header {
    max-width: 100%;

    &>div {
        display: flex;
        align-items: center;

        div {
            text-align: left;
        }
    }

    h1 {
        color: var(--primary-color);
    }
}

.logo {
    margin-right: 15px;
    margin-top: -15px;
    width: 60px;

    &:hover {
        filter: drop-shadow(0 0 2em #d4d250aa);
    }
}
</style>