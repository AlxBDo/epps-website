<script setup lang="ts">
import Menu from '~/components/layout/Menu.vue';
</script>

<template>
    <header class="flex items-center">
        <NuxtLink href="/">
            <img src="../../assets/img/epps-logo-head-125px.png" class="logo" alt="Extend store plugin logo" />
        </NuxtLink>

        <div class="header flex flex-wrap">
            <h1 class="-mb-24 font-bold text-3xl">{{ useRuntimeConfig().public.appName }}</h1>
            <Menu></Menu>
        </div>
    </header>
</template>

<style scoped>
.header {
    max-width: 100%;
    min-width: 85%;
}

.header {
    &>div {
        display: flex;
        align-items: center;

        div {
            text-align: left;
        }
    }

    h1,
    .epps-mean span {
        color: var(--primary-color);
    }

    .epps-mean {
        margin-top: 0;
        font-size: small;

        span {
            font-weight: bolder;
            font-size: larger;
        }
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